// steps : define schema 
// login : email, userid, password, isVerified, otp, otpExpired 
// using schema create model 
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email :{          // userid will be email 
        type : String,
        require : true,
        unique : true,
    }, 
    userid : {
        type : String,
        require :true,
    },
    password : {
        type : String,
    }, 
    isVerified : {
        type : Boolean, 
        default : false,
    },
    otp : {
        type : String
    }, 
    otpExpires : {
        type : Date,
    } 
});

module.exports = mongoose.model("User", userSchema);