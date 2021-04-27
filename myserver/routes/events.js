var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Event = require('../models/event');

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

/* GET home page. */
router.get('/', function(req, res, next) {
    Event.find(function(err,data){
      res.json(data);
  });
  
});


router.post('/', upload.single('image'),(req, res , next) =>{
  console.log(req.file);
    var event = new Event({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name ,
      placesNembre: req.body.placesNembre ,
      startDate: req.body.startDate ,
      endDate: req.body.endDate ,
      desc: req.body.desc ,
      image : req.file.filename
    });
    event.save().then(result =>{
      console.log(result);
    }).catch(err => console.log(err));

    res.status(201).json({
      message : "post image work",
      createdEvent: event
    });
});

router.patch("/:eventId",upload.single('image'), (req , res , next)=>{
  var id = req.params.eventId;
  Event.findByIdAndUpdate(id ,{
    name : req.body.name,
    placesNembre: req.body.placesNembre,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
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

router.get("/:eventId", (req , res , next) =>{
  var id = req.params.eventId;
  Event.findById(id , function(err, data){
    res.status(200).json({
      message: ' methode get by id work',
      data
  }); 
  });
});

router.delete("/:eventId", (req , res , next)=>{
  var id = req.params.eventId;

  Event.remove({_id : id}).then(result =>{
    console.log("delete ok ...");
  }).catch(err => console.log(err));

  res.status(200).json({
    message : "delete image work"
  });
});


module.exports = router;
