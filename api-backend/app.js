const express = require('express');
const bodyParser = require('body-parser');

/* ROUTES and how to import routes */
const question = require('./routes/question');
const doanswer = require('./routes/doanswer');
const dosession = require('./routes/dosession');
const getsessionanswers = require('./routes/getsessionanswers');
const getquestionanswers = require('./routes/getquestionanswers');
const questionnaire = require('./routes/questionnaire');
const getallquestionnaires = require('./routes/getallquestionnaires')
const questionnaireupd = require('./routes/questionnaireupd')
const gethealthcheck = require('./routes/gethealthcheck')
const resetq = require('./routes/resetq')
const resetall = require('./routes/resetall')
const getquestionoptions = require('./routes/getquestionoptions');
const getsessionnumber = require('./routes/getsessionnumber');
/* end of ROUTES and how to import routes */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-OBSERVATORY-AUTH");
    next();
});

// /* Routes used by our project */
app.use('/intelliq_api/question', question);
app.use('/intelliq_api/questionnaire', questionnaire);
app.use('/intelliq_api/doanswer', doanswer);
app.use('/intelliq_api/dosession', dosession);
app.use('/intelliq_api/getsessionanswers', getsessionanswers);
app.use('/intelliq_api/getquestionanswers', getquestionanswers);
app.use('/intelliq_api/getallquestionnaires', getallquestionnaires);
app.use('/intelliq_api/gethealthcheck', gethealthcheck);
app.use('/intelliq_api/questionnaireupd', questionnaireupd);
app.use('/intelliq_api/resetq', resetq);
app.use('/intelliq_api/resetall', resetall);
app.use('/intelliq_api/getquestionoptions', getquestionoptions);
app.use('/intelliq_api/getsessionnumber', getsessionnumber);


// /*End of routes used by our project */

// In case of an endpoint does not exist
app.use((req, res, next) => { res.status(400).json({message: 'Endpoint not found!'}); })

module.exports = app;