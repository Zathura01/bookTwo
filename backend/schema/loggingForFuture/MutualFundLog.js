const mongoose = require('mongoose')
const express = require('express')

const MutualFundSchema = new mongoose.Schema({
   mutualFundId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MutualFund',
    required: true
   },
   marketValue:{
      type: Number,
      required: true,
      min: 0
   },
   date:{
      type: Date,
      default: Date.now
   },
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
      required: true
   }
})

module.exports = mongoose.model('mutualFundSchema', MutualFundSchema);

