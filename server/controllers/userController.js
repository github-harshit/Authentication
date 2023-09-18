 const User =  require( "../models/userModel");
  const bcrypt = require("bcrypt"); 
 const jwt = require('jwt-simple'); 
 const config = require("../config")
 const tokenForUser = (user)=>{
     const timestamp = new Date().getTime(); 
     return jwt.encode({sub: user.id, 
                        iat:timestamp }, config.secret)
 }
 const  signUp = async (req, res, )=>{
     try{
        const {email, password} = req.body;
        // check if user exist 
        
        const existingUser =  await User.findOne({email:email});
        
        if(existingUser!==null){
             return res.json({
                 status:422, 
                 msg : "email is already in use "
             })
        }
        // create a user 
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const user = new User({
             email: email, 
             password: hash
        });
        const savedUser = await  user.save();

         const token = tokenForUser(savedUser); 
         res.json({
             status:200, 
             msg: 'Suceesfully created a user', 
             user: savedUser, 
             token:token
         })
         
     }catch(err){
         const errMsg = err.toString(); 
         res.json({
             status:500,
             msg: errMsg
         })
     }
   

   

    
}; 
 const login  = async(req, res)=>{
     try{
        
        // user has already been authenticated 
        // by passport local strategy 
       //  we just need to give them a token 
         const token  = tokenForUser(req.user); 
         res.json({
             status:200, 
             msg: "user i ssuceesfully logged in ", 
             token: token
         })
           
         
     }catch(err){
        const errMsg = err.toString(); 
        res.json({
            status:500,
            msg: errMsg
        })
    }
    
    

     
 }

module.exports = {signUp, 
                   login}