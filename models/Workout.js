const { Model, DataTypes } = require("sequelize");
const slugify = require("slugify");
const sequelize = require("../config/connection");
const catchAsync = require("../utils/catchAsync");

const intensityLevels = ["Easy", "Medium", "Hard"];

class Workout extends Model {}

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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "workout",
  }
);

module.exports = Workout;
