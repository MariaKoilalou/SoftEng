
const express = require("express");
const sequelize = require("../util/database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require("sequelize");

function generateRandomString() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let result = '';

  for (let i = 0; i < 4; i++) {
    const randomChar = Math.floor(Math.random() * 2) == 0 ? letters : numbers;
    result += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
  }

  return result;
}

exports.postDoAnswer = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;
    const sessionID = req.params.sessionID;
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

    const newAnswer = await models.answer.create({
      Answer_id: generateRandomString(),
      //kathe fora pou to kaloume thelei allo id
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