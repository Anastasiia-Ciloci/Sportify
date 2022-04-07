const sequelize = require('../config/connection');
const { User, Workout, Intensity } = require('../models');

const userData = require('./userSeeds.json');
const workoutData = require('./workoutSeeds.json');

