const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    placesNembre : Number,
    startDate : String,
    endDate : String,
    desc : String,
    image: { type : String , required : true}
});

module.exports = mongoose.model('Event', eventSchema);