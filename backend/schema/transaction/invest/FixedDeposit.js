const mongoose = require('mongoose');

const FixedDepositSchema = new mongoose.Schema({
    
    deposit: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cmt: {
        type: String,
        default: ''
    },
    debit: {
        type: String,
        required: true
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Register'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FixedDeposit', FixedDepositSchema);
