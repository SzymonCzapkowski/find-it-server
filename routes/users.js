const auth = require("../middleware/auth");
const mongoose = require('mongoose');
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





module.exports = router;