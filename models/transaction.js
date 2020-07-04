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
    amount: {
        type: Number,
        default: 0,
        min: 0
    },
    concept: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['Payroll', 'Services Payment', 'Unforseen Expenses',
                'Suscriptions', 'Food', 'Entertainment', 'Loan', 'Eating Out', 
                'Luxuries', 'Clothing', 'Cravings'],
        required: true
    },
    type: {
        type: String,
        enum: ['Debit', 'Credit'],
        default: 'Credit'
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction