const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recipe = sequelize.define('Recipe', {
  title: { type: DataTypes.STRING, allowNull: false },
  ingredients: { type: DataTypes.TEXT, allowNull: false },
  instructions: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
});

module.exports = Recipe;
