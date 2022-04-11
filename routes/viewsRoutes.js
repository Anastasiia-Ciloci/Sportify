const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(viewsController.renderHompage)

router
    .route('/:slug')
    .get(viewsController.renderWorkout)
    .get(viewsController.renderProfile)


module.exports = router;
