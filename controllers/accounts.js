const Account = require('../models/account')

const getAccounts = function (req, res) {
    Account.find().then(function (accounts) {
        return res.send(accounts)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

const getAccount = function (req, res) {
    const _id = req.params.id
    Account.findById(_id).then(function (account) {
        if (!account) {
            return res.status(404).send({ error: 'Account does not exist.' })
        }
        return res.send(account)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

const createAccount = function (req, res) {
    const account = new Account(req.body)
    account.save().then(function () {
        return res.send(account)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

const updateAccount = function (req, res) {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'type', 'visibility']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update. Only allowed to update: ' + allowedUpdates + '.' })
    }

    Account.findByIdAndUpdate(_id, req.body).then(function (account) {
        if (!account) {
            return res.status(404).send({ error: 'Account does not exist.' })
        }
        return res.send(account)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

const deleteAccount = function (req, res) {
    const _id = req.params.id
    Account.findByIdAndDelete(_id).then(function (account) {
        if (!account) {
            return res.status(404).send({ error: 'Account does not exist.' })
        }
        return res.send(account)
    }).catch(function (error) {
        return res.status(500).send({ error: error })
    })
}

module.exports = {
    getAccounts: getAccounts,
    getAccount: getAccount,
    createAccount: createAccount,
    updateAccount: updateAccount,
    deleteAccount: deleteAccount
}