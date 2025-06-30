const mongoose = require('mongoose')


const InvestSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Register'
    },
    gold:{
        type: Number,
        default: 0
    },
    goldqty:{
        type: Number,
                default: 0

    },
    mutualfund:{
        type: Number,        default: 0

    },
    fixeddeposit:{
        type: Number,        default: 0

    },
    fixedratebond:{
        type: Number,        default: 0

    },
    realestate:{
        type:Number,        default: 0

    },
    goldbond:{
        type: Number,        default: 0

    },
    TOTAL:{
        type: Number, default: 0
    }

})

module.exports = mongoose.model('Invest', InvestSchema);