const express = require("express");
const sequelize = require('../util/database');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const json2csv = require('json2csv').parse;

exports.getQuestionnaire = async (req, res) => {
  try {
    const id = req.params.questionnaireID;
    const format = req.query.format;

    const questionnaire = await models.questionnaire.findOne({
      where: { Questionnaire_id: id },
      include: [
        {
          model: models.question,
          as: "questions",
          where: {
            QuestionnaireQuestionnaire_id: id
          },
          attributes: ["Question_id", "Text", "Type", "Mandatory"],
          order: [["Question_id", "ASC"]]
        }
      ],
      attributes: ["Questionnaire_id", "Title", "Keywords"]
    });

    if (!id) {
      return res.status(400).json({ msg: "Questionnaire ID Undefined" });
    }
     
      
    const questt = await models.question.findOne({
      where: {
        QuestionnaireQuestionnaire_id: id,
      }
    });

    if (!questt) {
      return res.status(400).json({ msg: "Questionnaire not found" });
    }




    if (format === "csv") {
      const fields = ["Question_id", "Text", "Type", "Mandatory"];
      const csv = json2csv(questionnaire.questions, { fields });
      res.setHeader("Content-Type", "text/plain");

      return res.send(csv);
    }

    const response = {
      questionnaireID: questionnaire.Questionnaire_id,
      questionnaireTitle: questionnaire.Title,
      keywords: questionnaire.Keywords,
      questions: questionnaire.questions
    };

    return res.json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};