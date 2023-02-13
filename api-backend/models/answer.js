const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("answer", {
        Answer_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        QuestionQuestion_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'question',
                key: 'Question_id'
            }
        },
            SessionSession_id: {
                type: DataTypes.STRING,
                allowNull: true,
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
        // {
        //     name: "Answer_id_UNIQUE",
        //     unique: true,
        //     using: "BTREE",
        //     fields: [
        //         { name: "Answer_id" },
        //     ]
        // },
        {
            name: "QuestionQuestion_id_UNIQUE",
            unique: false,
            using: "BTREE",
            fields: [
                { name: "QuestionQuestion_id" },
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
