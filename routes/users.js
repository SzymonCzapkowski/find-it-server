const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const {
    User,
    validateUser
} = require('../models/user');


module.exports = router;