const { Sequelize, DataTypes } = require("sequelize");
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("question", {
        Question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primarykey: true
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Mandatory: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        QuestionnaireQuestion_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
};

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
    console.log('Question table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
