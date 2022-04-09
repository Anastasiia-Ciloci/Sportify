const express = require('express');
const workoutController = require('../controllers/workoutController')
const authController = require('../controllers/authController')

const router = express.Router()

router
    .route('/')
    .get(workoutController.getAllWorkouts)
    .post(authController.protect, workoutController.createWorkout)

router
    .route('/:id')
    .get(workoutController.getWorkout)
    .put(authController.protect, workoutController.updateWorkout)
    .delete(authController.protect, workoutController.deleteWorkout)

module.exports = router;
