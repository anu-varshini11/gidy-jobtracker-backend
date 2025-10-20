const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const User = require('../models/User');

// Existing routes
router.post('/signup', signup);
router.post('/login', login);

// ✅ New route: check username availability
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userExists = await User.findOne({ username });
    res.json({ available: !userExists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ available: false, message: 'Server error' });
  }
});

module.exports = router;
