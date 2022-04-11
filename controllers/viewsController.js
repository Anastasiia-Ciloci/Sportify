const Workout = require("../models/Workout");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Intensity = require("../models/Intensity");
const catchAsync = require("../utils/catchAsync");

// renders homepage
exports.renderHompage = catchAsync(async (req, res, next) => {
  const allWorkouts = await Workout.findAll();

  res.render("home", allWorkouts);
});

// renders page with selected workout
exports.renderWorkout = catchAsync(async (req, res, next) => {
  const selectedWorkout = await Workout.findByPk(req.params.id, {
    include: {
      model: Comment,
    },
  });

  res.render("selected-workout", selectedWorkout);
});

// render profile page
exports.renderProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Workout,
    },
  });

  res.render("profilepage", user);
});
