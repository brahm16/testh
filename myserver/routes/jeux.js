var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Jeux = require('../models/Jeux');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req , file , cb){
    cb(null , '../black-dashboard-react/public/uploads');

  },
  filename : function(req , file , cb){
    cb(null , file.originalname);
  }
});

var fileFilter = (req , file , cb)=>{
  if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
  {
    cb(null, true);
  }else{
    cb(new Error('invalid type of image'), false);
  }
}
var upload = multer(
  {storage : storage},
  {fileFilter: fileFilter}
  );

  router.get('/', function(req, res, next) {
    Jeux.find(function(err,data){
      res.json(data);
    });
    
  });

  router.post('/', upload.single('image'),(req, res , next) =>{
    console.log(req.file);
      var jeux = new Jeux({
        _id: new mongoose.Types.ObjectId(),
        nameJeux: req.body.nameJeux ,
        descriptionJeux: req.body.descriptionJeux ,
        prixJeux: req.body.prixJeux ,
        image : req.file.filename,
      });
      jeux.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdJeux: jeux
      });
  });

  router.patch("/:jeuxId",upload.single('image'), (req , res , next)=>{
    var id = req.params.jeuxId;
    console.log(req.body);
    console.log(req.file.filename);
    Jeux.findByIdAndUpdate(id , {
        nameJeux: req.body.nameJeux ,
        descriptionJeux: req.body.descriptionJeux ,
        prixJeux: req.body.prixJeux ,
        image : req.file.filename,
       }).then(result => {
      console.log(result);
      res.status(200).json({
        message : "update image work",
        result
      });
    }).catch(err => console.log(err));
  });
  
  router.get("/:jeuxId", (req , res , next) =>{
    var id = req.params.jeuxId;
    Jeux.findById(id , function(err, data){
      res.status(200).json({
        message: ' methode get by id work',
        data
    }); 
    });
  });
  
  router.delete("/:jeuxId", (req , res , next)=>{
    var id = req.params.jeuxId;
  
    Jeux.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "delete image work"
    });
  });
  
  
  module.exports = router;
  
