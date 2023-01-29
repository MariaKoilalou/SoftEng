const Sequelize = require("sequelize");
const sequelize = new Sequelize(
'intelliq_api',
'root',
'MariaKoilalou2210!',
{
host: 'localhost',
dialect: 'mysql',
}
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

var http = require('http');

http.createServer(function(request, response){

   //The following code will print out the incoming request text
   request.pipe(response);

}).listen(8080, 'localhost');

console.log('Listening on port 8080...');