const rateLimit = require('express-rate-limit');

const playerLimit = rateLimit({
  windowMs: 30 * 1000,
  max: 15,
  message: 'You have exceeded the 20 change song requests in 1 minute limit!',
  headers: true,
});

module.exports = {
  playerLimit
}
