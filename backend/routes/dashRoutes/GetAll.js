const express = require('express');
const router = express.Router();
const Save = require('../../schema/dash/Save');
const Invest = require('../../schema/transaction/Invest');
const Expense = require('../../schema/dash/Expense');

router.get('/getAll/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [saveDocs, investDocs, expenseDocs] = await Promise.all([
      Save.findOne({ userId }),
      Invest.findOne({ userId }),
      Expense.findOne({ userId })
    ]);

    res.status(200).json({
      save: saveDocs,
      invest: investDocs || {},
      expense: expenseDocs
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
