const mongoose = require('mongoose');
const Place=require("../models/place")

const circuitSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    places:[]
});

module.exports = mongoose.model('Circuit', circuitSchema);