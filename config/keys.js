// keys.js figure out dev or prod.

if (process.env.NODE_ENV === 'production') {
  // in prod
  module.exports = require('./prod');
} else {
  // in dev
  module.exports = require('./dev');
}
