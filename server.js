const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const path = require('path')
const UserCouple = require('./server/models/UserCouple')
const Transaction = require('./server/models/Transaction')

// const sonyaAndNadav = new UserCouple ({
//     coupleNames: ["Sonya", "Nadav"],
//     coupleEmails: ["sonya.burlan@gmail.com", "nadav.ghez@gmail.com"],
//     _password: "lovecounts",
//     transactions: [],
//     goals: ["travel"]
// })

// sonyaAndNadav.save()


mongoose.connect('mongodb://localhost/LoveCounts', {useNewUrlParser: true })
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', api)


app.listen(3000, function(){
console.log('Server up and running on port 3000')
})