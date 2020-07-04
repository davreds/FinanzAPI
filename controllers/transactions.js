const Transaction = require('../models/transaction')
const Account = require('../models/account')

const getTransactions = function (req, res) {
    Transaction.find().then(function (transactions) {
        return res.send(transactions)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

const getTransaction = function (req, res) {
    const _id = req.params.id
    Transaction.findById(_id).then(function (transaction){
        if (!transaction) {
            return res.status(404).send({ error: 'Transaction does not exist.' })
        }
        return res.send(transaction)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

const createTransaction = async function(req, res) {
    const _accID = req.body.account
    var _amnt = req.body.amount
    req.body.timestamp = Date.now()
    const transaction = new Transaction(req.body)

    var account = await Account.findById(_accID)
    if (!account) {
        return res.status(404).send({ error: 'Account does not exist.' })
    }
    if(req.body.type == 'Debit'){
        _amnt = -_amnt
    }
    account.balance += _amnt
    account.save().then(function(){
        transaction.save().then(function(){
            return res.send(transaction)
        }).catch(function (error) {
            return res.status(500).send({ error: error })
        })
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

const deleteTransaction = function(req, res) {
    const _id = req.params.id
    Transaction.findByIdAndDelete(_id).then(function(transaction){
        if (!transaction) {
            return res.status(404).send({ error: 'Transaction does not exist.' })
        }
        return res.send(transaction)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

module.exports = {
    getTransactions: getTransactions,
    getTransaction: getTransaction,
    createTransaction: createTransaction,
    deleteTransaction: deleteTransaction
}