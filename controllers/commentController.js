const AppError = require('../utils/appError')
const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync')

exports.createComment = catchAsync(async (req, res, next) => {
    const newComment = await Comment.create(req.body);

    res.status(201).json({
        status: 'Success',
        newComment
    })
});

exports.getAllComments = catchAsync(async (req, res, next) => {

});

exports.getComment = catchAsync(async (req, res, next) => {

});

exports.updateComment = catchAsync(async (req, res, next) => {

});

exports.deleteComment = catchAsync(async (req, res, next) => {

});