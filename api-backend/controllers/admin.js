// require libraries for validation, encrypting, jwt
const { validationResult } = require("express-validator");
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
const path = require("path");

// exports.postReset = (req, res, next) => {

//     const adminPw = "$2y$12$3hLJswSlH3RHShXDwXuH/OQU98hFYcTbA7xqOlKQKuYkX8yYYKaMC"

//     models.system_admins.findOne({ where: {username: "admin"} })
//         .then(system_admin => {
//             if (!system_admin) {
//                 models.system_admins.create({
//                     username : "admin",
//                     password : adminPw
//                 })
//                     .then (
//                         sequelize.query('TRUNCATE TABLE ' + '`session`')
//                             .then(() => {
//                                 return res.status(200).json({status: "OK! sessions cleared"});
//                             })
//                             .catch(err => {
//                                 return res.status(500).json({status: "Sessions reset failed"});
//                             })
//                     )
//                     .catch (err => {
//                         return res.status(500).json({status: "Sessions reset failed"});
//                     })
//             }

//         }).catch (err => {
//         return res.status(500).json({message: "Internal server error."});
//     })

// }

// exports.postQuestionnaire = (req, res) => {
//     const questionnaireID = req.params.questionnaireID;
  
//     models.question.findAll({ where: { Questionnaire_id: questionnaireID } })
//       .then(questions => {
//         const promises = questions.map(question => {
//           return models.answer.destroy({ where: { Question_id: question.Question_id } })
//         })
  
//         Promise.all(promises)
//           .then(() => {
//             return res.status(200).send({
//               message: "All answers for the specified questionnaire have been reset successfully."
//             })
//           })
//           .catch(error => {
//             return res.status(500).send({
//               message: "Failed to reset answers for the specified questionnaire.",
//               error: error.message
//             })
//           })
//       })
//       .catch(error => {
//         return res.status(500).send({
//           message: "Failed to retrieve questions for the specified questionnaire.",
//           error: error.message
//         })
//       })
//   };



exports.getHealthcheck = (req, res, next) => {

    sequelize.authenticate()
        .then(() => {
            res.status(200).json({status: "OK"});
        })
        .catch(err => {
            res.status(500).json({status: "FAILED"});
        })
}



exports.postQuestionnaire = async (req, res, next) => {

    const questionnaireID = req.params.questionnaireID;
    try {
        const deletedAnswers = await models.option.destroy({
            where: { QuestionnaireQuestionnaire_id: questionnaireID }
        });
        res.json({ status: 'OK' });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            reason: error.message
        });
    }
};

exports.postQuestionnaireUpd = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a JSON file!" });
        }

        const filePath = path.join(__dirname, "..", "uploads", req.file.filename);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: "Could not read the file: " + req.file.originalname,
                });
            }

            const questionnaireData = JSON.parse(data);
            const questionnaireModels = [];
            const questionModels = [];
            const optionModels = [];

            questionnaireData.forEach((questionnaire) => {
                questionnaireModels.push({
                    Questionnaire_id: questionnaire.questionnaireID,
                    Title: questionnaire.questionnaireTitle,
                    Keywords: questionnaire.keywords,
                });

                questionnaire.questions.forEach((question) => {
                    questionModels.push({
                        Question_id: question.qID,
                        type: question.type,
                        Text: question.qtext,
                        Mandatory: question.require,
                        Questionnaire_id: questionnaire.questionnaireID,
                    });

                    question.options.forEach((option) => {
                        optionModels.push({
                            Option_id: option.optID,
                            OptText: option.opttxt,
                            NextQuestion_id: option.nextqID,
                            Question_id: question.qID,
                        });
                    });
                });
            });

            Promise.all([
                models.questionnaire.bulkCreate(questionnaireModels),
                models.question.bulkCreate(questionModels),
                models.option.bulkCreate(optionModels),
            ])
                .then(() => {
                    return res.status(201).send({
                        message: "Questionnaire data has been successfully inserted into the database!",
                    });
                })
                .catch((error) => {
                    return res.status(500).send({
                        message: "Failed to insert questionnaire data into the database!",
                        error: error.message,
                    });
                });
        });
    } catch (error) {
        return res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};



