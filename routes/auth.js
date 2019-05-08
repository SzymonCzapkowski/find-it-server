const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user');


//login
router.post('/api/auth/login', async(req, res) => {
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
    }, 'myPrivateKey');
    res.send(token);
});

module.exports = router;