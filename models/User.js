const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({

}));

function validateUser(user) {

}

exports.User = User;
exports.validateUser = validateUser;