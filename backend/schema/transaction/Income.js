const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true
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
  creditedTo: {
    type: String,
    enum: ['SBI', 'AXIS', 'IDBI', 'MISC'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Income', IncomeSchema);
