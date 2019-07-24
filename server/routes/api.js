const express = require('express')
const router = express.Router()
const request = require('request')
const UserCouple = require('../models/UserCouple')
const Transaction = require('../models/Transaction')
const moment = require('moment')

router.get('/transactions/:coupleKey', (req,res)=>{
    const coupleKey = req.params.coupleKey
    UserCouple.findById(`${coupleKey}`)
        .populate("transactions")
        .sort({date: -1})
        .exec((err,usercouple)=>{
            res.send(usercouple.transactions)
        })
})

router.post('/transactions', function(req,res){
    const expenseInfo = req.body
    const coupleKey = req.body.coupleKey
    const expenseDate = req.body.date
    const newExpense = new Transaction ({
        type: expenseInfo.type,
        category: expenseInfo.category,
        amount: expenseInfo.amount,
        date: expenseDate,
        comment: expenseInfo.comment
    })
    newExpense.save()
    UserCouple.findById(coupleKey, (err,response)=>{
        console.log(UserCouple)
        response.transactions.push(newExpense)
        response.save()
        res.end()
    })
})

router.get('/goals/:coupleKey', (req,res)=>{
    const coupleKey = req.params.coupleKey
    UserCouple.findById(`${coupleKey}`)
        .sort({date: -1})
        .exec((err,usercouple)=>{
            res.send(usercouple.goals)
        })
})

router.post('/goal', function(req,res){
    const goalName = req.body.goalName
    const coupleKey = req.body.coupleKey
    UserCouple.findById(coupleKey, (err,response)=>{
        response.goals.push(goalName)
        response.save()
        res.end()
    })
})

router.delete(`/transaction/:coupleKey/:transactionKey`, (req,res) => {
    const transactionKey = req.params.transactionKey
    const coupleKey = req.params.coupleKey
    Transaction.deleteOne({_id: transactionKey},(err, response)=> console.log(err))
    UserCouple.findById(coupleKey, (err,response)=>{
        const index = response.transactions.findIndex(t => t._id = transactionKey)
        response.transactions.splice(index, 1)
        response.save()
        res.end()
    })
})

router.delete(`/goal/:coupleKey/:goalName`, (req,res) => {
    const coupleKey = req.params.coupleKey
    const goalName = req.params.goalName
    UserCouple.findById(coupleKey, (err,response)=>{
        const index = response.goals.findIndex(t => t === goalName)
        response.goals.splice(index, 1)
        response.save()
        res.end()
    })
})


module.exports = router