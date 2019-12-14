const express = require('express')
const app = express()
const path = require('path')


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.static(path.join(__dirname,'..','node_modules')))

const api = require('./routes/api')
app.use('/', api)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/whetherAppEx', { useNewUrlParser: true })

const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})