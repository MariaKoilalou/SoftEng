const express = require("express");
const sequelize = require("../util/database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require("sequelize");
const json2csv = require('json2csv').parse;

exports.getSessionAnswers = async (req, res) => {
  try {
    const { questionnaireID, session } = req.params;
    const format = req.query.format;

    if (!questionnaireID || !session) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    
    const sess = await models.session.findOne({
      where: {
        QuestionnaireQuestionnaire_id: questionnaireID,
        Session_id: session
      }
    });

    if (!sess) {
      return res.status(400).json({ msg: "Session not found" });
    }

    const answers = await models.answer.findAll({
      attributes: ["QuestionQuestion_id", "Answer_id"],
      where: {
        [Op.and]: [
          { SessionSession_id: session },
          { QuestionnaireQuestionnaire_id: questionnaireID },
        ],
      },
      order: [["QuestionQuestion_id", "ASC"]]
    });

    

    if (format === "csv") {
      
      const answersList = answers.map((answer) => [
        answer.QuestionQuestion_id, answer.Answer_id
      ]);
      const fields = ["Questionnaire_id", "Session_id", "Question_id_Answer_id"];
      const result = {
        Questionnaire_id: questionnaireID,
        Session_id: session,
        Question_id_Answer_id: answersList,
      };

      const csv = json2csv(result, { fields })
      // const html = `<pre>${csv}</pre>`;
      res.setHeader("Content-Type", "text/plain");
      return res.send(csv);
    } 

    else {
      return res.json({
        questionnaireID: questionnaireID,
        session: session,
        answers: answers,
      });
    }

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};