const rateLimit = require('express-rate-limit');

const playerLimit = rateLimit({
  windowMs: 30 * 1000,
  max: 15,
  message: 'You have exceeded the 15 change song requests in 30 seconds limit!',
  headers: true,
});

module.exports = {
  playerLimit
}
