const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router
  .route('/')
  .get(viewsController.renderHompage)

router
  .route('/:id')
  .get(viewsController.renderWorkout)
  .get(viewsController.renderProfile)
