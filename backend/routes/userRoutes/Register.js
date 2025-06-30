const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Register = require('../../schema/user/Register');

// POST /api/user/register
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, password, dob, email, country } = req.body;

    // Check for required fields
    if (!firstname || !username || !password || !email) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Check if user already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Register({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      dob,
      email,
      country
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
