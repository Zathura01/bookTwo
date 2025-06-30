// index.js or server.js
const express = require("express");
const app = express();
const PORT = 4500;
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRegister = require('./routes/userRoutes/Register');
const userLogin = require('./routes/userRoutes/Login')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB"))
.catch(err => console.log("Failed to connect to DB", err));

//user logs
app.use('/api/user', userRegister);
app.use('/api/userlog', userLogin);

//making entries
app.use('/api/transaction', require('../backend/routes/transactionRoutes/Save'));
app.use('/api/expense', require('../backend/routes/transactionRoutes/Expense'));
app.use('/api/income', require('../backend/routes/transactionRoutes/Income'));
app.use('/api/withdrawal', require('../backend/routes/transactionRoutes/Withdrawal'));
app.use('/api/invest/gold', require('../backend/routes/transactionRoutes/invest/Gold'));
app.use('/api/invest/mutualfund', require('../backend/routes/transactionRoutes/invest/MutualFunds'));
//app.use('/api/invest/goldbond', require('../backend/routes/transactionRoutes/invest/GoldBond'))
//app.use('/api/invest/ppf', require('../backend/routes/transactionRoutes/invest/PPF'))
//app.use('/api/invest/realestate', require('../backend/routes/transactionRoutes/invest/RealEstate'))
app.use('/api/invest/fixedinterestratebond', require('../backend/routes/transactionRoutes/invest/FixedInterestRateBond'))
app.use('/api/invest/fixeddeposit', require('../backend/routes/transactionRoutes/invest/FixedDeposit'))
app.use('/api/dashdata', require('../backend/routes/dashRoutes/GetAll'))
app.use('/api/getInsight', require('../backend/routes/insight/Save'))
app.use('/api/trasact', require('../backend/routes/transactionCard/Transactioncard'))
app.use('/api/sendMarket/gold', require('../backend/routes/logging/GoldLog'));
app.use('/api/sendMarket/mutualfund', require('../backend/routes/logging/MutualFundLog'));



app.listen(PORT, () => console.log("Server running on port " + PORT));
