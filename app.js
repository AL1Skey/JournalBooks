// Load Depedencies
const path = require('path')
const express = require('express')
const handlebar = require('express-handlebars')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// load Database
const connectDB = require('./config/db')

// Load config 
dotenv.config({path:'./config/config.env'})

// Passport config
// Load passport module as argument to passport config
require('./config/passport')(passport)

// Connect To MongoDB
connectDB()

// Initialize express
const app = express()

// Logging
if(process.env.NODE_ENV === 'development'){
    // Use morgan as logging middleware
    app.use(morgan('dev'))//    outputing GET / 200 76.852 ms - 293
                          //    GET /dashboard 200 9.795 ms - 883
}

// View
app.engine('.hbs', handlebar.engine({defaultLayout:'main' ,extname: '.hbs'}));
app.set('view engine', '.hbs');

// Set Session
// const mongoDBStore = new MongoDBStore({
//   uri:process.env.MONGO_URI,
//   collection:'mySessions',

// })

app.use(session({
    secret: 'keyboard cat',
    resave: false,// 
    saveUninitialized: false,// Dont create session until something is stored
    store: MongoStore.create({
      mongoUrl : process.env.MONGO_URI,
    }),
    // cookie: { secure: true },
    
  }))

// Set Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Set Static folder
app.use(express.static(path.join(__dirname,'public')))

// Router
app.use('/',require('./router/index'))
app.use('/',require('./router/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))