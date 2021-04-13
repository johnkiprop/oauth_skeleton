const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    //user.id is the user id not profile id because we can assume everyone has a MongoID created 
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id)
    .then(user =>{
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, 
(accessToken, refreshToken, profile, done) =>{
    User.findOne({ googleId: profile.id })
    .then((existingUser) => {
        if(existingUser){
            //we have a record of the current user
            done(null, existingUser);

        }else{
            //no user record with ID exists 
            new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }

    });

    
}));