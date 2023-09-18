const passport = require("passport"); 
const User = require("../models/userModel"); 
const config = require("../config"); 
const JwtStrategy = require("passport-jwt").Strategy; 
const ExtractJwt = require("passport-jwt").ExtractJwt; 
 const LocalStrategy = require('passport-local'); 
 const bcrypt = require("bcrypt"); 
// creating options for Jwt strategy
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'), 
    secretOrKey : config.secret
    
}; 

// creating jwt strategy

const jwtLogin  = new JwtStrategy(jwtOptions, async function(payload, done) {
     
    try {
        const user = await User.findById(payload.sub);
    
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
});

const localOptions  = {usernameField : "email"}
const localLogin = new LocalStrategy(localOptions, async function(email, password, done){
     // veriy email and password 
     try{
        const user = await User.findOne({email : email}); 
        if(user===null){
             return done(null, false); 
        }
        const match = await bcrypt.compare(password, user.password);
        if(match){
             return done(null, user); 
             
        }else{
             return done(null, false); 

        }
         
     }catch(err){
         done(err); 
     }

    
})

passport.use(jwtLogin); 
passport.use(localLogin)
