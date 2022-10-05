const express = require('express')
const { ensureAuth } = require('../middleware/auth')
const router = express.Router()
const Journal = require('../models/Journal')
// Initialize router to add page
router.get('/journal/add',ensureAuth,(req,res)=>{
    res.render('journal/add')
})

// Post the request to Journal
router.post('/journal',ensureAuth, async(req,res)=>{
    try {
        // With body parser, you can get the value and name of value via name attribute that added in input tag
        // req.body will return object that created based of input with name attribute and it's value

        req.body.user = req.user.id // include User model to body.user because user is part of Journal Schema and because the body only fetch input with name attributes

        await Journal.create(req.body)// Wait until Journal created
        res.redirect('/dashboard')// Redirect to dashboard page
    } catch (error) {
        console.log(error)
    }
    
})

//@desc Show Other Journal
//@route GET /journal
router.get('/journal', ensureAuth, async (req,res)=>{
    try {
        const journals = await Journal.find({status:'public'})
            .populate('user')// generate user Model according to objectID stored in each journal data
            .sort({createdAt:'desc'})// Sort by date in descending order
            .lean()

        res.render('journal',{journals})
    } catch (error) {
        console.log(error)
    }
})

//@desc Edit Journal
//@route GET /journal/edit:id
router.get('/journal/edit/:id',ensureAuth, async(req,res)=>{
    try {
        const params = req.params.id
        const journal = await Journal.findOne({_id:params}).lean()
        
        //IF journal not found return Not Found
        if(!journal){
            res.send('Not Found')
        }
        // If the founded journal is have different user then redirect to journal index
        if(req.user.id != journal.user){
            res.redirect('/journal')
        }
        // Else render edit page with journal attached
        else{
            res.render('journal/edit',{journal})
        }

        

    } catch (error) {
        console.log(error)
    }
})

//@desc Post Edited Journal
//@route PUT /journal/:id
router.put('/journal/:id',ensureAuth, async(req,res)=>{
    try {
        // With body parser, you can get the value and name of value via name attribute that added in input tag
        // req.body will return object that created based of input with name attribute and it's value
        // If the founded journal is have different user then redirect to journal index
        
        let journal = await Journal.findById(req.params.id).lean()

        // If journal not found, return Not found
        if(!journal){
            res.send("Not Found")
        }

        // Check if the journal is owned by current user
        if(req.user.id != journal.user){
            res.redirect('/journal')
        }
        // Else render edit page with journal attached
        else{
            journal = await Journal.findOneAndUpdate({_id:req.params.id}, req.body,{
                new:true,//Create new object if some req.body object are not in the database
                runValidator:true,//Validate if the fields are valid
            })// Find one data based of id and update it with req.body method
            res.redirect('/dashboard')
        }
    } catch (error) {
        res.send(error)
    }
    
})

//@desc Delete your Journal
//@route DELETE /journal/:id
router.delete('/journal/:id',ensureAuth, async(req,res)=>{
   try {
        await Journal.remove({_id:req.params.id})
        res.redirect('/dashboard')
   } catch (error) {
        return res.send(error)
   }
   
   
   
   
    // try {
    //     // With body parser, you can get the value and name of value via name attribute that added in input tag
    //     // req.body will return object that created based of input with name attribute and it's value
    //     // If the founded journal is have different user then redirect to journal index
        
    //     let journal = await Journal.findById(req.params.id).lean()

    //     // If journal not found, return Not found
    //     if(!journal){
    //         res.send("Not Found")
    //     }

    //     // Check if the journal is owned by current user
    //     if(req.user.id != journal.user){
    //         res.redirect('/journal')
    //     }
    //     // Else render edit page with journal attached
    //     else{
    //         journal = await Journal.findOneAndDelete({_id:req.params.id},(err,docs)=>{
    //             if(err){
    //                 res.send(err)
    //             }
    //             else{
    //                 console.log("Deleted Journal ",docs.title)
    //             }
    //         })// Find one data based of id and update it with req.body method
    //         console.log('redirect to dashboard')
    //         res.redirect('/dashboard')
    //     }
    // } catch (error) {
    //     res.send(error)
    // }
    
})

//@desc Show Single Journal
//@route GET /journal/:_id
router.get('/journal/:id',ensureAuth, async(req,res)=>{
    const journal = await Journal.findById(req.params.id).lean()
    console.log(journal)
    res.render('journal/view',{journal})
})

module.exports = router