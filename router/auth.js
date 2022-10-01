const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const {Console} = require('console')

// Create authencation routes
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

// Create Google auth callback
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res)=>{
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

// Create logout router
router.get('/auth/logout', (req, res, next)=>{
  req.logout((err)=>{
    // Write some output on file
    // const writeLog = new Console({
    //   stdout:fs.createWriteStream(path.join(__dirname,'log','log.json')),
    //   stderr:fs.createWriteStream(path.join(__dirname,'log','err.json'))
    // })
    // writeLog.log("req:",req,"\nres:",res)
    
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router