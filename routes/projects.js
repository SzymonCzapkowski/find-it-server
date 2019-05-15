const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const auth = require("../middleware/auth");

const {
    Project,
    validateProject
} = require('../models/Project');

///////Create Project///////
router.post('/', auth, async (req, res) => {
    const {
        error
    } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        places: req.body.places
    });
    const result = await newProject.save();
    res.send(result)
})

///////Get Projects///////
router.get('/', async (req,res) => {
    if(req.query['_id']) {
        const project = await Project.find({_id:req.query['_id']})
            .populate('places').populate('author', 'username')
        res.send(project)
    } else if (req.query['category']) {
        const project = await Project.find({category:req.query['category']})
            .populate('places').populate('author', 'username')
        res.send(project)
    } else {
        const project = await Project.find({})
            .populate('places').populate('author', 'username')
        res.send(project)
    }
})

///////Edit Projects///////
router.put('/:_id', auth, async (req,res) => {
    const value = await Project.find({_id:req.params['_id']})

    const {error} = (function (project) {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(255),
            description: Joi.string().min(3).max(255),
            category: Joi.string().valid(['frontend', 'java', 'nodeJS', 'python', '.NET']),
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
router.delete('/', auth, async (req,res) => {
    const project = await Project.findByIdAndDelete(req.query._id)
    res.send(project)
})

module.exports = router;