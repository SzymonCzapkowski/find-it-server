const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const {
    Project,
    validateProject
} = require('../models/project');


router.post('/api/projects/', async (req, res) => {
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

module.exports = router;