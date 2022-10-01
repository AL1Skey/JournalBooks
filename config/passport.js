const GoogleOauth = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('./../models/User')
const procEnv = process.env

module.exports = function(passport){
    passport.use(new GoogleOauth({
        clientID: procEnv.GOOGLE_CLIENT_ID,
        clientSecret: procEnv.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile,callback)=>{
        // console.log(profile)
        const newUser = {
          googleId:profile.id,
          displayName:profile.displayName,
          firstName:profile.name.givenName,
          lastName:profile.name.familyName,
          image:profile.photos[0].value,
          status:true
        }

        try {
            let user = await User.findOne({googleId:profile.id})
            if(user){
             callback(null,user)
            }else{
              user = await User.create(newUser)
             callback(null,user)
            }
        } catch (error) {
          console.log(error)
        }
        
      }
    ));

    // To make the user not logged out when the page refresh

    //Serialize User
    passport.serializeUser((user,callback) =>{
      process.nextTick(() =>{
        return callback(null, {
          id: user.id,
          username: user.username,
          picture: user.picture
        });
      });
    });

    // Deserialize User
    passport.deserializeUser((user,callback) =>{
      process.nextTick(() =>{
        return callback(null, user);
      });
    });
}