const AppError = require('../utils/appError')
const Intensity = require('../models/Intensity');
const catchAsync = require('../utils/catchAsync')

exports.changeIntensity = catchAsync(async (req, res, next) => {

});

exports.createIntensity = catchAsync(async (req, res, next) => {
    const newIntensityLevel = Intensity.create(req.body);

    res.status(201).json({
        status: 'success',
        newIntensityLevel
    })
});