const express = require('express');
const workoutController = require('../controllers/workoutController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true })

router
    .route('/')
    .get(workoutController.getAllWorkouts)
    .post(authController.protect, authController.restrictTo('TRAINER', 'ADMIN'), workoutController.createWorkout)

router
    .route('/:slug')
    .get(authController.protect, workoutController.getWorkout)
    .put(authController.protect, authController.restrictTo('TRAINER', 'ADMIN'), workoutController.updateWorkout)
    .delete(authController.protect, authController.restrictTo('TRAINER', 'ADMIN'), workoutController.deleteWorkout)

module.exports = router;
