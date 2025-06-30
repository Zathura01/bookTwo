const express = require('express');
const router = express.Router();
const Save = require('../../schema/transaction/Save');
const Expense = require('../../schema/transaction/Expense');
const Gold = require('../../schema/transaction/invest/Gold');
const FixedDeposit = require('../../schema/transaction/invest/FixedDeposit');
const FixedInterestRateBond = require('../../schema/transaction/invest/FixedInterestRateBond');
const MutualFund = require('../../schema/transaction/invest/MutualFund');


router.post('/save/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Save.find({ userId: userId });

    if (!data) {
      return res.status(404).json({ message: 'Data not found for this user.' });
    }

    console.log(data);
    res.json(data); // send data back to client
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/expense/:userId', async (req, res)=>{
  try {
    const userId = req.params.userId;
    const data = await Expense.find({ userId: userId });
    res.json(data);
    I
  } catch (error) {
    
  }
})

router.post('/invest/:userId', async (req, res)=>{
  try {
    const userId = req.params.userId;
    const dataGold = await Gold.find( { userId })
    const dataFixedDeposit = await FixedDeposit.find({ userId })
    const dataFixedRateBond = await FixedInterestRateBond.find({ userId })
    const dataMutualFund = await MutualFund.find({ userId })

    const investData = { dataGold, dataFixedDeposit, dataFixedRateBond, dataMutualFund}

    res.json(investData);

  } catch (error) {
    
  }
})


module.exports = router;
