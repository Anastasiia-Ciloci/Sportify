const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Intensity extends Model {}

Intensity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'intensity',
  }
);

module.exports = Intensity;