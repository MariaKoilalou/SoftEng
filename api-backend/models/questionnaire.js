const { Sequelize, DataTypes } = require("sequelize");

const Questionnaire = sequelize.define("questionnaire", {
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
