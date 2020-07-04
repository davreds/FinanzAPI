const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    balance: {
        type: Float,
        default: 0,
        min: 0
    },
    concept: {
        type: String,
        required: true,
        default: ''
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction