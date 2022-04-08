const User = require('./User');
const Workout = require('./Workout');
const Music = require('./Music');
const Intensity = require('./Intensity');
const Comment = require('./Comment');
const WorkoutIntensity = require('./workoutIntensity')

// General note
// One-to-one: hasOne <---> belongsTo
// One-to-many: hasMany <---> belongsTo
// Many-to-many: belongsToMany <---> belongsToMany


// One-to-many relationship between User and Comments. A user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
//==================================================

// One-to many relationship between User and Workout
User.hasMany(Workout, {
    foreignKey: 'user_id',
});

Workout.belongsTo(User, {
    foreignKey: 'user_id',
});
//==================================================

// One-to-many relationship between Workout and Comment
Workout.hasMany(Comment, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Workout, {
    foreignKey: 'workout_id',
});
//==================================================

// Many-to-many relationship between Intensity and Workout
Intensity.belongsToMany(Workout, {
    through: WorkoutIntensity,
    foreignKey: 'intensity_id'
});

Workout.belongsToMany(Intensity, {
    through: WorkoutIntensity,
    foreignKey: 'workout_id'
});
//==================================================

Workout.hasOne(Music, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE',
});

Music.belongsTo(Workout, {
    foreignKey: 'workout_id'
});

module.exports = {User, Workout, Music, Intensity, Comment};