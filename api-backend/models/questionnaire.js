const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("questionnaire", {
        Questionnaire_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Author_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: true
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
                    {name: "Author_id"},
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
            {
                name: "Author_id_UNIQUE",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "Author_id" },
                ]
            },
        ]
    });
};



