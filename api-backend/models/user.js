const Sequelize = require('sequelize');

const randomNames = [
    "Biscuit",
    "Flapjack",
    "Pickle",
    "Sausage",
    "Waffle",
    "Bagel",
    "Donut",
    "Pancake",
    "Muffin",
    "Croissant"
];

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {
        id: {
            type: DataTypes.STRING,
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
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: () => {
                return randomNames[Math.floor(Math.random() * randomNames.length)];
            }
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

