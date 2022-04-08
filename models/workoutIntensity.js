const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class workoutIntensity extends Model {
}

workoutIntensity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        intensity_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'intensity',
                key: 'id',
            }
        },
        workout_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'workout',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'workoutIntensity',
    }
);

module.exports = workoutIntensity;