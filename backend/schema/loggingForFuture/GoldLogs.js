const mongoose = require('mongoose');

const GoldLogSchema = new mongoose.Schema({
  sellValue: {
    type: Number,
    required: true,
    min: 0
  },
  buyValue: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register', // Assuming you have a User model
    required: true
  }
});

module.exports = mongoose.model('GoldLog', GoldLogSchema);
