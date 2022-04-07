const User = require('./User');
const Workout = require('./Workout');
const Music = require('./Music');
const Intensity = require('./Intensity');
const Comment = require('./Comment');

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Workout.hasMany(Comment, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Workout, {
  foreignKey: 'workout_id',
});

User.hasMany(Workout, {
  foreignKey: 'user_id',
});

Workout.belongsTo(User, {
  foreignKey: 'user_id',
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