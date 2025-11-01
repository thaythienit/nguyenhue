
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, admin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

// GET /api/settings - Get site settings
router.get('/', async (req, res) => {
    try {
        const settings = await prisma.settings.findUnique({
            where: { key: 'default' }
        });

        if (settings) {
            res.json(settings.value);
        } else {
            // Return default settings if none are in the DB
            res.json({
                siteName: 'Trường Tiểu học Nguyễn Huệ',
                logoUrl: '',
                footerAddress: 'Nam Thanh - Đắk Wil - Lâm Đồng',
                footerPhone: '02613.709.333',
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/settings - Update site settings
router.put('/', protect, admin, async (req, res) => {
    const newSettings = req.body;
    try {
        const updatedSettings = await prisma.settings.upsert({
            where: { key: 'default' },
            update: { value: newSettings },
            create: { key: 'default', value: newSettings }
        });
        res.json(updatedSettings.value);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
