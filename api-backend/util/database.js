const Sequelize = require('sequelize')

let sequelize;

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'run'

if (process.env.NODE_ENV.trim() === 'test') {
    sequelize = new Sequelize('SoftEng22-69-test', 'root', 'SoftEng22-69', {
        dialect: 'mysql',
        protocol: 'mysql',
        host: 'localhost',
        port: '8080',
        logging: false
    });
}
else {
    sequelize = new Sequelize('SoftEng22-69', 'root', 'SoftEng22-69', {
        dialect: 'mysql',
        protocol: 'mysql',
        host: 'localhost',
        port: '8080',
        logging: false
    });
}



sequelize.authenticate()
    .then(() => {
        console.log("Success connecting to database!");
    })
    .catch(err => {
        console.error("Unable to connect to the database", err);
    })

module.exports = sequelize;