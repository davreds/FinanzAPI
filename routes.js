const express = require('express')
const router = express.Router()
const cors = require('cors')

// Controllers
const account = require('./controllers/accounts')
const transaction = require('./controllers/transactions')

router.all('*', cors())

// Account routes
router.get('/accounts', account.getAccounts)
router.get('/accounts/:id', account.getAccount)
router.post('/accounts/', account.createAccount)
router.put('/accounts/:id', account.updateAccount)
router.delete('/accounts/:id', account.deleteAccount)

// Transactions
router.get('/transactions', transaction.getTransactions)
router.get('/transactions/:id', transaction.getTransaction)
router.post('/transactions/', transaction.createTransaction)
router.delete('/transactions/:id', transaction.deleteTransaction)

router.get('*', function (req, res) {
    res.send({
        error: 'This route does not exist'
    })
})

module.exports = router
