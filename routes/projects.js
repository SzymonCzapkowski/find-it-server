const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const {
    Project,
    validateProject
} = require('../models/project');


module.exports = router;