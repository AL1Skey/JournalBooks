const express = require('express');
const router = express.Router()
const {ensureAuth,ensureGuest} = require('./../middleware/auth')
// @desc    /login
// @route   GET
router.get('/',
    ensureGuest,//Set the middleware
    (req,res)=>{
    res.render('login',{
        layout:'mainLogin',
    })  // use mainLogin as parent of login page
})

// @desc    /dashboard
// @route   GET
router.get('/dashboard',
    (req,res,next)=>{//Set if the user haven't login, they will redirect to login page,else go to next function 
        if(req.isAuthenticated()){
            return next()
        }
        else{
            res.redirect('/')
        }
    },
    (req,res)=>{//The next function
    res.render('dashboard')
})

module.exports = router