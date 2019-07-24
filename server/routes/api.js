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

const airportIndex = [
   {city: "Paris", index: "PAR"},
   {city: "Madrid", index: "MAD"},
   {city: "Moscow", index: "MOW"},
   {city: "Berlin", index: "BER"}
]

url = 'https://developer.goibibo.com/api/search/?app_key=ce9c9916342908ec12173f3996baecd6&app_id=92460641&format=json&source=TLV&dateofdeparture=20190825&seatingclass=E&adults=2&children=0&infants=0&counter=0&destination='

router.get('/recs/:destination', function (req, res){
   let destination = req.params.destination
   let index = airportIndex.find(i=>i.city===destination).index
   request(url+index, function(err, response, body){
       const getBody = JSON.parse(response.body || "{}")
       res.send(getBody)
})})
// router.get('/car/:address/:citystatezip', (req,res)=>{
//     const APIKey = "X1-ZWz17r8v83e58r_8s1xw"
//     const address = req.params.address
//     const citystatezip = req.params.citystatezip
//     request.get(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${APIKey}&address=${address}&citystatezip=${citystatezip}`, function(err, housesForSale){
//         const houses = JSON.parse(housesForSale.body || "{}")
//         // const allActiveTeamPlayers = roster.filter(p => p.teamId === teamToIDs[teamName] && p.isActive)
//         // const myTeamPlayers = allActiveTeamPlayers.map(a => {
//         //     return {
//         //         firstName: a.firstName,
//         //         lastName: a.lastName,
//         //         jersey: a.jersey,
//         //         pos: a.pos
//         //     }
//     })
//     Below is an example of calling the API for the address for 
//     the exact address match "2114 Bigelow Ave", "Seattle, WA":
//     http://www.zillow.com/webservice/GetDeepSearchResults.htm
//     ?zws-id=<ZWSID>
//     &
//     address=2114+Bigelow+Ave
//     &
//     citystatezip=Seattle%2C+WA

module.exports = router