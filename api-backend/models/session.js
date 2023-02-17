const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("session", {
        Session_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
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
                        { name: "Session_id" }
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


