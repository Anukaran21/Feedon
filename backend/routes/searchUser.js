const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to search users by username
router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const users = await User.find({ username: { $regex: q, $options: 'i' } }); // Case-insensitive search
    res.json(users);
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;