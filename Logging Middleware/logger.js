const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const logLine = `${new Date().toISOString()} ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync(path.join(__dirname, 'server.log'), logLine);
  next();
};

module.exports = logger;
