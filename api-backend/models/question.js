const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("question", {
        Question_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Mandatory: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
        QuestionnaireQuestionnaire_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
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
                    {name: "QuestionnaireQuestionnaire_id"},

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
        ]
    });
};



