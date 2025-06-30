const express = require('express');
const router = express.Router();
const Gold = require('../../../schema/transaction/invest/Gold');
const Invest = require('../../../schema/transaction/Invest');
const Debit = require('../Debit');
const Transaction = require('../../../schema/transaction/transactionSection/Transaction')



router.post('/Entry', async (req, res) => {
  try {
    const {
      userId,
      purchaseAmount,
      marketSellAmount,
      qtyPurchased,
      date,
      comment,
      debitFrom
    } = req.body;

    // Save gold transaction
    const newGold = new Gold({
      userId,
      purchaseAmount,
      marketSellAmount,
      qtyPurchased,
      date,
      comment,
      debitFrom
    });

    await newGold.save();

    // Check for existing Invest record
    const existingInvest = await Invest.findOne({ userId });

    if (!existingInvest) {
      // No Invest record: create one
      const newInvest = new Invest({
        userId,
        gold: purchaseAmount,
        goldqty: qtyPurchased,
        TOTAL: purchaseAmount
      });
      await newInvest.save();
    } else {
      // Invest exists: update gold and goldqty
      existingInvest.gold += purchaseAmount;
      existingInvest.goldqty += qtyPurchased;
      existingInvest.TOTAL += purchaseAmount;
      await existingInvest.save();
    }


    //debit update
                //  userId, category, debitamt, date, comment
                const sendDebitdata = {
                  userId,
                  category: debitFrom,
                  debitamt: - purchaseAmount,
                  date,
                  comment
                }
                await Debit(sendDebitdata)

     const transact = new Transaction({
            userId : userId,
            serialId : newGold._id,
            date : date,
            amt : purchaseAmount,
            type: `Invested in Gold from ${debitFrom}`,
            desc: "Gold",
            cmt : comment
        })
        await transact.save();

        res.status(201).json({ message: 'Gold entry and investment record updated successfully' });


  } catch (err) {
    console.error('Error saving gold entry or updating invest:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
