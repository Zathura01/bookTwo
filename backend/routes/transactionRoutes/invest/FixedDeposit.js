const express = require('express');
const router = express.Router();
const FixedDeposit = require('../../../schema/transaction/invest/FixedDeposit');
const Invest = require('../../../schema/transaction/Invest');
const Debit = require('../Debit');
const Transaction = require('../../../schema/transaction/transactionSection/Transaction')


router.post('/fdentry', async (req, res) => {
    try {
        const { userId, deposit, interestRate, date, cmt, debit } = req.body;

        const fd = new FixedDeposit({
            userId,
            deposit,
            interestRate,
            date,
            cmt,
            debit
        });

        const saved = await fd.save();

        // Check for existing Invest record
            const existingInvest = await Invest.findOne({ userId });
        
            if (!existingInvest) {
              // No Invest record: create one
              const newInvest = new Invest({
                userId,
                fixeddeposit: deposit,
                TOTAL: deposit
              });
              await newInvest.save();
            } else {
              // Invest exists: update gold and goldqty
              existingInvest.fixeddeposit += deposit;
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
                userId : userId,
                serialId : fd._id,
                date : date,
                amt : deposit,
                type: `Invested in FD from ${debit}`,
                desc: "FixedDeposit",
                cmt : cmt
            })
            await transact.save();

        res.status(201).json(saved);


    } catch (err) {
        console.error('Error saving FD:', err);
        res.status(500).json({ error: 'Failed to save Fixed Deposit' });
    }
});

module.exports = router;
