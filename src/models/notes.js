// steps : define schema 
// note : user id , notes id, title, content, date, etc 
// using schema create model 
const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    userid : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content :{
        type : String,
    }, 
    dateadded :{
        type : Date,
        default : Date.now,
    }
});

module.exports = mongoose.model("Note", noteSchema);