import {Sequelize} from 'sequelize';
//no`t working!!!
const sequelize = new Sequelize(
    'NAME',
    'USER',
    '1234',
    {
        dialect: 'postgres',
        host: 'host',
        port: 123456
    }
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    // {
    //     dialect: 'postgres',
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT
    // }
);

export default sequelize;