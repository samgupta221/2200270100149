
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.status(200).json({ token });
});

module.exports = router;
