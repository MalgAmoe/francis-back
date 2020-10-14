const rateLimit = require('express-rate-limit');

module.exports = 
  rateLimit({
    windowMs: 10 * 60 * 1000, // 24 hrs in milliseconds
    max: 100,
    message: 'You have exceeded the 100 requests in 10 minutes limit!',
    headers: true,
  });
