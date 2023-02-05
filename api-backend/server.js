const app = require('./app');
const https = require('https');
var fs = require('fs');
const sequelize = require('./util/database');
const path = require('path');
const chalk = require('chalk');

var initModels = require("./models/init-models");
const populate_db = require('./util/populate-db');
const sslServer = require("express/lib/application");

const port = Number(9103);

initModels(sequelize);
sequelize
    .sync({
    })
    .then(result => {
       // populate_db();
       if (!fs.existsSync('./uploads')) { fs.mkdirSync('./uploads'); }
       sslServer.listen(port, () => console.log(chalk.green(`🚀 Secure Server running on port ${port}!`)))
    })
    .catch(err => console.log(err));