const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const auth = require('../middleware/auth');

const {
    Place,
    validatePlace
} = require('../models/Place');

//createPlace
router.post('/', async (req, res) => {
    const { error } = validatePlace(req.body);
    if (error) return res.status (400).send(error.details[0].message);

    const place = new Place({
        name: req.body.name,
        requiredSkills: req.body.requiredSkills
    })

    const result = await place.save();
    res.send(result);
})

//attachUserToPlace
router.patch('/attach/:id', auth, async (req,res) => {

    const user = await User.findById(req.body.UserId)
    const place = await Place.findByIdAndUpdate(req.params.id, {
        User: user,
        status: true
    }, {
        new: true
    });

    res.send(place);
})

//detachUserFromPlace
router.patch('/detach/:id', auth, async (req,res) => {

    const place = await Place.findByIdAndUpdate(req.params.id, {
        User: null,
        status: false
    }, {
        new: true
    });

    res.send(place);
})

module.exports = router;