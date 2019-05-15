const Joi = require('joi');
const mongoose = require('mongoose');

const Place = mongoose.model('Place', new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    Project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    requiredSkills: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false,
    },
}));

function validatePlace(place) {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        requiredSkills: Joi.string().required(),
        status: Joi.boolean().default(false),
    })
    return Joi.validate(place, schema)
};

exports.Place = Place;
exports.validatePlace = validatePlace;