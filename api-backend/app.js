//mallon kalo

const express = require('express');
const bodyParser = require('body-parser');

/* ROUTES and how to import routes */
const question = require('./routes/question');
const login = require('./routes/login');
const logout = require('./routes/logout')
const admin = require('./routes/admin');
const doanswer = require('./routes/doanswer');
const getsessionanswers = require('./routes/getsessionanswers');
const questionnaire = require('./routes/questionnaire');
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
app.use('/intelliq_api/admin', admin);
app.use('/intelliq_api/login', login);
app.use('/intelliq_api/logout',logout);
app.use('/intelliq_api/question', question);
app.use('/intelliq_api/questionnaire', questionnaire);
app.use('/intelliq_api/doanswer', doanswer);
app.use('/intelliq_api/qetsessionanswers', getsessionanswers);
// /*End of routes used by our project */

// In case of an endpoint does not exist
app.use((req, res, next) => { res.status(404).json({message: 'Endpoint not found!'}); })

module.exports = app;