const mongoose = require('mongoose');

const maisonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameMaison: String,
    descriptionMaison: String,
    pricesMaison: Number,
    image: String,
    phoneMaison: Number,
    adressMaison: String,
});

module.exports = mongoose.model('Maison', maisonSchema);