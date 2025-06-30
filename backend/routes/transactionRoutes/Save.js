const express = require('express');
const router = express.Router();
const SaveEntry = require('../../schema/transaction/Save');
// const verifyToken = require('../../middleware/verifyToken');
const saveDash = require('../../../backend/schema/dash/Save')
const Transaction = require('../../schema/transaction/transactionSection/Transaction')



router.post('/saveThis', async (req, res) => {
  const { userId, category, deposit, date, comment } = req.body;

  try {
    const newEntry = new SaveEntry({
      userId,
      category,
      deposit,
      date,
      comment,
    });

    const saved = await newEntry.save();

    const transact = new Transaction({
            userId : userId,
            serialId : newEntry._id,
            date : date,
            amt : deposit,
            type: `Saving to ${category}`,
            desc: "Save",
            cmt : comment
        })
        await transact.save();


    res.status(201).json({ message: 'Entry saved', entry: saved });

    let existSaveDash = await saveDash.findOne({ userId });

    if (!existSaveDash) {
      // Create a new saveDash with initial values set
      const newSaveDash = new saveDash({
        userId,
        SBI: category === 'SBI' ? deposit : 0,
        AXIS: category === 'AXIS' ? deposit : 0,
        IDBI: category === 'IDBI' ? deposit : 0,
        MISC: ['SBI', 'AXIS', 'IDBI'].includes(category) ? 0 : deposit,
        TOTAL: deposit
      });
    
      await newSaveDash.save();
    } else {
      // Update the appropriate field
      if (category === 'SBI') {
        existSaveDash.SBI += deposit;
      } else if (category === 'AXIS') {
        existSaveDash.AXIS += deposit;
      } else if (category === 'IDBI') {
        existSaveDash.IDBI += deposit;
      } else {
        existSaveDash.MISC += deposit;
      }
      existSaveDash.TOTAL += deposit;
      await existSaveDash.save(); // Await the save
    }

  } catch (err) {
    console.error('Error saving entry:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
