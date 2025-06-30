// schema/transaction/Expense.js
const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Register'
  },
  Food: {
    type: Number,
    default: 0
  },
  Shelter: {
    type: Number,
    default: 0
  },
  Gas: {
    type: Number,
    default: 0
  },
  Bike: {
    type: Number,
    default: 0
  },
  Stationary: {
    type: Number,
    default: 0
  },
  Smoke: {
    type: Number,
    default: 0
  },
  Shopping: {
    type: Number,
    default: 0
  },
  Wine: {
    type: Number,
    default: 0
  },
  Washing: {
    type: Number,
    default: 0
  },
  Medicine: {
    type: Number,
    default: 0
  },
  Jio: {
    type: Number,
    default: 0
  },
  Misc: {
    type: Number,
    default: 0
  },
  TOTAL:{
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('expenseDash', ExpenseSchema);
