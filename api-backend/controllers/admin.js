// require libraries for validation, encrypting, jwt
const { validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// end of libraries validation, encrypting, jwt

// require models
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
// end of require models

const fs = require("fs");
const csv = require("fast-csv");

exports.postReset = (req, res, next) => {

    const adminPw = "$2y$12$3hLJswSlH3RHShXDwXuH/OQU98hFYcTbA7xqOlKQKuYkX8yYYKaMC"

    models.system_admins.findOne({ where: {username: "admin"} })
        .then(system_admin => {
            if (!system_admin) {
                models.system_admins.create({
                    username : "admin",
                    password : adminPw
                })
                    .then (
                        sequelize.query('TRUNCATE TABLE ' + '`session`')
                            .then(() => {
                                return res.status(200).json({status: "OK! sessions cleared"});
                            })
                            .catch(err => {
                                return res.status(500).json({status: "Sessions reset failed"});
                            })
                    )
                    .catch (err => {
                        return res.status(500).json({status: "Sessions reset failed"});
                    })
            }

        }).catch (err => {
        return res.status(500).json({message: "Internal server error."});
    })

}

exports.getUser = (req, res, next) => {

    const email = req.params.username;
    const isAdministrator = req.query.isAdministrator;

    if (!email) return res.status(400).json({message: 'Some parameters are undefined'});

    if (isAdministrator === 'true') {

        models.user.findOne({ where: {email: email} })
            .then(administratorDoc => {
                if (!administratorDoc) {
                    return res.status(402).json({message: 'User was not found!'});
                }
                res.send(administratorDoc);
            })
            .catch(err => {
                return res.status(500).json({message: 'Internal server error.'})
            })
    }
}

exports.getHealthcheck = (req, res, next) => {

    sequelize.authenticate()
        .then(() => {
            res.status(200).json({status: "OK"});
        })
        .catch(err => {
            res.status(500).json({status: "FAILED"});
        })
}

exports.login = (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) return res.status(400).json({message: 'Some parameters are undefined'});

    let loadedAdmin;
    models.system_admins.findOne({ where: {username: username} })
        .then(systemAdmin => {
            if (!systemAdmin) {
                res.status(401).json({message:'Wrong credentials!'});
            }
            loadedAdmin = systemAdmin;
            return bcrypt.compare(password, systemAdmin.password);
        })
        .then (isEqual => {
            if (!isEqual) {
                res.status(401).json({message:'Wrong credentials!'});
            }
            const token = jwt.sign(
                { user: {
                        system_admin_id: loadedAdmin.system_admin_id,
                        role: loadedAdmin.role
                    } },
                'antegeiafile',
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            return res.status(500).json({message: 'Internal server error.'})
        });
}

exports.postUsermod = (req, res, next) => {

    // get dynamic parameters and query parameter
    const username = req.params.username;
    const password = req.params.password;
    const isAdministrator = req.query.isAdministrator;

    if (!username || !password) return res.status(400).json({message: 'Some parameters are undefined'});

    // if the user is administrator user
    if (isAdministrator === 'true') {
        // try get administrator from db
        models.user.findOne({ where: { email: email } })
            .then (administratorUser => {
                // if not exists must be created
                if (!administratorUser) {
                    bcrypt.hash(password, 12).then(hashedPw => {
                        const newAdministratorUser = models.user.create({
                            username : username,
                            email : email,
                            password : hashedPw
                        });
                        res.status(201).json({signup: 'true', message: 'Account created succesfully!'});
                    })
                        .catch(err => {
                            return res.status(500).json({message: 'Internal server error.'})
                        });
                }

                // Administrator user is already signed up and wants to change pw
                else {
                    bcrypt.hash(password, 12).then(hashedPw => {
                        administratorUser.password = hashedPw;
                        administratorUser.save();
                    })
                        .then(result => {
                            res.status(200).json({change_password: 'true', message: 'Password changed succesfully!'});
                        })
                        .catch(err => {
                            return res.status(500).json({message: 'Internal server error.'})
                        });
                }
            })
            .catch(err => {
                return res.status(500).json({message: 'Internal server error.'})
            });
    }
}

exports.postQuestionnaire = async (req, res) => {

    let answer = [];

    const questionnaireID = req.body.questionnaireID;

    try {
        const deletedAnswers = await answer.destroy({
            where: {QuestionQuestion_id: questionnaireID}
        });
        res.json({status: 'OK'});
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            reason: error.message
        });
    }
};

exports.postQuestionnaireUpt = (req, res) => {

    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
        }

        let questionnaire = [];
        let question = [];
        let option = [];
        var fail = 0;
        let path = __dirname + "/../uploads/" + req.file.filename;

        fs.createReadStream(path)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                if (row.Questionnaire_id == '' || row.Author_id == '' ||
                    row.Title == '' || row.Question_id == '' ||
                    row.type == '' || row.Mandatory == '' || row.Text == '' ||
                    row.AnswerAnswer_id == '' || row.NextQuestion_id == '') {
                    fail = fail + 1;
                }
                else {
                    if (row.rating == 'NULL') {
                        row.rating = null;
                    }
                    sessions.push(row);
                }
            })
            .on("end", () => {
                models.questionnaire.bulkCreate(questionnaire,{ validate: true })
                    .then(() => {
                        models.question.bulkCreate(question,{ validate: true })
                            .then(() => {
                                models.answer.bulkCreate(answer,{ validate: true })
                                    .then(() => {
                                        return models.answer.count();
                                        }
                                    )
                            })

                    })
                    .then(totalAnswers => {
                        res.status(201).send({
                            SessionsInUploadedFile: answer.length + fail,
                            SessionsImported: answer.length,
                            TotalSessionsInDatabase: totalAnswers
                        });
                    })
                    .catch((error) => {
                        res.status(500).send({
                            message: "Fail to import data into database!",
                            error: error.message
                        });
                    });

            });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

// exports.postQuestionnaireUpt = (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send({
//                 status: "failed",
//                 reason: "Please upload a JSON file!"
//             });
//         }
//
//         const path = `${__dirname}/../uploads/${req.file.filename}`;
//         let questionnaire = null;
//         let questions = [];
//         let fail = 0;
//
//         fs.readFile(path, (err, data) => {
//             if (err) {
//                 return res.status(500).send({
//                     status: "failed",
//                     reason: `Could not upload the file: ${req.file.originalname}`,
//                     error: err.message
//                 });
//             }
//
//             try {
//                 const jsonData = JSON.parse(data);
//                 questionnaire = {
//                     questionnaireID: jsonData.questionnaireID,
//                     questionnaireTitle: jsonData.questionnaireTitle,
//                     keywords: jsonData.keywords
//                 };
//
//                 for (let i = 0; i < jsonData.questions.length; i++) {
//                     const question = jsonData.questions[i];
//                     if (!question.qID || !question.qtext || !question.required || !question.type || !question.options) {
//                         fail++;
//                         continue;
//                     }
//
//                     let options = [];
//                     for (let j = 0; j < question.options.length; j++) {
//                         const option = question.
