const express = require("express");
const SaveEntry = require('../../schema/transaction/Save');
// const verifyToken = require('../../middleware/verifyToken');
const saveDash = require('../../../backend/schema/dash/Save')

const Debit= async( { userId, category, debitamt, date, comment }, res )=>{


  try {
    const newEntry = new SaveEntry({
      userId,
      category,
      deposit: debitamt ,
      date,
      comment,
    });

    const saved = await newEntry.save();
    if( res ) res.status(201).json({ message: 'Entry saved', entry: saved });

    let existSaveDash = await saveDash.findOne({ userId });

    if (!existSaveDash) {
      if(res) res.status(201).json({message: 'Not enough Balance'})
    } else {
      // Update the appropriate field
      if (category === 'SBI') {
        existSaveDash.SBI += debitamt;

      } else if (category === 'AXIS') {
        existSaveDash.AXIS += debitamt;
      } else if (category === 'IDBI') {
        existSaveDash.IDBI += debitamt;
      } else {
        existSaveDash.MISC += debitamt;
      }
      existSaveDash.TOTAL += debitamt;
      await existSaveDash.save(); // Await the save
    }

  } catch (err) {
    console.error('Error saving entry:', err);
    if(res) res.status(500).json({ message: 'Server error' });
  }


}


module.exports = Debit;
