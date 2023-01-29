const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("question", {
        Question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Mandatory: {
            type: DataTypes.INTEGER(1),
            allowNull: true
        },
        QuestionnaireQuestionnaire_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'questionnaire',
                key: 'Questionnaire_id'
            }
        }
},
    {
        sequelize,
        tableName: 'question',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "Question_id"},
                ]
            },
            {
                name: "Question_id_UNIQUE",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "Question_id" },
                ]
            },
            {
                name: "QuestionnaireQuestionnaire_id_UNIQUE",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "QuestionnaireQuestionnaire_id" },
                ]
            },
        ]
    });
};


