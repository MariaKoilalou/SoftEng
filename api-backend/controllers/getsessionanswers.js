const express = require("express");
const sequelize = require("../util/database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require("sequelize");
const { Parser } = require('json2csv');

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
    });

    if (format === "csv") {
      const fields = ["QuestionQuestion_id", "Answer_id"];
      const csv = new Parser({ fields }).parse(answers);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=answers.csv");

      return res.send(csv);
    } else {
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