const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const path = require('path')
const UserCouple = require('./server/models/UserCouple')
const Transaction = require('./server/models/Transaction')

// ------------------------DUMMY DATA------------------------
// const sonyaAndNadav = new UserCouple ({
//     coupleNames: ["Sonya", "Nadav"],
//     coupleEmails: ["sonya.burlan@gmail.com", "nadav.ghez@gmail.com"],
//     _password: "lovecounts",
//     transactions: [],
//     goals: ["travel"]
// })

// const pizzaParty = new Transaction ({
//     type: "Expense",
//     category: "Food",
//     amount: 150,
//     date: 2019-07-23,
//     comment: "Had people over & ordered 4 pizza pies"
// })

// const shoppingSpree = new Transaction ({
//     type: "Expense",
//     category: "Shopping",
//     amount: 250,
//     date: 2019-07-20,
//     comment: "Sonya went shopping in Azrieli."
// })

// const rentPayment = new Transaction ({
//     type: "Expense",
//     category: "Rent",
//     amount: 5000,
//     date: 2019-07-10,
//     comment: "Rent for July 2019"
// })

// rentPayment.save()
// shoppingSpree.save()
// pizzaParty.save()
// sonyaAndNadav.save()

// sonyaAndNadav.transactions.push(rentPayment)
// sonyaAndNadav.transactions.push(shoppingSpree)
// sonyaAndNadav.transactions.push(pizzaParty)

mongoose.connect('mongodb://localhost/LoveCounts', {useNewUrlParser: true })
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', api)

app.listen(3000, function(){
console.log('Server up and running on port 3000')
})

// UserCouple.findByIdAndUpdate("5d36d21003c5c00ab806bc3a", {transactions:"5d36dede2c9e4a0efc4f31} )
// {$push: {"transactions": [pizzaParty, shoppingSpree, rentPayment]}})