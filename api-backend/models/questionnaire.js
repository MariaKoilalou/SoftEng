const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("questionnaire", {
        Questionnaire_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Keywords: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        Title: {
            type: DataTypes.STRING,
            allowNull: false
        }
},
    {
        sequelize,
        tableName: 'questionnaire',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "Questionnaire_id" },

                ]
            },
            {
                name: "Questionnaire_id_UNIQUE",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "Questionnaire_id" },
                ]
            },
        ]
    });
};



