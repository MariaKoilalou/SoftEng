const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
            },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'admin',
        }
    },
        {
            sequelize,
            tableName: 'user',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "id"},
                    ]
                },
                {
                    name: "id_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id" },
                    ]
                },
                {
                    name: "email_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "email"},
                    ]
                },
                ]
        });
};

