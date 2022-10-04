const mongoose = require('mongoose')

const JournalScheme = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
    },
    status:{
        type:String,
        default:"public",
        enum:["private","public"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Journal',JournalScheme)