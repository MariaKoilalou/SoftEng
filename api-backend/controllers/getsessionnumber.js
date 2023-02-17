const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const json2csv = require('json2csv').parse;


const { Op } = require("sequelize");

exports.getSessionNumber = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const format = req.query.format;

    if (!questionnaireID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    const sessions = await models.answer.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("SessionSession_id")), "SessionSession_id"],
      ],
      where: {
        QuestionnaireQuestionnaire_id: questionnaireID,
      },
    });

    const sessionCount = sessions.length;

    if (format === "csv") {
      const fields = ["Questionnaire ID", "Session Count"];
      const result = {
        "Questionnaire ID": questionnaireID,
        "Session Count": sessionCount,
      };
      const csv = json2csv(result, { fields });
      const html = `<pre>${csv}</pre>`;
      res.setHeader("Content-Type", "text/html");
      return res.send(html);
    } else {
      return res.json({
        questionnaireID: questionnaireID,
        sessionCount: sessionCount,
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};