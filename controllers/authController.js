const crypto = require('crypto');
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = catchAsync(async (id) => {
    return jwt.sign()
})