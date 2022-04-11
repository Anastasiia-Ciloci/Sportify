const AppError = require('../utils/appError')
const Comment = require('../models/Comment');
const catchAsync = require('../utils/catchAsync')

exports.setCommentUserId = (req, res, next) => {
  // Allow Nested routes
  if (!req.body.slug) req.body.slug = req.params.workoutSlug;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};


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