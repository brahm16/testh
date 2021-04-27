const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namePlace: String,
    descriptionPlace: String,
    lanPlace: { type: Float },
    longPlace: { type: Float },
    image: String
  
});

module.exports = mongoose.model('Place', placeSchema);