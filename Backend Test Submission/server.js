const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const shorturlRoutes = require("./routes/shorturl");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('../log-middleware/logger');

const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger); // Custom logger middleware

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
