const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    admin: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

const sequelize = new Sequelize(
    'intelliq_api',
    'root',
    'MariaKoilalou2210!',
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize.sync().then(() => {
    console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
