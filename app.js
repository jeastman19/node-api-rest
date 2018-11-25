'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes/index')


// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/', (req, res) => {
    res.render('product')
})
app.use('/api', api)
app.get('/login', (req, res) => {
    res.render('login')
})

module.exports = app
