const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const path = require('path')
const UserCouple = require('./server/models/UserCouple')
const Transaction = require('./server/models/Transaction')

// ------------------------DUMMY DATA------------------------
const sonyaAndNadav = new UserCouple ({
    coupleNames: ["Sonya", "Nadav"],
    coupleEmails: ["sonya.burlan@gmail.com", "nadav.ghez@gmail.com"],
    _password: "lovecounts",
    transactions: [],
    goals: [""]
})

const t1 = new Transaction ({
    type: "Expense",
    category: "Food",
    amount: 450,
    date: "2019-07-28",
    comment: "Had people over & ordered 4 pizza pies"
})

const t2 = new Transaction ({
    type: "Expense",
    category: "Fun",
    amount: 250,
    date: "2019-07-25",
    comment: "Went to iJump."
})

const t3 = new Transaction ({
    type: "Expense",
    category: "Rent",
    amount: 1400,
    date: "2019-07-22",
    comment: "Rent for July 2019"
})

const t4 = new Transaction ({
    type: "Expense",
    category: "Shopping",
    amount: 800,
    date: "2019-07-20",
    comment: "Shopping spree in Azrieli to celebrate finishing this project."
})

const t5 = new Transaction ({
    type: "Expense",
    category: "Entertainment",
    amount: 500,
    date: "2019-07-14",
    comment: "Fun stuff"
})

const t6 = new Transaction ({
    type: "Expense",
    category: "Transportation",
    amount: 200,
    date: "2019-07-12",
    comment: "Bus card for July 2019"
})

const t7 = new Transaction ({
    type: "Expense",
    category: "Medical",
    amount: 150,
    date: "2019-07-10",
    comment: "Doctor visit"
})

const t8 = new Transaction ({
    type: "Expense",
    category: "Utilities",
    amount: 250,
    date: "2019-07-05",
    comment: "Electricity Bill for July 2019"
})

const t9 = new Transaction ({
    type: "Expense",
    category: "Other",
    amount: 300,
    date: "2019-07-04",
    comment: "Donated money to charity."
})

const t10 = new Transaction ({
    type: "Income",
    category: "Salary",
    amount: 7000,
    date: "2019-07-02",
    comment: "Salary for July 2019."
})
// 

const t11 = new Transaction ({
    type: "Expense",
    category: "Food",
    amount: 750,
    date: "2019-06-28",
    comment: "Had people over & ordered sushi"
})

const t12 = new Transaction ({
    type: "Expense",
    category: "Fun",
    amount: 100,
    date: "2019-06-25",
    comment: "Went to the beach."
})

const t13 = new Transaction ({
    type: "Expense",
    category: "Rent",
    amount: 1400,
    date: "2019-06-22",
    comment: "Rent for June 2019"
})

const t14 = new Transaction ({
    type: "Expense",
    category: "Shopping",
    amount: 500,
    date: "2019-06-20",
    comment: "Shirts at Dizengoff Center."
})

const t15 = new Transaction ({
    type: "Expense",
    category: "Entertainment",
    amount: 800,
    date: "2019-06-14",
    comment: "Fun stuff"
})

const t16 = new Transaction ({
    type: "Expense",
    category: "Transportation",
    amount: 150,
    date: "2019-06-12",
    comment: "Bus card for June 2019"
})

const t17 = new Transaction ({
    type: "Expense",
    category: "Medical",
    amount: 250,
    date: "2019-06-10",
    comment: "Medication"
})

const t18 = new Transaction ({
    type: "Expense",
    category: "Utilities",
    amount: 300,
    date: "2019-06-05",
    comment: "Electricity Bill for June 2019"
})

const t19 = new Transaction ({
    type: "Expense",
    category: "Other",
    amount: 100,
    date: "2019-06-04",
    comment: "Donated money to charity."
})

const t20 = new Transaction ({
    type: "Income",
    category: "Salary",
    amount: 8000,
    date: "2019-06-02",
    comment: "Salary for June 2019."
})

t1.save()
t2.save()
t3.save()
t4.save()
t5.save()
t6.save()
t7.save()
t8.save()
t9.save()
t10.save()
t11.save()
t12.save()
t13.save()
t14.save()
t15.save()
t16.save()
t17.save()
t18.save()
t19.save()
t20.save()

sonyaAndNadav.save()

sonyaAndNadav.transactions.push(t20)
sonyaAndNadav.transactions.push(t19)
sonyaAndNadav.transactions.push(t18)
sonyaAndNadav.transactions.push(t17)
sonyaAndNadav.transactions.push(t16)
sonyaAndNadav.transactions.push(t15)
sonyaAndNadav.transactions.push(t14)
sonyaAndNadav.transactions.push(t13)
sonyaAndNadav.transactions.push(t12)
sonyaAndNadav.transactions.push(t11)

sonyaAndNadav.transactions.push(t10)
sonyaAndNadav.transactions.push(t9)
sonyaAndNadav.transactions.push(t8)
sonyaAndNadav.transactions.push(t7)
sonyaAndNadav.transactions.push(t6)
sonyaAndNadav.transactions.push(t5)
sonyaAndNadav.transactions.push(t4)
sonyaAndNadav.transactions.push(t3)
sonyaAndNadav.transactions.push(t2)
sonyaAndNadav.transactions.push(t1)


mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/LoveCounts', {useNewUrlParser: true })
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', api)

app.listen(process.env.PORT || 3000, function(){
console.log('Server up and running on port 3000')
})

// UserCouple.findByIdAndUpdate("5d36d21003c5c00ab806bc3a", {transactions:"5d36dede2c9e4a0efc4f31} )
// {$push: {"transactions": [pizzaParty, shoppingSpree, rentPayment]}})