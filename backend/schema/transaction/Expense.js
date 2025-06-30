const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register', // assuming 'Register' is your user model
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Food', 'Shelter', 'Gas', 'Bike', 'Stationary', 'Smoke',
      'Shopping', 'Washing', 'Wine', 'Medicine', 'Jio', 'Misc'
    ],
    required: true,
  },
  subcategory: {
    type: String,
    trim: true,
    default: ''
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    trim: true
  },
  debitedFrom: {
    type: String,
    enum: ['SBI', 'AXIS', 'IDBI', 'MISC'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
