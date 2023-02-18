const express = require("express");
const sequelize = require("../util/database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require("sequelize");
const json2csv = require('json2csv').parse;

exports.getQuestionAnswers = async (req, res) => {
  try {
    const { questionnaireID, questionID } = req.params;
    const format = req.query.format;

    if (!questionnaireID || !questionID) {
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

    const answers = await models.answer.findAll({
      attributes: ["SessionSession_id", "Answer_id"],
      where: {
        [Op.and]: [
          { QuestionQuestion_id: questionID },
          { QuestionnaireQuestionnaire_id: questionnaireID },
        ],
      },
      order: [["SessionSession_id", "ASC"]]
    });

    if (format === "csv") {
      
      const answersList = answers.map((answers) => [
        answers.SessionSession_id, answers.Answer_id
      ]);
      const fields = ["Questionnaire_id", "Question_id", "Session_id_Answer_id"];
      const result = {
        Questionnaire_id: questionnaireID,
        Question_id: questionID,
        Session_id_Answer_id: answersList,
      };

      const csv = json2csv(result, { fields })
      // const html = `<pre>${csv}</pre>`;
      res.setHeader("Content-Type", "text/plain");
      return res.send(csv);
    }
    
    else {
      return res.json({
        questionnaireID: questionnaireID,
        questionID: questionID,
        answers: answers,
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};