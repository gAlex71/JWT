import sequelize from '../db';
import { DataTypes } from 'sequelize';

//После описания данной схемы она автоматически добавляется в БД
const Token = sequelize.define('token', {
    user: { type: DataTypes.JSON, references: 'user' },
    refreshToken: { type: DataTypes.STRING, allowNull: false }
}, {timestamps: false, tableName: 'token'})

module.exports = {
    Token
}