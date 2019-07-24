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

router.get(`/thisMonthExpenses/:coupleKey/:startDate/:endDate`, (req,res)=>{
    const coupleKey = req.params.coupleKey
    const startDate = moment(req.params.startDate)
    const endDate = moment(req.params.endDate)
    UserCouple.findById(coupleKey)
        .populate('transactions')
        .exec((err,thisUser)=>{
            const categoryAndAmountObject = {}
            const allExpenses = thisUser.transactions.filter(t => t.type === "Expense")
            const expensesThisMonthOnly = allExpenses.filter(e => moment(e.date).isBetween(startDate, endDate))
            expensesThisMonthOnly.forEach(e => {
                if(categoryAndAmountObject[e.category]){
                    categoryAndAmountObject[e.category] += e.amount
                }
                else{
                    categoryAndAmountObject[e.category] = e.amount
                }
            })
            const categoryArray = Object.keys(categoryAndAmountObject)
            const amountArray = []
            categoryArray.forEach(c => amountArray)
            for(let i in categoryArray){
                amountArray.push(categoryAndAmountObject[categoryArray[i]])
            }
            const categoryAndAmountArrays = {
                categories: categoryArray,
                amount: amountArray
            }
            res.send(categoryAndAmountArrays)
        })
})

router.get(`/thisMonthTransactions/:coupleKey/:startDate/:endDate`, (req,res)=>{
    const coupleKey = req.params.coupleKey
    const startDate = moment(req.params.startDate)
    const endDate = moment(req.params.endDate)
    UserCouple.findById(coupleKey)
        .populate('transactions')
        .sort({date: -1})
        .exec((err,thisUser)=>{
            const transactionsThisMonthOnly = thisUser.transactions.filter(e => moment(e.date).isBetween(startDate, endDate))
            res.send(transactionsThisMonthOnly)
        })
})

router.get(`/travel/:destination/:startDate`, (req, res)=>{
    const destination = req.params.destination
    const startDate = req.params.startDate
    const airportIndex = [
        {city: "Paris", index: "PAR"},
        {city: "Madrid", index: "MAD"},
        {city: "Moscow", index: "MOW"},
        {city: "Berlin", index: "BER"}
    ]
    const airportName = airportIndex.find(i => i.city === destination).index
    request.get(`https://developer.goibibo.com/api/search/?app_key=ce9c9916342908ec12173f3996baecd6&app_id=92460641&format=json&source=TLV&dateofdeparture=${startDate}&seatingclass=E&adults=2&children=0&infants=0&counter=0&destination=${airportName}`, (err, response)=>{
        const getFlights = JSON.parse(response.body || "{}").data.onwardflights
        const myFlights = getFlights.map(f => {
            return {
                departureTime: f.deptime,
                arrivalTime: f.arrtime,
                arrivalDate: f.arrdate,
                flightDuration: f.duration,
                airline: f.airline,
                price: f.fare.totalfare * 0.014
            }
        })
        res.send(myFlights)
    })
})

module.exports = router