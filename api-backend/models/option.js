const { Sequelize, DataTypes } = require("sequelize");

const Option = sequelize.define("option", {
    Option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    Sessionid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    Userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    AnswerAnswer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    QuestionQuestion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true
    },
    Text: {
        type: DataTypes.STRING,
        allowNull: true
    },
    NextQuestionid: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    console.log('Option table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});