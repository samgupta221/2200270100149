const express = require('express');
const jwt = require('jsonwebtoken');
const Item = require('../models/Item');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Unauthorized');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).send('Invalid token');
  }
};

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const item = new Item({ ...req.body, userId: req.user.id });
  await item.save();
  res.status(201).json(item);
});

router.delete('/:id', auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send('Item deleted');
});

module.exports = router;
