var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Product = require('../models/product');

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
    Product.find(function(err,data){
      res.json(data);
    });
    
  });

  router.post('/', upload.single('image'),(req, res , next) =>{
    console.log(req.file);
      var product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name ,
        price: req.body.price ,
        desc: req.body.desc ,
        image : req.file.filename
      });
      product.save().then(result =>{
        console.log(result);
      }).catch(err => console.log(err));
  
      res.status(201).json({
        message : "post image work",
        createdProduct: product
      });
  });

  router.patch("/:productId",upload.single('image'), (req , res , next)=>{
    var id = req.params.productId;
    console.log(req.body);
    console.log(req.file.filename);
    Product.findByIdAndUpdate(id , {
        name : req.body.name,
        price: req.body.price,
        desc : req.body.desc,
        image : req.file.filename
       }).then(result => {
      console.log(result);
      res.status(200).json({
        message : "update image work",
        result
      });
    }).catch(err => console.log(err));
  });
  
  router.get("/:productId", (req , res , next) =>{
    var id = req.params.productId;
    Product.findById(id , function(err, data){
      res.status(200).json({
        message: ' methode get by id work',
        data
    }); 
    });
  });
  
  router.delete("/:productId", (req , res , next)=>{
    var id = req.params.productId;
  
    Product.remove({_id : id}).then(result =>{
      console.log("delete ok ...");
    }).catch(err => console.log(err));
  
    res.status(200).json({
      message : "delete image work"
    });
  });
  
  
  module.exports = router;
  
