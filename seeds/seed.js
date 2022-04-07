const sequelize = require('../config/connection');
const userData = require('./userSeeds.json');
const workoutData = require('./workoutSeeds.json');
const intensityData = require('./intensitySeeds.json');
const { User, Workout, Intensity } = require('../models');

const seedUser = () => User.bulkCreate(userData);
const seedWorkout = () => Workout.bulkCreate(workoutData);
const seedIntensity = () => Intensity.bulkCreate(intensityData);

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedWorkout();

  await seedIntensity();

  process.exit(0);
};

seedAll();
