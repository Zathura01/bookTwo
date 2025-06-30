const express = require('express')
const router = express.Router();
const Income = require('../../schema/transaction/Income');
const Debit = require('./Debit');
const Transaction = require('../../schema/transaction/transactionSection/Transaction');



router.post("/incomeEntry", async(req, res) => {
    const { userId, source, amount, date, comment, creditedTo} = req.body;
    
    const newIncome = new Income({
        userId,
        source,
        amount,
        date,
        comment,
        creditedTo
    })
    await newIncome.save();


    //  userId, category, debitamt, date, comment

    const credit = {
        userId,
        category: creditedTo,
        debitamt: amount,
        date,
        comment
    }

    await Debit( credit );

    const transact = new Transaction({
        userId : userId,
        serialId : newIncome._id,
        date : date,
        amt : amount,
        type: `Income from ${source} to ${creditedTo}`,
        desc: "Income",
        cmt : comment
    })
    await transact.save();

   res.status(201).json({ message: 'Income and transaction saved' });



});

module.exports = router