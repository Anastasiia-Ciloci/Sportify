const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(viewsController.renderLoginSignup)

router
    .route('/:slug')
    .get(viewsController.renderWorkout)
    .get(viewsController.renderProfile)

router 
    .route('/home')
    .get(viewsController.renderTimeline)

module.exports = router;
