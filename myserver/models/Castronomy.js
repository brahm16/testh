const mongoose = require('mongoose');

const castronomySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameCastronomy: String,
    descriptionCastronomy: String,
    image: String,
    prixCastronomy: Number,
});

module.exports = mongoose.model('Castronomy', castronomySchema);