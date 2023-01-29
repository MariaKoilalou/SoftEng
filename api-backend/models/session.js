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
