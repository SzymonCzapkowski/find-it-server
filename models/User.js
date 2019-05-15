const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    skills: [{
        type: String
    }],
    gitHub: {
        type: String
    },
    linkedin: {
        type: String
    },
    www: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    }

});


UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
    }, config.get('myPrivateKey')); //get the private key from the config file -> environment variable
    return token;
};

const User = mongoose.model('User', UserSchema);


function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        username: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);

}

exports.User = User;
exports.validateUser = validateUser;