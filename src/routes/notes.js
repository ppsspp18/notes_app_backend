const express = require("express");
const router = express.Router();
const Note = require('./../models/notes');

   
   // app.get("/notes/lists",async function(req,res){
   // var notes = await Note.find();
   // res.json(notes);
   // });

router.post("/lists",async function(req,res){
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

//    const newNote = new Note({
//     id : "0002",
//     userid : "psp2",
//     title : "first note2",
//     content : "learning2 flutter"
//    });
//    newNote.save();

//    const response = {message: "New Note Created!"};
//    res.json(response);
});

router.post("/delete",async function(req,res){
    await Note.deleteOne({id : req.body.id});
    const resp = {message : "note deleted" + `with id ${req.body.id}`}
    res.json(resp);
});


// export router
module.exports = router;