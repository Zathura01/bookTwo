// models/Withdrawal.js
const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comment: String,
  creditTo: {
    type: String,
    enum: ['SBI', 'AXIS', 'IDBI', 'MISC', 'PHYSICAL'],
    required: true
  },
  debitFrom: {
    type: String,
    required: true
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
      required: true
    }
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
