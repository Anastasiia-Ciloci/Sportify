const User = require('./User');
const Workout = require('./Workout');
const Music = require('./Music');
const Intensity = require('./Intensity');
const Comment = require('./Comment');

User.belongsToMany(Workout, {
  through: {
    model: Comment,
    unique: false,
  },
});

Workout.belongsToMany(User, {
  through: {
    model: Comment,
    unique: false,
  },
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Workout, {
  foreignKey: 'workout_id',
});

Workout.hasOne(Music, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE',
});

Music.belongsTo(Workout, {
  foreignKey: 'workout_id'
});

Intensity.hasMany(Workout, {
  foreignKey: 'intensity_id',
  onDelete: 'CASCADE',
});

Workout.belongsTo(Intensity, {
  foreignKey: 'intensity_id'
});




module.exports = { User, Workout, Music, Intensity, Comment };