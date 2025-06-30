const express = require('express');
const router = express.Router();
const MutualFund = require('../../../schema/transaction/invest/MutualFund');
const Invest = require('../../../schema/transaction/Invest')
const Debit = require('../Debit');
const Transaction = require('../../../schema/transaction/transactionSection/Transaction')




router.post('/mfentry', async (req, res) => {
  try {
    const {
      userId,
      planType,
      purchaseAmount,
      unitsBought,
      unitCost,
      date,
      comment,
      debitFrom
    } = req.body;

    const mf = new MutualFund({
      userId,
      planType,
      purchaseAmount,
      unitsBought,
      unitCost,
      date,
      comment,
      debitFrom
    });

    await mf.save();

    const existingRecord = await Invest.findOne({ userId });
    if(!existingRecord){
       const newInvest = new Invest({
          userId,
          mutualfund: purchaseAmount,
          TOTAL: purchaseAmount
       })
       await newInvest.save();

    }else{
        existingRecord.mutualfund += purchaseAmount;
        existingRecord.TOTAL += purchaseAmount
        await existingRecord.save()
    }

    //debit update
            //  userId, category, debitamt, date, comment
            const sendDebitdata = {
              userId,
              category: debitFrom,
              debitamt: - purchaseAmount,
              date,
              cmt: comment
            }
            await Debit(sendDebitdata)

     const transact = new Transaction({
            userId : userId,
            serialId : mf._id,
            date : date,
            amt : purchaseAmount,
            type: `Invested in MutualFunds from ${debitFrom}`,
            desc: "MutualFunds",
            cmt : comment
        })
        await transact.save();

        res.status(201).json({ message: 'Mutual fund entry saved' });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
