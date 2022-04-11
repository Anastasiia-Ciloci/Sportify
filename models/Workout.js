const {Model, DataTypes} = require('sequelize');
const slugify = require("slugify");
const sequelize = require('../config/connection');
const catchAsync = require('../utils/catchAsync');

const intensityLevels = ['Easy', 'Medium', 'Hard'];

class Workout extends Model {
}

Workout.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        description: {
            type: DataTypes.TEXT,
        }, intensity: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkIntensity(value) {
                    if (!intensityLevels.includes(value)) throw new Error('Workout must have an intensity level.')
                }
            }
        },
        time_frame: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        slug: {
            type: DataTypes.STRING,
        },
    },
    {
        hooks: {
            beforeCreate: catchAsync(async (workout) => {
                // console.log(workout.title)
                // Can also access workout object values as: "workout.title"
                const data = workout.dataValues;
                workout.dataValues.slug = await slugify(data.title, {lower: true});
            })
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'workout',
    },
);

module.exports = Workout;
