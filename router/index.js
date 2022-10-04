const express = require('express');
const router = express.Router();
const {ensureAuth,ensureGuest} = require('./../middleware/auth');
const Journal = require('../models/Journal');
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
    // (req,res,next)=>{//Set if the user haven't login, they will redirect to login page,else go to next function 
    //     if(req.isAuthenticated()){
    //         return next()
    //     }
    //     else{
    //         res.redirect('/')
    //     }
    // },
    ensureAuth,
    async (req,res)=>{//The next function
    try {
        const journalModel = await Journal.find({user:req.user.id}).lean()// find collection of journal based of user id and convert it to javascript object

        console.log(req.ip)
        res.render('dashboard',{
            name:req.user.firstName,
            journal:journalModel,
        })
    } catch (error) {
        
    }
        
})

module.exports = router