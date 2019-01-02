const mongoose = require('mongoose');
const config = require('config');

mongoose
  .connect(
    config.get('database.uri'),
    config.get('database.options'),
  )
  .then(() => console.info('connection with mongo establishment'));

mongoose.Promise = global.Promise;

module.exports = mongoose;
