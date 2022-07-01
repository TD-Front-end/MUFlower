'use strict'
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const bodyParser = require('body-parser')
require('dotenv').load()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const port = process.env.PORT || 5000
let routes = require('./api/routes.js')
routes(app)

app.use(function(req,res){
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)
console.log("dang chay tren port: " + port)
