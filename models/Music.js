const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Music extends Model {}

Music.init(
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
    // not sure what to add below in songs yet, need to figure out the spotify api to see if we can use their playlists //
    songs: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    workout_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'workout',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'music',
  }
);

module.exports = Music;