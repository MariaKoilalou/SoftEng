const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const op = Sequelize.Op;


exports.getQuestion = async (req, res) => {

    try {
    const [questionnaireID, questionID] = req.params;
    const format = req.query.format;
    let option = [];

    const question = await models.question.findOne({
        where: { 
            QuestionnaireQuestionnaire_id: questionnaireID,
            Question_id: questionID
        },
        include: [
        {
            model: option.question,
            as: "options",
            where: {
                QuestionnaireQuestionnaire_id: questionnaireID,
                QuestionQuestion_id: questionID
            },
            attributes: ["Option_id", "OptText", "NextQuestion_id"],
            order: [["Option_id", "ASC"]]
        }
      ],
      attributes: ["QuestionnaireQuestionnaire_id", "Question_id", "Text", "type", "Mandatory"]
    });

    if (!questionnaireID || !questionID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

        question.toCsv = function () {
            const header = 'Question_id,Text,type,Mandatory';
            const values = `${question.Question_id},${question.Text},${question.type},${question.Mandatory}`;
            return `${header}\n${values}`;
        };


        if (format === "csv") {
       const csvString = question.toCsv();
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=questionnaire_${questionnaireID}_question_${questionID}.csv`
      );
      return res.send(csvString);
    }

    return res.json(question);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
