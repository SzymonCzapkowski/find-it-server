const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt_decode = require('jwt-decode');
const config = require('config')
const jwt = require('jsonwebtoken');
const router = express.Router();
const {
    User,
    validateUser
} = require('../models/User');



//registration
router.post('/register', async(req, res) => {
    console.log(req);
    const {
        error
    } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    console.log(req.body);
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {
        user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = jwt.sign({
            _id: user._id
        }, config.get('myPrivateKey'));
        res.header("x-auth-token", token).send({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        });
    }

});

// getting users

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send('Something went wrong');
            next();
        };
        res.send(users);
    });
});


//getting user by id

router.get('/:id', async(req, res) => {
    const userFound = await User.findById(req.params.id);
    if (!userFound) {
        res.status(404).send('The user with given ID does not exist');
        return;
    }

    res.send(userFound);

});

// update Skills
router.patch('/:id/updateSkill', async(req, res) => {


    const skill = await User.findByIdAndUpdate(req.params.id, {
        skills: req.body.skills,
    }, {
        new: true
    });

    res.send(skill);
});






module.exports = router;