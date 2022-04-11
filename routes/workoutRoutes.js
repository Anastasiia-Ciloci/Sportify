const express = require('express');
const workoutController = require('../controllers/workoutController')
const authController = require('../controllers/authController')

const router = express.Router({mergeParams: true})

router
    .route('/')
    .get(workoutController.getAllWorkouts)
    .post(authController.isLoggedIn, authController.restrictTo('TRAINER', 'ADMIN', 'USER'), workoutController.createWorkout)

router
    .route('/:slug')
    .get(authController.isLoggedIn, workoutController.getWorkout)
    .put(authController.isLoggedIn, authController.restrictTo('TRAINER', 'ADMIN'), workoutController.updateWorkout)
    .delete(authController.isLoggedIn, authController.restrictTo('TRAINER', 'ADMIN'), workoutController.deleteWorkout)

module.exports = router;
