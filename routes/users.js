const auth = require("../middleware/auth");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt_decode = require('jwt-decode')
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
        res.send(user);


        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        });
    }

});

//get users

const users = [{
        id: 1,
        name: 'Adam'
    },
    {
        id: 2,
        name: 'Ewa'
    },
];

//get all users
router.get('/', (req, res) => {
    res.send(users);
});


//get user by ID
router.get('/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
});

//add Skills
router.patch('/:id/addSkill', (req, res) => {
    const { error } = validateSkill(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const skills = [];

    const skill = {
        id: skills.length + 1,
        name: req.body.name
    };
    skills.push(skill);
    res.send(skill);
});


//delete Skills
router.delete('/:id/deleteSkill', (req, res) => {
    const skill = skills.find(c => c.id === parseInt(req.params.id));
    if (!skill) return res.status(404).send('The skill with the given ID was not found.');

    const index = skills.indexOf(skill);
    skills.splice(index, 1);

    res.send(skill);
});




module.exports = router;