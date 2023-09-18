const express = require('express');
const url = "mongodb+srv://harshitjoshi250:Harshit3396@cluster0.su0dgrh.mongodb.net/?retryWrites=true&w=majority"
 const morgan = require("morgan"); 
 const mongoose = require("mongoose"); 

  const userRouter = require("./routers/userRouter")
 const app = express();
 const port = process.env.PORT || 5000; 
 app.use(morgan('combined')); 
 app.use(express.json());  
 app.use("/api/user", userRouter); 
app.listen(port, ()=>{
     console.log("server is listening on", port)
}); 
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully'));

