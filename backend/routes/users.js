
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { protect, admin } = require('../middleware/authMiddleware');
const prisma = new PrismaClient();

// GET /api/users - Get all users (Admin only)
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        displayName: true,
        avatarUrl: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users - Create a user (Admin only)
router.post('/', protect, admin, async (req, res) => {
    const { username, password, role, displayName } = req.body;
    try {
        const userExists = await prisma.user.findUnique({ where: { username } });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role,
                displayName,
                avatarUrl: `https://i.pravatar.cc/150?u=${username}`,
            },
            select: { id: true, username: true, role: true, displayName: true, avatarUrl: true }
        });

        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// PUT /api/users/:id - Update a user (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  const { id } = req.params;
  const { username, role, displayName } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Prevent changing role of the last admin
    if (user.role === 'admin' && role !== 'admin') {
        const adminCount = await prisma.user.count({ where: { role: 'admin' } });
        if (adminCount <= 1) {
            return res.status(400).json({ message: 'Cannot change role of the last admin.' });
        }
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { username, role, displayName },
      select: { id: true, username: true, role: true, displayName: true, avatarUrl: true }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE /api/users/:id - Delete a user (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await prisma.user.findUnique({ where: { id: parseInt(id) }});
    if (!userToDelete) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (userToDelete.id === req.user.id) {
        return res.status(400).json({ message: 'You cannot delete your own account.' });
    }
    if (userToDelete.role === 'admin') {
        const adminCount = await prisma.user.count({ where: { role: 'admin' } });
        if (adminCount <= 1) {
            return res.status(400).json({ message: 'Cannot delete the last admin account.' });
        }
    }
    
    // You might want to handle re-assigning articles before deleting a user
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
     if (error.code === 'P2003') { // Foreign key constraint failed
        return res.status(400).json({ message: 'Cannot delete user. They are the author of one or more articles. Please re-assign articles first.' });
     }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
