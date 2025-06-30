const mongoose = require('mongoose');

const saveEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register', // assuming 'Register' is the user collection
    required: true,
  },
  category: {
    type: String,
    enum: ['SBI', 'AXIS', 'IDBI', 'MISC'],
    required: true,
  },
  deposit: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('SaveEntry', saveEntrySchema);
