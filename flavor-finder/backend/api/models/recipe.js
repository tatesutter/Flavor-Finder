const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recipe = sequelize.define('Recipe', {
  idMeal: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  strMeal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  strMealThumb: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  strInstructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  strYoutube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Recipe;
