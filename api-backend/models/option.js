const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("option", {
            Option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        QuestionnaireQuestionnaire_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'questionnaire',
                key: 'Questionnaire_id'
            }
        },
            QuestionQuestion_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'question',
                    key: 'Question_id'
                }
            },
        OptText: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NextQuestion_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'question',
                key: 'Question_id'
            }
        }
    },
        {
            sequelize,
            tableName: 'option',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "Option_id" },
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
                    name: "QuestionnaireQuestionnaire_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "QuestionnaireQuestionnaire_id" },
                    ]
                },
                {
                    name: "Option_id_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "Option_id" },
                    ]
                },
                {
                    name: "NextQuestion_id_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "NextQuestion_id" },
                    ]
                },
            ]
    });
    };
