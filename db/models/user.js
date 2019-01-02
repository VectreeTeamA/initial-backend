const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('utils/mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: String,
  password: String,
});

// You may be wondering about password security, specifically salting/hashing the password.
// Fortunately, the passport-local-mongoose package automatically takes care of salting
// and hashing the password for us.
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', User);
