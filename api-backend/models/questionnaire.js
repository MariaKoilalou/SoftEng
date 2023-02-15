const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("questionnaire", {
        Questionnaire_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        Keywords: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                return this.getDataValue('Keywords') ? this.getDataValue('Keywords').split(',') : [];
            },
            set(value) {
                //this.setDataValue('Keywords', value.join(','));
                this.setDataValue('Keywords');
            }
        },
        Author_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false
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
                unique: false,
                using: "BTREE",
                fields: [
                    { name: "Author_id" },
                ]
            },
        ]
    });
};



