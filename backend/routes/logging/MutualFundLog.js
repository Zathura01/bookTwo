const express = require('express');
const MutualFundLog = require('../../schema/loggingForFuture/MutualFundLog');
const router = express.Router();

router.post('/sendMutualFund/:userId', async(req, res)=>{

 const { mutualFundId, marketValue, date, userId } = req.body;

 const newMutualFundLog = new MutualFundLog({
    mutualFundId: mutualFundId,
    marketValue,
    date,
    userId
 })

 await newMutualFundLog.save();
   res.json({message: "Log Done"}).status(200)

})



module.exports = router;