const express = require("express");
const router = express.Router();
const Note = require('./../models/notes');

router.post("/lists",async function(req,res){  //request and response
   var notes = await Note.find({userid : req.body.userid});
   res.json(notes);  
});

router.post("/add",async function(req,res){
      
    await Note.deleteOne({id : req.body.id}); // to update 
    const newNote = new Note({
    id : req.body.id,
    userid : req.body.userid,
    title : req.body.title,
    content : req.body.content
    });
    newNote.save();
    const resp = {message : "new note created" + `with id ${req.body.id}`}
    res.json(resp);

});

router.post("/delete",async function(req,res){
    await Note.deleteOne({id : req.body.id});
    const resp = {message : "note deleted" + `with id ${req.body.id}`}
    res.json(resp);
});

module.exports = router;