const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Register = require('../../schema/user/Register')
const Login = require('../../schema/user/Login'); // your user model

const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ message: 'Username/Email and password required' });
    }

    const existingUser = await Register.findOne({
      $or: [{ email: user }, { username: user }]
    });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Create JWT payload
    const payload = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ 
      message: 'Login successful', 
      user: existingUser.username,
      userId: existingUser._id,
      token 
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
