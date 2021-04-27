var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Maison = require('../models/maison');
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
    Maison.find(function(err,data){
      res.json(data);
    });
    
  });

  router.post('/', upload.single('image'),(req, res , next) =>{
   // console.log(req.file);
    var maison = new Maison({
      _id: new mongoose.Types.ObjectId(),
      nameMaison: req.body.nameMaison ,
      descriptionMaison: req.body.descriptionMaison ,
      pricesMaison: req.body.pricesMaison ,
      phoneMaison: req.body.phoneMaison,
      adressMaison: req.body.adressMaison,
      image:req.file.filename,
    });
    maison.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdProduct: maison
      });
  });

  router.get("/:maisonId", (req , res , next) =>{
    var id = req.params.maisonId;
    Maison.findById(id , function(err, data){
      res.status(200).json({
        message: ' Maison methode get by id work',
        data
    }); 
    });
  });

  router.delete("/:maisonId", (req , res , next)=>{
    var id = req.params.maisonId;
  
    Maison.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "Maison delete image work"
    });
  });
  
  router.patch("/:maisonId",upload.single('image'), (req , res , next)=>{
    var id = req.params.maisonId;
   // console.log(req.body);
   // console.log(req.file.filename);
    Maison.findByIdAndUpdate(id , {
      nameMaison: req.body.nameMaison ,
      descriptionMaison: req.body.descriptionMaison ,
      pricesMaison: req.body.pricesMaison ,
      phoneMaison: req.body.phoneMaison,
      adressMaison: req.body.adressMaison,
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
