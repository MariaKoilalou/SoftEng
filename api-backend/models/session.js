const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("session", {
        Session_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Userid: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        QuestionnaireQuestionnaire_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'questionnaire',
                key: 'Questionnaire_id'
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
        {
            sequelize,
            tableName: 'session',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "Session_id" },
                        {name: "Userid"},
                    ]
                },
                // {
                //     name: "Session_id_UNIQUE",
                //     unique: true,
                //     using: "BTREE",
                //     fields: [
                //         { name: "Session_id" },
                //     ]
                // },
                {
                    name: "Userid_UNIQUE",
                    unique: false,
                    using: "BTREE",
                    fields: [
                        { name: "Userid" },
                    ]
                },
                {
                    name: "QuestionnaireQuestionnaire_id_UNIQUE",
                    unique: false,
                    using: "BTREE",
                    fields: [
                        { name: "QuestionnaireQuestionnaire_id" },
                        { name: "Session_id" }
                    ]
                },
            ]
        });
};


