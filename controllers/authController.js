const crypto = require('crypto');
const {promisify} = require("util");
const fs = require('fs')
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const RSA_PRIVATE_KEY = fs.readFileSync(__dirname + '/../ssh/jwtRS256.key')

const signToken = (id) => {
    return jwt.sign({id: id},
        RSA_PRIVATE_KEY,
        {
            algorithm: 'RS256'
        });
}

const createAndSendToken = catchAsync(async (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    // Remove password from output
    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user
    })
})

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body)
    const userDataObject = newUser.dataValues

    await createAndSendToken(userDataObject, 201, res);
})

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

    //3) If everything is ok, send the token back to the client.
    createAndSendToken(user, 200, res);

    // I'm keeping this as a reference

    // req.session.save(() => {
    //     req.session.user_id = userData.id;
    //     req.session.logged_in = true;
    //
    //     res.json({user: userData, message: 'You are now logged in!'});
    // });
})

exports.protect = catchAsync(async (req, res, next) => {
    // Get token and check if it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError("You are not logged in! Please log in to get access.", 401)
        );
    }
    // Validate token.
    const decoded = await promisify(jwt.verify)(token, RSA_PRIVATE_KEY, {algorithms: 'RS256'});
    // const decoded = await jwt.verify(token, RSA_PRIVATE_KEY);

    // Check if user exists.
    const userExist = await User.findByPk(decoded.id);
    if (!userExist) {
        return next(
            new AppError("The user belonging to this token does not longer exist."),
            401
        );
    }

    // Check if user changed password.
    // if (userExist.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //         new AppError("User recently changed password. Please log in again.", 401)
    //     );
    // }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = userExist;
    next();
});

exports.restrictTo = (...roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }
        next();
    }
}

exports.isLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(token, RSA_PRIVATE_KEY, {algorithms: 'RS256'});

        const currentUser = await User.findByPk(decoded.id);
        if (!currentUser) {
            return next();
        }

        // There is a logged user.
        req.locals.user = currentUser; // All the express templates have access to the req.locals variable.f
        next();
    }
    next();
})