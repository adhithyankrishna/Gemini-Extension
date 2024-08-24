const express = require("express");
const auth = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

// Load environment variables
require('dotenv').config();


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;


passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:5000/genchat/auth/login"
},

    (acesstoken,refreshToken,profile,done)=>{
        //console.log(acesstoken);
        //console.log(profile);
        
        return(done(null,profile));

    }
))

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

auth.get("/login",passport.authenticate(
    
    'google',{
        scope:["profile","email"]
    },
    { failureRedirect: '/login' }

),(req,res)=>{
    console.log("Sucess");
})

auth.get("/auth/login",
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req,res)=>{
        console.log(req.user.displayName);
        const email = req.user.emails[0];
        console.log(email.value);
        const successUrl = `chrome-extension://inmcjboalkioahnnadekcfdbbnppefga/popup/popup.html?status=success&email=${encodeURIComponent(email)}`;
        res.redirect(successUrl);

})


auth.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to clear session.');
        }
        res.clearCookie('connect.sid'); 
        console.log("sucess");
        res.send('Session cleared successfully.');
    });
});



module.exports = auth;