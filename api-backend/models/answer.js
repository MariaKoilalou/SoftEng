const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("answer", {
        Answer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        QuestionQuestion_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            references: {
                model: 'question',
                key: 'Question_id'
            }
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
        tableName: 'answer',
        timestamps: false,
        indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "Answer_id" },
                {name: "QuestionQuestion_id"},
            ]
        },
        {
            name: "Answer_id_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "Answer_id" },
            ]
        },
        {
            name: "QuestionQuestion_id_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "QuestionQuestion_id" },
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

