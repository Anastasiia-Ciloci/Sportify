const AppError = require('../utils/appError')
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync')
const {Workout} = require("../models");

// Note: This folder will probably be refactored short after it's made

// Create user handler
exports.createUser = catchAsync(async (req, res, next) => {
    //Creates a new user with the model.
    const newUser = await User.create(req.body);

    // Removes the password from the output.
    newUser.password = undefined;

    // Sends responses with the newly created user.
    res.status(201).json({
        status: 'success!',
        newUser
    })
});

// Get all users.
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const usersList = await User.findAll();

    res.status(201).json({
        status: 'success',
        usersList
    })
});

// get a specific user.
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Workout
        }
    });

    // Removes the password from the output.
    user.password = undefined;

    res.status(201).json({
        status: 'success',
        user
    })
})

// Updates a specific user
exports.updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = User.update({
            name: req.body.name,
            email: req.body.email
        },
        {
            where: {
                id: req.params.id
            }
        });

    res.status(201).json({
        status: 'success',
        updatedUser
    })
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const deletedUser = User.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(201).json({
        status: 'success!',
        message: 'User successfully deleted'
    })
});