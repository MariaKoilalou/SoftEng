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

    const answers = [await models.answer.findAll({
        where: { 
            QuestionnaireQuestionnaire_id: questionnaireID,
            QuestionQuestion_id: questionID
        },
      attributes: ["QuestionnaireQuestionnaire_id", "QuestionQuestion_id", "SessionSession_id","Text", "type", "Mandatory"]
    })];

    if (!questionnaireID || !questionID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    if (format === "csv") {
      const csvString = question.toCsv();
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=questionnaire_${questionnaireID}_question_${questionID}.csv`
      );
      return res.send(csvString);
    }

    return res.json(answers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};