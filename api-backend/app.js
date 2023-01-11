const express = require('express');
const bodyParser = require('body-parser');

/* ROUTES and how to import routes */
const sessions = require('./routes/sessions');
const login = require('./routes/login');
const logout = require('./routes/logout')
const admin = require('./routes/admin');
/* end of ROUTES and how to import routes */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-A    llow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-OBSERVATORY-AUTH");
    next();
});

// /* Routes used by our project */
app.use('/evcharge/api/admin', admin);
app.use('/evcharge/api/login', login);
app.use('')
app.use('/evcharge/api', sessions);
// /*End of routes used by our project */

// In case of an endpoint does not exist
app.use((req, res, next) => { res.status(404).json({message: 'Endpoint not found!'}); })

module.exports = app;