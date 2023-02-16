const Sequelize = require('sequelize')

let sequelize;

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'run'

if (process.env.NODE_ENV.trim() === 'test') {
<<<<<<< HEAD
    sequelize = new Sequelize('intelliq_api-test', 'root', 'nikolakis22', {
=======
    sequelize = new Sequelize('intelliq_api-test', 'root', 'Nikos6942013374', {
>>>>>>> 91411e651069ca4ebb0011840ac9c61de671675b
        dialect: 'mysql',
        host: 'localhost',
        port: '3306',
        logging: false
    });
}
else {
<<<<<<< HEAD
    sequelize = new Sequelize('intelliq_api', 'root', 'nikolakis22', {
=======
    sequelize = new Sequelize('intelliq_api', 'root', 'Nikos6942013374', {
>>>>>>> 91411e651069ca4ebb0011840ac9c61de671675b
        dialect: 'mysql',
        host: 'localhost',
        port: '3306',
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