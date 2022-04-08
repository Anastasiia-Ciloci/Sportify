const AppError = require('../utils/appError')
const Workout = require('../models/Workout');
const catchAsync = require('../utils/catchAsync')
const {Comment} = require("../models")

// Note: This folder will probably be refactored short after it's made

exports.createWorkout = catchAsync(async (req, res, next) => {
    // Creates a new workout.
    const newWorkout = await Workout.create(req.body)

    // Response.
    res.status(200).json({
        status: 'Success',
        newWorkout
    })
})

// get a specific workout.
exports.getWorkout = catchAsync(async (req, res, next) => {
    const workout = await Workout.findByPk(req.params.id, {
        include: {
           model: Comment 
        }
    })
    // Response.
    res.status(200).json({
        status: 'Success',
        workout
    })
})

exports.getAllWorkouts = catchAsync(async (req, res, next) => {
    const workouts = await Workout.findAll();

    res.status(200).json({
        status: 'Success',
        workouts
    })
})

exports.deleteWorkout = catchAsync(async (req, res, next) => {
    const deletedWorkout = await Workout.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success!',
        message: 'Workout successfully deleted'
    })
})

exports.updateWorkout = catchAsync(async (req, res, next) => {
    const updatedWorkout = await Workout.update({
        title: req.body.title,
        description: req.body.description,
        time_frame: req.body.time_frame,
        user_id: req.body.user_id
    })

    res.status(201).json({
        status: 'Success!',
        message: 'User updated.',
        updatedWorkout
    })
})