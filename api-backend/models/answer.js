const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("answer", {
        Answer_id: {
            type: DataTypes.STRING,
            //autoIncrement: false,
            allowNull: false,
            primaryKey: true
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        QuestionQuestion_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'question',
                key: 'Question_id'
            }
        },
            QuestionnaireQuestionnaire_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'question',
                    key: 'QuestionnaireQuestionnaire_id'
                }
            },
            SessionSession_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'session',
                    key: 'Session_id'
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
            ]
        },
        {
            name: "QuestionQuestion_id_UNIQUE",
            unique: false,
            using: "BTREE",
            fields: [
                { name: "QuestionQuestion_id" },
            ]
        },
            {
                name: "QuestionnaireQuestionnaire_id_UNIQUE",
                unique: false,
                using: "BTREE",
                fields: [
                    { name: "QuestionnaireQuestionnaire_id" },
                ]
            },
            {
                name: "SessionSession_id_UNIQUE",
                unique: false,
                using: "BTREE",
                fields: [
                    { name: "SessionSession_id" },
                ]
            },
    ]
});
};
