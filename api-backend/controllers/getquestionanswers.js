// const express = require("express");
// const sequelize = require('../util/database');
// var initModels = require("../models/init-models");
// var models = initModels(sequelize);
// const Sequelize = require('sequelize');
//
// exports.getAnswer = (req, res, next) => {
//
//     const questionnaireID = req.param.questionnaireID;
//     const sessionID = req.param.session;
//
//
//     if (!questionnaireID || ! !sessionID) return res.status(400).json({message: 'Some parameters are undefined'});
//
//
//     models.session.findOne({ where: {QuestionnaireQuestionnaire_id: questionnaireID} })
//             .then(models.answer.findOne({ where: {SessionSession_id: sessionID} }))
//             .then()
//             .catch(err => {
//                 return res.status(500).json({message: 'Internal server error.'})
//             })
//     }
// }