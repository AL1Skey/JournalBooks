const moment = require("moment/moment")

 module.exports = {
    formatDate:function(date,format){
        return moment(date).format(format)
    },
    limit:function(str,len){
        let newStr = ''
        if(str.length<len){
            console.log(str.length,len)
            return str     
        }
        newStr = str.substr(0,len)
        
        return newStr + '...'
    },
    stripTags:function(str){
        return str.replace(/<[^>]*>/gm,'')
    },
    // return edit function if the content belongs to user that logged in
    // Return string with html tag that link you to edit page with exact content
    editIcon:function(userId,targetId,journalId,floating=true){
        
        // console.log(userId._id.toString() === targetId._id.toString())
        if(userId._id.toString() === targetId._id.toString()){
            if(floating){    
            return `<a href="/journal/edit/${journalId}" class="btn-floating halfway-fab blue">
            <i class="fas fa-edit fa-small"></i>
            </a>`}
            else{
                return `<a href="/journal/edit/${journalId}">
            <i class="fas fa-edit fa-small"></i>
            </a>`
            }
        }
        else{
            return ''
        }
    },
    compare:function(firstValue,secondValue){
        return firstValue.toString()==secondValue.toString()
    },
    deleteIcon:function(userId,targetId,journalId,floating=true){
        
        // console.log(userId._id.toString() === targetId._id.toString())
        if(userId._id.toString() === targetId._id.toString()){
            if(floating){    
            return `<a href="/journal/edit/${journalId}" class="btn-floating halfway-fab red">
            <i class="fas fa-x fa-small"></i>
            </a>`}
            else{
                return `<a href="/journal/edit/${journalId}" class="red">
            <i class="fas fa-x fa-small"></i>
            </a>`
            }
        }
        else{
            return ''
        }
    },
 }