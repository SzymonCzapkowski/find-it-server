const jwt = require('jsonwebtoken');
const config = require('config')
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const { User } = require('../models/User');



//login 
router.post('/login', async(req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');

    }

    const token = jwt.sign({
        _id: user._id
    }, config.get('myPrivateKey'));
    res.send(token);

});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);

}


module.exports = router;