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
const db = require('../backend/api/db');

app.use(function(req,res){
    res.status(404).send({url: req.originalUrl + ' not found'})
})

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    db.connect(function (err) {
        if (err) throw err;
        console.log("Connected...")
    });
    console.log(`Server listening on port ${server.address().port}`);
});
