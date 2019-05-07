const Joi = require('joi');
const mongoose = require('mongoose');

const Project = mongoose.model('Project', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    category: {
        type: String,
        enum: ['JavaScript', 'Java', 'HTML', 'CSS', 'REACT'],
        required: true,
    },
    places: {
        type: mongoose.ObjectId, 
        ref: 'Place',
    },
    createDate: {
        type: Date, 
        default: Date.now,
    }
}));

function validateProject(project) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(3).max(255).required(),
        category: Joi.string().valid(['JavaScript', 'Java', 'HTML', 'CSS', 'REACT']).required(),
    });
    return Joi.validate(project,schema)
}

exports.Project = Project;
exports.validateProject = validateProject;
