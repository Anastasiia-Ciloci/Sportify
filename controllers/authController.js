const {User} = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
    const newUserData = await User.create({...req.body, passwordConfirm: req.body.password})
    const newUser = newUserData.get({plain: true})

    delete newUser.password;
    delete newUser.passwordConfirm;

    req.session.save(() => {
        req.session.user = newUser;
        req.session.loggedIn = true;
        res.json('Logged in.')
    })
});

exports.logout = catchAsync(async (req, res, next) => {
    if (req.session.loggedIn) {
        req.session.destroy( () => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // Check if email and password were provided.
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 404));
    }

    // Check if user exist && password is correct.
    const user = await User.findOne({where: {email: email}})

    // If user doesn't exist return error,
    if (!user) return next(new AppError('Incorrect email or password, please try again'))

    // Validates the password
    const validPassword = await user.checkPassword(req.body.password);

    // If password does not exist return a new error
    if (!validPassword) next(new AppError('Incorrect email or password, please try again'))

    const newUser = user.get({plain: true})

    delete newUser.password;
    delete newUser.passwordConfirm;

    req.session.save(() => {
        req.session.user = newUser;
        req.session.loggedIn = true;
        res.json('Logged in.')
    })
})

exports.restrictTo = (...roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.session.user.role)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }
        next();
    }
}

exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login')
    }
})