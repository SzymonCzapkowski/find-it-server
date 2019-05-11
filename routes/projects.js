const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {
    Project,
    validateProject
} = require('../models/project');

///////Create Project///////
router.post('/', async (req, res) => {
    const {
        error
    } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        places: new mongoose.Types.ObjectId,
    });
    const result = await newProject.save();
    res.send(result)
})

///////Get Projects///////
router.get('/', async (req,res) => {
    if(req.body['_id']) {
        const project = await Project.find({_id:req.body['_id']})
        res.send(project)
    } else if (req.body['category']) {
        const project = await Project.find({category:req.body['category']})
        res.send(project)
    } else if (req.body['places']) {
        const project = await Project.find({places:req.body['places']})
        res.send(project)
    } else {
        const project = await Project.find({})
        res.send(project)
    }
})

///////Edit Projects///////
router.put('/:_id', async (req,res) => {
    const value = await Project.find({_id:req.params['_id']})

    const {error} = (function (project) {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(255),
            description: Joi.string().min(3).max(255),
            category: Joi.string().valid(['JavaScript', 'Java', 'HTML', 'CSS', 'REACT']),
        });
        return Joi.validate(project,schema)
    }(req.body))
     if (error) return res.status(400).send(error.details[0].message);

    const project = await Project.findByIdAndUpdate(req.params['_id'], {
    name: req.body.name ? value[0].name = req.body.name : value[0].name,
    description: req.body.description ? value[0].description = req.body.description : value[0].description,
    category: req.body.category ? value[0].category = req.body.category : value[0].category
    }, {
        new:true
    })
    res.send(project)
})

///////Delete Projects///////
router.delete('/:_id', async (req,res) => {
    const project = await Project.findByIdAndDelete(req.params['_id'])
    res.send(project)
})

module.exports = router;