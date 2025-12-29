// initialize express 
const express = require('express');
// initialize app
const app = express();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : false}));
// extended false means nested objects are not correct;
app.use(bodyParser.json());

const Note = require('./models/notes');
const User = require('./models/login');

require("dotenv").config();
const mongodbpath = process.env.MONGODB_URI;
mongoose.connect(mongodbpath).then(function()
{
   app.get("/",function(req,res){
      const resp = {message : "API Works!"};
      res.json(resp);
   });

   const noteRouter = require('./routes/notes');
   app.use("/notes",noteRouter);

   const authRouter = require("./routes/auth");
   app.use("/auth", authRouter);
   
}
);



// starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log("local host 5000 has started " + PORT);
});