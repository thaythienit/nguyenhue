
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, admin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

// GET /api/pages/:pageKey - Get content for a specific page
router.get('/:pageKey', async (req, res) => {
  const { pageKey } = req.params;
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { pageKey },
    });

    if (pageContent) {
      res.json(pageContent.content);
    } else {
      // Return empty object if page content hasn't been created yet
      res.status(404).json({ message: 'Page content not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/pages/:pageKey - Update content for a specific page
router.put('/:pageKey', protect, admin, async (req, res) => {
  const { pageKey } = req.params;
  const { content } = req.body;
  try {
    const updatedPage = await prisma.pageContent.upsert({
      where: { pageKey },
      update: { content },
      create: { pageKey, content },
    });
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
