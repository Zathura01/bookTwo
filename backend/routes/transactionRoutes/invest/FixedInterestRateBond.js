const express = require('express');
const router = express.Router();
const FixedInterestBond = require('../../../schema/transaction/invest/FixedInterestRateBond');
const Invest = require('../../../schema/transaction/Invest');
const Debit = require('../Debit');
const Transaction = require('../../../schema/transaction/transactionSection/Transaction')



router.post('/fibentry', async (req, res) => {

  try {
    const {
      userId,
      period,
      deposit,
      interestAtStart,
      date,
      cmt,
      debit
    } = req.body;
    console.log(userId, period, deposit, interestAtStart, date, cmt, debit)
    const bond = new FixedInterestBond({
      userId,
      period,
      deposit,
      interestAtStart,
      date,
      cmt,
      debit
    });
    const saved = await bond.save();

    // Check for existing Invest record
    const existingInvest = await Invest.findOne({ userId });

    if (!existingInvest) {
      // No Invest record: create one
      const newInvest = new Invest({
        userId,
        fixedratebond: deposit,
        TOTAL: deposit
      });
      await newInvest.save();
    } else {
      // Invest exists: update gold and goldqty
      existingInvest.fixedratebond += deposit
      existingInvest.TOTAL += deposit
      await existingInvest.save();
    }

    //debit update
    //  userId, category, debitamt, date, comment
    const sendDebitdata = {
      userId,
      category: debit,
      debitamt: - deposit,
      date,
      cmt
    }
    await Debit(sendDebitdata)

    const transact = new Transaction({
      userId: userId,
      serialId: bond._id,
      date: date,
      amt: deposit,
      type: `Invested in Bond from ${debit}`,
      desc: "FixedInterestRateBond",
      cmt: cmt
    })
    await transact.save();

    res.status(201).json(saved);


  } catch (err) {
    console.error('Failed to save bond:', err);
    res.status(500).json({ error: 'Failed to save bond' });
  }
});

module.exports = router;
