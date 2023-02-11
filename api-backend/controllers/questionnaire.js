// require models
const express = require('express');
const router = express.Router();
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
// end of require models

const Sequelize = require('sequelize');
//const questionnaire = require('../models/questionnaire');
const op = Sequelize.Op;

exports.getQuestionnaire = (req, res) => {

    const format = req.query.format;

    models.questionnaire.findOne({
        where: {Questionnaire_id: questionnaireID},
        include: [{
            model: question,
            as: 'questions',
            attributes: ['Question_id', 'Text', 'type', 'Mandatory']
        }],
        attributes: ['Questionnaire_id', 'Title', 'Keywords']
    })
    .then(questionnaire => {
        if (!questionnaire) {
            return res.status(400).json({ message: "Questionnaire ID undefined" })
        }

        if (format === 'csv') {
            questions.findAll({
                order: [
                  ['Question_id', 'ASC']
                ]
            })
            .then(questions => {
                let csv = "Question_id,Text,type,Mandatory\n";
                questions.forEach(question => {
                  csv += `${question.Question_id},${question.Text},${question.type},${question.Mandatory}\n`;
                });
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename="questionnaire.csv"');
                res.send(csv);
            });
        }

        else {
            res.status(200).json({
                questionnaireID: questionnaire.Questionnaire_id,
                title: questionnaire.Title,
                keywords: questionnaire.Keywords,
                questions: questionnaire.questions
            })
        }
    })
    .catch (err => {
        console.log(err)
        return res.status(500).json({message: "Internal server error."});
    })

}

module.exports = router;