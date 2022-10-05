// Load Depedencies
const path = require('path')
const express = require('express')
const handlebar = require('express-handlebars')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
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

// Body parser
app.use([
  express.urlencoded({extended:false}),
  express.json()
])

// Method Override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// Logging
if(process.env.NODE_ENV === 'development'){
    // Use morgan as logging middleware
    app.use(morgan('dev'))//    outputing GET / 200 76.852 ms - 293
                          //    GET /dashboard 200 9.795 ms - 883
}

//View helpers
const {
formatDate,
limit,
stripTags,
editIcon,
compare
} = require('./helpers/help')

// View
app.engine('.hbs', handlebar.engine({
  helpers:{
    formatDate,
    limit,
    stripTags,
    editIcon,
    compare
  },// Import function that will be used in handle bars
  defaultLayout:'main' ,
  extname: '.hbs'
}));
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

// Set global variable to be used in handlebars
app.use(function(req,res,next){
  res.locals.user = req.user
  next()
})

//Set Static folder
app.use(express.static(path.join(__dirname,'public')))

// Router
app.use('/',[
  require('./router/index'),
  require('./router/auth'),
  require('./router/journal')
])

const PORT = process.env.PORT || 3000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))