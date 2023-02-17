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



exports.postQuestionnaireUpd = (req, res) => {
    try {
        if (!req.file) {
            return res.status(401).send({ message: "Please upload a JSON file!" });
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
                    return res.status(200).send({
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
