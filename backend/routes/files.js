
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const { protect, admin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

const uploadsDir = process.env.UPLOADS_DIR || 'uploads';

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const getFileType = (mimeType) => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf') return 'pdf';
  return 'other';
};


// GET /api/files - Get all files
router.get('/', async (req, res) => {
    try {
        const files = await prisma.managedFile.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// POST /api/files/upload - Upload new files
router.post('/upload', protect, admin, upload.array('files'), async (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    
    try {
        const filePromises = req.files.map(file => {
            return prisma.managedFile.create({
                data: {
                    name: file.originalname,
                    url: `/uploads/${file.filename}`, // URL path to serve the file
                    type: getFileType(file.mimetype),
                    size: file.size,
                }
            });
        });
        
        const createdFiles = await Promise.all(filePromises);
        res.status(201).json(createdFiles);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// DELETE /api/files/:id - Delete a file
router.delete('/:id', protect, admin, async (req, res) => {
    const { id } = req.params;
    try {
        const file = await prisma.managedFile.findUnique({ where: { id } });
        if (!file) {
            return res.status(404).json({ message: 'File not found.' });
        }

        // Delete file from filesystem
        const filePath = path.join(uploadsDir, path.basename(file.url));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete file record from database
        await prisma.managedFile.delete({ where: { id } });

        res.json({ message: 'File deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
