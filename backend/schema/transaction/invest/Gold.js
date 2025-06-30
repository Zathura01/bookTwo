// models/Gold.js
const mongoose = require('mongoose');

const goldSchema = new mongoose.Schema({
  purchaseAmount: {
    type: Number,
    required: true
  },
  marketSellAmount: {
    type: Number,
    required: true
  },
  qtyPurchased: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comment: {
    type: String
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

module.exports = mongoose.model('Gold', goldSchema);
