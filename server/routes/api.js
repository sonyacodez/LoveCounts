const express = require('express')
const router = express.Router()
const request = require('request')
const UserCouple = require('../models/UserCouple')
// const Transaction = require('../models/Transaction')
// const APIkey = "f37bef48cce84ed092b150636191707"
// const moment = require('moment')

// router.get('/transactions', (req,res)=>{
//     const coupleKey = req.body
//     UserCouple.findById(`${coupleKey}`)
//         .populate("transactions")
//         .exec((err,usercouple)=>{res.send(usercouple.transactions)})
//         .sort({date: -1})
// })
    // GET(‘/transactions): 
    // receives the key
    // Searches for the specific user instance with the key.
    // Retrieves the transactions array of objects
    // Sends the transactions array to the Model’s getTransactions.

module.exports = router