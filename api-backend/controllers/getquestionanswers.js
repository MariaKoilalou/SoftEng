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
          model: models.questionnaire,
          where: {
            Questionnaire_id: questionnaireID
          },
          attributes:["Questionnaire_id"],
          required:false,
          include: [
            {
              model: models.session,
              where: {
                QuestionnaireQuestionnaire_id: questionnaireID
              },
              attributes:["Session_id"],
              required: false,
              include: [
                {
                  model: models.answer,
                  as: "answers",
                  on: {
                    'model.SessionSession_id': Sequelize.col('Session_id')

                  },
                  attributes: ["SessionSession_id", "Answer_id"],
                  order: [["SessionSession_id", "ASC"]]
                }
              ],
            }
          ],
        }
        ],
      attributes: ["QuestionnaireQuestionnaire_id","Question_id"]
    });

    if (!question) {
      return res.status(400).json({ msg: "Question not found" });
    }
    return res.json(question);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};