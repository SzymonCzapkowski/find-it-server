const Joi = require('joi');
const mongoose = require('mongoose');

const Place = mongoose.model('Place', new mongoose.Schema({

}));

function validatePlace(place) {

}

exports.Place = Place;
exports.validatePlace = validatePlace;