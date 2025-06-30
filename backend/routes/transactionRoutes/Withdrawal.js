// routes/withdrawal.js
const express = require('express');
const router = express.Router();
const Withdrawal = require('../../schema/transaction/Withdrawal');
const Debit = require('./Debit');
const Transaction = require('../../schema/transaction/transactionSection/Transaction')



router.post('/withdrawalEntry', async (req, res) => {
  try {
    const { userId, amount, date, comment, creditTo, debitFrom } = req.body;

    const newWithdrawal = new Withdrawal({
      userId,
      amount,
      date,
      comment,
      creditTo,
      debitFrom
    });

    await newWithdrawal.save();



    //  userId, category, debitamt, date, comment
    const sendCreditdata = {
      userId,
      category: creditTo,
      debitamt: amount,
      date,
      comment
    }

    const sendDebitdata = {
      userId,
      category: debitFrom,
      debitamt: -amount,
      date,
      comment
    }

    await Debit( sendCreditdata )
    await Debit( sendDebitdata )

    const transact = new Transaction({
            userId : userId,
            serialId : newWithdrawal._id,
            date : date,
            amt : amount,
            type: `Income from ${debitFrom} to ${creditTo}`,
            desc: "Withdrawal",
            cmt : comment
        })
        await transact.save();

    res.status(201).json({ message: 'Withdrawal saved successfully' });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
