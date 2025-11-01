
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, admin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/categories - Create a new category
router.post('/', protect, admin, async (req, res) => {
  const { name } = req.body;
  try {
    const existingCategory = await prisma.category.findUnique({ where: { name }});
    if(existingCategory) {
        return res.status(400).json({ message: 'Category already exists.' });
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/categories/:id - Update a category
router.put('/:id', protect, admin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const existingCategory = await prisma.category.findFirst({ where: { name, NOT: { id: parseInt(id) } }});
    if(existingCategory) {
        return res.status(400).json({ message: 'Category name already in use.' });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/categories/:id - Delete a category
router.delete('/:id', protect, admin, async (req, res) => {
  const { id } = req.params;
  try {
    // Check if any articles are using this category
    const articles = await prisma.article.count({ where: { categoryId: parseInt(id) } });
    if (articles > 0) {
      return res.status(400).json({ message: 'Cannot delete category as it is currently in use by articles.' });
    }
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
