const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
    type: String,
    category: String,
    amount: Number,
    date: Date,
    comment: String
})

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction