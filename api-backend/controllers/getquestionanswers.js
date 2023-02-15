const json2csv = require('json2csv').parse;
const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getQuestionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;

    if (!questionnaireID || !questionID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    const question = await models.question.findOne({
      where: {
        QuestionnaireQuestionnaire_id: questionnaireID,
        Question_id: questionID
      },
      include: [
        {
          model: models.answer,
          as: "answers",
          where: { QuestionQuestion_id: questionID },
          attributes: ["Answer_id", "Text", "SessionSession_id"],
          order: [["Answer_id", "ASC"]]
        },
        {
          model: models.session,
          as: "sessions",
          attributes: ["Session_id"]
        }
      ]
    });

    if (!question) {
      return res.status(400).json({ msg: "Question not found" });
    }

    const answers = question.answers.map(answer => ({
      Answer_id: answer.Answer_id,
      Text: answer.Text,
      SessionSession_id: answer.SessionSession_id,
      Session_id: models.session.Session_id
    }));

    return res.json(answers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};