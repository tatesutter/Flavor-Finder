const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users', // Explicitly set table name
});

module.exports = User;
