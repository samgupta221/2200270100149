const express = require('express');
const Job = require('../models/Job');
const jwt = require('jsonwebtoken');

const router = express.Router();

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

router.post('/create', validateToken, async (req, res) => {
  if (req.user.role !== 'company') return res.sendStatus(403);

  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    company: req.body.company
  });

  await job.save();
  res.status(201).json(job);
});

router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

router.post('/apply/:id', validateToken, async (req, res) => {
  if (req.user.role !== 'student') return res.sendStatus(403);

  const job = await Job.findById(req.params.id);
  if (!job.applicants.includes(req.user.id)) {
    job.applicants.push(req.user.id);
    await job.save();
  }

  res.json({ message: 'Applied successfully' });
});

module.exports = router;
