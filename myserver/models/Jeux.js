const mongoose = require('mongoose');

const jeuxSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameJeux: String,
    descriptionJeux: String,
    prixJeux: Number,
    image: String,
});

module.exports = mongoose.model('Jeux', jeuxSchema);