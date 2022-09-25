const express = require('express')
const handlebar = require('express-handlebars')
const dotenv = require('dotenv')

// Load config 
dotenv.config({path:'./config/config.env'})

const app = express()

app.listen()