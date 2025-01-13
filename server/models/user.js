const sequelize = require('../db');
const { DataTypes } = require('sequelize');

//После описания данной схемы она автоматически добавляется в БД
const User = sequelize.define('user', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING }
}, {timestamps: false, tableName: 'user'})

module.exports = {
    User
}