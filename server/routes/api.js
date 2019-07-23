const express = require('express')
const router = express.Router()
const request = require('request')
const UserCouple = require('../models/UserCouple')
const Transaction = require('../models/Transaction')
const moment = require('moment')


router.get('/transactions/:key', (req,res)=>{
    const coupleKey = req.params.key
    UserCouple.findById(`${coupleKey}`)
        .populate("transactions")
        .sort({date: -1})
        .exec((err,usercouple)=>{
            // console.log(usercouple)

            res.send(usercouple.transactions)
        })
})

router.post('/expenses', function(req,res){
    const expenseInfo = req.body
    const coupleKey = req.body.coupleKey
    const expenseDate = req.body.date ? moment(req.body.date).format('LLLL') : null
    const newExpense = new Transaction ({
        type: expenseInfo.type,
        category: expenseInfo.category,
        amount: expenseInfo.amount,
        date: expenseDate,
        comment: expenseInfo.comment
    })
    newExpense.save()
    UserCouple.findById(coupleKey, (err,response)=>{
        response.transactions.push(newExpense)
        response.save()
        res.end()
    })
})


module.exports = router