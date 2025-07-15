const express = require("express");
const router = express.Router();
const log = require("../middleware/logger");

router.post("/shorturls", async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || !/^https?:\/\//.test(url)) {
    await log("backend", "error", "handler", "Invalid URL format", process.env.TOKEN);
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const shortLink = `https://localhost:5000/${shortcode || Math.random().toString(36).slice(2, 8)}`;
  const expiry = new Date(Date.now() + validity * 60000).toISOString();

  await log("backend", "info", "service", "Short URL created", process.env.TOKEN);
  res.status(201).json({ shortLink, expiry });
});

module.exports = router;
