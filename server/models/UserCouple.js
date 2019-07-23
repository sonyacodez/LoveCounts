const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Transaction = require('../models/Transaction')

const userCoupleSchema = new Schema ({
    coupleNames: [String],
    coupleEmails: [String],
    _password: String,
    transactions: [{type:Schema.Types.ObjectId, ref: "Transaction"}],
    goals: []
})
    
const UserCouple = mongoose.model("UserCouple", userCoupleSchema)

module.exports = UserCouple