const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    trim: true,
    default: ''
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    minlength: 5 
  },
  dob: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true 
});

const Register = mongoose.model('Register', RegisterSchema);
module.exports = Register;
