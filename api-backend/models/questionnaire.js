const { Sequelize, DataTypes } = require("sequelize");
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("questionnaire", {
        Questionnaire_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primarykey: true
        },
        Author_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Title: {
            type: DataTypes.STRING,
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
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
