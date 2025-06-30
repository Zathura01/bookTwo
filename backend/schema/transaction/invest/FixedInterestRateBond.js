const mongoose = require('mongoose');

const fixedInterestBondSchema = new mongoose.Schema({
  period: {
    type: Number,
    required: true,
    min: 1, // months or years depending on your logic
  },
  deposit: {
    type: Number,
    required: true,
    min: 0,
  },
  interestAtStart: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  cmt: {
    type: String,
    default: ''
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
      required: true
    },
  debit: {
    type: String,
    required: true,
    enum: [ // Match this with your `DebitFrom` list
      'SBI', 'AXIS', 'IDBI', 'MISC'
    ]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FixedInterestBond', fixedInterestBondSchema);
