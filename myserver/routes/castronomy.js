var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Castronomy = require('../models/Castronomy');
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
    Castronomy.find(function(err,data){
      res.json(data);
    });
    
  });

  router.post('/', upload.single('image'),(req, res , next) =>{
    console.log(req.file);
    var castronomy = new Castronomy({
      _id: new mongoose.Types.ObjectId(),
      nameCastronomy: req.body.nameCastronomy ,
      descriptionCastronomy: req.body.descriptionCastronomy ,
      prixCastronomy: req.body.prixCastronomy ,
      image:req.file.filename,
    });
    castronomy.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdProduct: castronomy
      });
  });

  router.get("/:castronomyId", (req , res , next) =>{
    var id = req.params.castronomyId;
    Castronomy.findById(id , function(err, data){
      res.status(200).json({
        message: ' Castronomy methode get by id work',
        data
    }); 
    });
  });

  router.delete("/:castronomyId", (req , res , next)=>{
    var id = req.params.castronomyId;
  
    Castronomy.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "Castronomy delete image work"
    });
  });
  
  router.patch("/:castronomyId",upload.single('image'), (req , res , next)=>{
    var id = req.params.castronomyId;
    console.log(req.body);
    console.log(req.file.filename);
    Castronomy.findByIdAndUpdate(id , {
      nameCastronomy : req.body.nameCastronomy,
      descriptionCastronomy: req.body.descriptionCastronomy,
        image : req.file.filename
       }).then(result => {
      console.log(result);
      res.status(200).json({
        message : "update image work",
        result
      });
    }).catch(err => console.log(err));
  });
  
  module.exports = router;
