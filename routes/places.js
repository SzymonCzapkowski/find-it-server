const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const {
    Place,
    validatePlace
} = require('../models/place');


module.exports = router;