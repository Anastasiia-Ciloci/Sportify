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

const createAndSendToken = async (user, statusCode, res) => {
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

    res.status(statusCode).json({
        status: 'success',
        token,
        user
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body)
    const userDataObject = newUser.dataValues

    createAndSendToken(userDataObject, 201, res);
})

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    //1) Check if email and password exist.
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 404));
    }

    //2) Check if user exist && password is correct.
    const user = await User.findOne({where: {email: email}})

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }
})

exports.restrictTo = (...roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {

        }
    }
}

