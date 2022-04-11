const AppError = require('../utils/appError')
const Workout = require('../models/Workout');
const catchAsync = require('../utils/catchAsync')
const {Comment} = require("../models")
const {User} = require("../models")


// Note: This folder will probably be refactored short after it's made

exports.createWorkout = catchAsync(async (req, res, next) => {
    // Creates a new workout.
    const newWorkout = await Workout.create(req.body);

    // Response.
    res.status(200).json({
        status: 'Success',
        newWorkout
    })
})

// get a specific workout.
exports.getWorkout = catchAsync(async (req, res, next) => {
    const workout = await Workout.findOne({
        where: {slug: req.params.slug},
        include: [
            {model: Comment},
            {model: User, attributes: {exclude: ['password', 'passwordConfirm']}}
        ]
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
    const updatedWorkout = await Workout.update(req.body, {where: {slug: req.params.slug}})

    res.status(201).json({
        status: 'Success!',
        message: 'User updated.',
        updatedWorkout
    })
})