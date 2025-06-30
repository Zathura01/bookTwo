const mongoose = require('mongoose');

const mutualFundSchema = new mongoose.Schema({
  planType: {
    type: String,
    enum: ['LUMPSUM', 'SIP'],
    required: true,
  },
  purchaseAmount: {
    type: Number,
    required: true,
  },
  unitsBought: {
    type: Number,
    required: true,
  },
  unitCost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
  },
  debitFrom: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Register'
  }
});

module.exports = mongoose.model('MutualFund', mutualFundSchema);
