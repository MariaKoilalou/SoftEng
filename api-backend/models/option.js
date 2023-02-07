const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("option", {
            Option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        SessionSession_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'session',
                key: 'Session_id'
            }
        },
        Userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        AnswerAnswer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'answer',
                key: 'Answer_id'
            }
        },
        // QuestionQuestionOp_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     // primaryKey: true,
        //     references: {
        //         model: 'question',
        //         key: 'Question_id'
        //     }
        // },
        Text: {
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
                        {name: "SessionSession_id"},
                        {name: "AnswerAnswer_id"},
                        {name: "Userid"},


                    ]
                },
                {
                    name: "AnswerAnswer_id_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "AnswerAnswer_id" },
                    ]
                },
                {
                    name: "SessionSession_id_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "SessionSession_id" },
                    ]
                },
                // {
                //     name: "QuestionQuestionOp_id_UNIQUE",
                //     unique: true,
                //     using: "BTREE",
                //     fields: [
                //         { name: "QuestionQuestionOp_id" },
                //     ]
                // },
                {
                    name: "Userid_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "Userid" },
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
