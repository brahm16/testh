var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Place = require('../models/place');
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
    Place.find(function(err,data){
      res.json(data);
    });
    
  });

  router.post('/', upload.single('image'),(req, res , next) =>{
    console.log(req.file);
    var place = new Place({
      _id: new mongoose.Types.ObjectId(),
      namePlace: req.body.namePlace ,
      descriptionPlace: req.body.descriptionPlace ,
      lanPlace: req.body.lanPlace ,
      longPlace: req.body.longPlace,
      image:req.file.filename,
    });
    place.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdProduct: place
      });
  });

  router.get("/:placeId", (req , res , next) =>{
    var id = req.params.placeId;
    Place.findById(id , function(err, data){
      res.status(200).json({
        message: ' Place methode get by id work',
        data
    }); 
    });
  });

  router.delete("/:placeId", (req , res , next)=>{
    var id = req.params.placeId;
  
    Place.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "Place delete image work"
    });
  });
  
  router.patch("/:placeId",upload.single('image'), (req , res , next)=>{
    var id = req.params.placeId;
    //console.log(req.body);
    //console.log(req.file.filename);
    Place.findByIdAndUpdate(id , {
        namePlace: req.body.namePlace ,
        descriptionPlace: req.body.descriptionPlace ,
        lanPlace: req.body.lanPlace ,
        longPlace: req.body.longPlace,
        image:req.file.filename,
       }).then(result => {
      console.log(result);
      res.status(200).json({
        message : "update image work",
        result
      });
    }).catch(err => console.log(err));
  });
  
  module.exports = router;
