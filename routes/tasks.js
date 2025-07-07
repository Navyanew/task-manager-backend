const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');

const auth = require('../middleware/authMiddleware');

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = new Task({
      user:new mongoose.Types.ObjectId(req.user.userId),
      title,
      description,
      status: status || 'pending',
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('❌ Error creating task:', err);
    res.status(500).json({ message: 'Failed to add new task' });
  }
});

// Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    console.log('User ID from token:', req.user.userId);
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (err) {
    console.error('❌ Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task (only if it belongs to the logged-in user)
router.put('/:id', auth, async (req, res) => {
  try {
    const userId =new mongoose.Types.ObjectId(req.user.userId);
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Server error while updating task' });
  }
});

// Delete a task (only if it belongs to the logged-in user)
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId =new mongoose.Types.ObjectId(req.user.userId);
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

module.exports = router;
