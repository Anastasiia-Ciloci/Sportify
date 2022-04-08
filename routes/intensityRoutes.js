const express = require('express');
const intensityController = require('../controllers/intensityController')

const router = express.Router()

router.post('/', intensityController.changeIntensity);

module.exports = router;
