module.exports = {
    // Ensure the user is Authenticated
    ensureAuth:function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        else{
            res.redirect('/')
        }
    },
    // Ensure the guest user is Authenticated
    ensureGuest:function(req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }
        else{
            return next()
        }
    }
}