const express = require('express')
const router = express.Router()
const request = require('request')
const UserCouple = require('../models/UserCouple')
// const Transaction = require('../models/Transaction')
// const APIkey = "f37bef48cce84ed092b150636191707"
// const moment = require('moment')

router.get('/transactions/:coupleKey', (req,res)=>{
    const coupleKey = req.params.coupleKey
    UserCouple.findById(`${coupleKey}`)
        .populate("transactions")
        .sort({date: -1})
        .exec((err,usercouple)=>{
            // console.log(usercouple)

            res.send(usercouple.transactions)
        })
        
})

module.exports = router