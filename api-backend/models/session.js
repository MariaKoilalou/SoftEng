const { Sequelize, DataTypes } = require("sequelize");

const Session = sequelize.define("session", {
    Session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    Userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    date: {
        type: DataTypes.DATE,
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
    console.log('Session table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
