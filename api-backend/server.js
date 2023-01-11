//logika oxi kalo alla idk

const app = require('./app');
var fs = require('fs');
const sequelize = require('./util/database');
const path = require('path');
const chalk = require('chalk');

var initModels = require("./models/init-models");
const populate_db = require('./util/populate-db');

const port = Number(91003);
initModels(sequelize);
sequelize
    .sync({
        // delete if system is ready to deploy
        // force: true
        // end
    })
    .then(result => {
        if (!fs.existsSync('./uploads')) { fs.mkdirSync('./uploads'); }
    })
    .catch(err => console.log(err));