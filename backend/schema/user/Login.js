const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  dob: String,
  email: { type: String, required: true, unique: true },
  country: String
});

module.exports = mongoose.model('Login', LoginSchema);
