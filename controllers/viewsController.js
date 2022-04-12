const Workout = require("../models/Workout");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Intensity = require("../models/Intensity");
const catchAsync = require("../utils/catchAsync");

// renders login/sign up page
exports.renderLoginSignup = catchAsync(async (req, res, next) => {
    res.render("login-signup", {});
});

exports.renderTimeline = catchAsync(async (req, res, next) => {
    const workoutsArray = await Workout.findAll();

    const workouts = workoutsArray.map(workout => workout.get({plain: true}));

    res.render('timeline', {workouts, loggedIn: req.session.loggedIn});
});

// renders page with selected workout
exports.renderWorkout = catchAsync(async (req, res, next) => {
    const selectedWorkoutData = await Workout.findOne({where: {slug: req.params.slug}}, {
        include: {
            model: Comment,
        },
    });
    console.log(req.params)
    const selectedWorkout = selectedWorkoutData.get({plain: true});
    console.log(selectedWorkout)

    res.render("selected-workout", {selectedWorkout,  loggedIn: req.session.loggedIn});
});

// render profile page
exports.renderProfile = catchAsync(async (req, res, next) => {
    console.log('here!')
    const userData = await User.findByPk(req.params.id, {
        include: {
            model: Workout,
        },
    });
    // const user = userData.get({plain: true})
    res.render("profilepage", {  loggedIn: req.session.loggedIn });
});
