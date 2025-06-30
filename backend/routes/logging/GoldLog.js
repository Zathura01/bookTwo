const express = require('express');
const GoldLogs = require('../../schema/loggingForFuture/GoldLogs');
const router = express.Router()

router.post('/sendGold/:userId', async(req, res)=>{
   const userId = req.params.userId;
   const { sellValue, buyValue, date } = req.body;

   const newGoldLog = new GoldLogs({
    sellValue,
    buyValue,
    date,
    userId
   })

   await newGoldLog.save();
   res.json({message: "Log Done"}).status(200)

})



module.exports = router;
