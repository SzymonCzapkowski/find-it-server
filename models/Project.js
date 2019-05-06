const Joi = require('joi');
const mongoose = require('mongoose');

const Project = mongoose.model('Project', new mongoose.Schema({

}));

function validateProject(project) {

}

exports.Project = Project;
exports.validateProject = validateProject;

//