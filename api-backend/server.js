const app = require('./app');
const http = require('http');
var fs = require('fs');
const sequelize = require('./util/database');
const path = require('path');

var initModels = require('./models/init-models');
const populate_db = require('./util/populate-db');


const port = Number(9103);
const server = http.createServer(app);

initModels(sequelize);
sequelize.sync({force:true})
    .then(result => {
        populate_db();
        if (!fs.existsSync('./uploads')) { fs.mkdirSync('./uploads'); }
        server.listen(port, () => console.log(`Server running on port ${port}!`))
    })
    .catch(err => console.log(err));