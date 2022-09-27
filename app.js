const express = require('express')
const handlebar = require('express-handlebars')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')
// Load config 
dotenv.config({path:'./config/config.env'})
// Connect To MongoDB
connectDB()
// Initialize express
const app = express()
// Logging
if(process.env.NODE_ENV === 'development'){
    // Use morgan as logging middleware
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))