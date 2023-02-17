const express = require("express");
const sequelize = require("../util/database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require("sequelize");
const { Parser } = require("json2csv");

exports.getQuestionOptions = async (req, res) => {
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

    const options = await models.option.findAll({
      attributes: ["Option_id", "OptText","NextQuestion_id"],
      where: {
        [Op.and]: [
          { QuestionQuestion_id: questionID },
          { QuestionnaireQuestionnaire_id: questionnaireID },
        ],
      },
    });

    if (format === "csv") {
      const fields = ["SessionSession_id", "Answer_id"];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(options);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", 'attachment; filename="answers.csv"');
      return res.send(csv);
    } else {
      return res.json({
        questionnaireID: questionnaireID,
        questionID: questionID,
        options: options,
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};