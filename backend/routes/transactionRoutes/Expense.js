// routes/expense.js
const express = require('express');
const router = express.Router();
const Expense = require('../../schema/transaction/Expense'); // transaction entry
const verifyToken = require('../../middleware/verifyToken');
const expenseDash = require('../../../backend/schema/dash/Expense'); // dashboard summary
const Debit = require('../transactionRoutes/Debit')
const Transaction = require('../../schema/transaction/transactionSection/Transaction')

// ADD EXPENSE ROUTE
router.post('/addExpense', async (req, res) => {
  const { userId, category, subcategory, amount, date, comment, debitedFrom } = req.body;

  try {
    // 1. Save the transaction
    const newExpense = new Expense({
      userId,
      category,
      subcategory,
      amount,
      date,
      comment,
      debitedFrom,
    });

    const saved = await newExpense.save();

    // 2. Update or create expense dashboard summary
    let existExpDash = await expenseDash.findOne({ userId });

    const categories = [
      "Food", "Shelter", "Gas", "Bike", "Stationary", "Smoke",
      "Shopping", "Washing", "Wine", "Medicine", "Jio", "Misc"
    ];

    let field = categories.includes(category) ? category : 'Misc';

    if (!existExpDash) {
      const initial = {};
      for (let cat of categories) {
        initial[cat] = 0;
      } 
      initial[field] = amount;
      initial.TOTAL = amount;
      initial.userId = userId;

      const newExpDash = new expenseDash(initial);
      await newExpDash.save();
    } else {
      existExpDash[field] += amount;
      existExpDash.TOTAL += amount;
      await existExpDash.save();
    }


    //debit from resp saving account
    const debitFields = {
      userId, category: debitedFrom, debitamt:-amount, date, comment
    }
    await Debit( debitFields );

    const transact = new Transaction({
            userId : userId,
            serialId : newExpense._id,
            date : date,
            amt : amount,
            type: `Expense on ${category} from ${debitedFrom}`,
            desc: "Expense",
            cmt : comment
        })
        await transact.save();
    
    res.status(201).json({ message: 'Expense saved successfully', entry: saved });


  } catch (err) {
    console.error('Expense save error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
