const json2csv = require('json2csv').parse;
const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.postDoAnswer = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const sessionID = req.params.session;
    const optionID = req.params.optionID;

    if (!questionnaireID || !questionID || !sessionID || !optionID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    const question = await models.question.findOne({
      where: { 
        QuestionnaireQuestionnaire_id: questionnaireID,
        Question_id: questionID
      }
    });

    if (!question) {
      return res.status(400).json({ msg: "Question not found" });
    }

    const session = await models.session.findByPk(sessionID);

    if (!session) {
      return res.status(400).json({ msg: "Session not found" });
    }

    const answer = await models.answer.create({
      Answer_id: "1312",
      Text : optionID,
      QuestionQuestion_id: questionID,
      QuestionnaireQuestionnaire_id : questionnaireID,
      SessionSession_id: sessionID
    });
    return res.sendStatus(200);
    // return res.json({ msg: "Answer recorded successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};