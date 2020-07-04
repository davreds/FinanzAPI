const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Cash', 'Debit', 'Credit', 'Savings'],
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Account = mongoose.model('Account', accountSchema)

module.exports = Account