const express = require('express')
const mongoose = require('mongoose')


const transactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true
      },
    serialId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath : 'desc'
    },
    date : {
        type: Date,
        default: Date.now
    },
    amt : {
        type: Number,
        required: true
    },
    type : {
        type: String,
        required: true
    },
    desc : {
       type : String,
       required: true,
       enum: ['Income', 'Expense', 'Save', 'Withdrawal', 'FixedDeposit', 'FixedInterestRateBond', 'Gold', 'MutualFunds'] 
    },
    cmt : {
        type: String
    }
},{ timestamps : true });

module.exports = mongoose.model('Transaction', transactionSchema);