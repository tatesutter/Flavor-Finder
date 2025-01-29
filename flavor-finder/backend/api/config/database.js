const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL ? new Sequelize (process.env.DB_URL) : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false, // Set true to log SQL queries
  port: process.env.DB_PORT,
  
});

module.exports = sequelize;
