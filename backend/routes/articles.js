
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, admin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

// GET /api/articles - Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        category: true,
        author: {
          select: {
            displayName: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });
    // Map data to match frontend structure
    const formattedArticles = articles.map(article => ({
      ...article,
      category: article.category.name,
      author: article.author.displayName,
      date: new Date(article.date).toLocaleDateString('vi-VN') // DD/MM/YYYY
    }));
    res.json(formattedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// POST /api/articles - Create a new article
router.post('/', protect, async (req, res) => {
  const { title, excerpt, content, imageUrl, category, date, featured, spotlight } = req.body;
  
  try {
    // Find category by name
    const categoryRecord = await prisma.category.findUnique({ where: { name: category } });
    if (!categoryRecord) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        date: new Date(date), // Expecting YYYY-MM-DD
        featured,
        spotlight,
        authorId: req.user.id,
        categoryId: categoryRecord.id,
      },
    });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/articles/:id - Update an article
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, imageUrl, category, date, featured, spotlight } = req.body;
  
  try {
    const categoryRecord = await prisma.category.findUnique({ where: { name: category } });
    if (!categoryRecord) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        date: new Date(date), // Expecting YYYY-MM-DD
        featured,
        spotlight,
        categoryId: categoryRecord.id,
      },
    });
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// DELETE /api/articles/:id - Delete an article
router.delete('/:id', protect, admin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
