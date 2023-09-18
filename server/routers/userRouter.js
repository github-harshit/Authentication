const express = require('express');
const router = express.Router(); 
const passport = require('passport');
 const passportJwt = require("../services/passportJWT"); 
 const requireAuth = passport.authenticate('jwt', {session:false}); 
 const requireLogin = passport.authenticate('local', {session:false})

 const {signUp, login} = require("../controllers/userController"); 

 
router.post("/signup",     signUp); 
 router.post("/login", requireLogin,  login); 
 router.get("/", requireAuth, (req, res)=>{
     res.send("Hi there "); 

 })
module.exports = router; 
