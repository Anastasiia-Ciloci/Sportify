const express = require('express');
const intensityController = require('../controllers/intensityController')
const authController = require('../controllers/authController')


const router = express.Router()

// router.post('/:id',
//     authController.protect,
//     authController.restrictTo('ADMIN'),
//     intensityController.changeIntensity
// );
//
// router.post('/',
//     authController.protect,
//     authController.restrictTo('ADMIN'),
//     intensityController.createIntensity
// );

module.exports = router;
