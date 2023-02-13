const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getQuestionnaire = async (req, res) => {
  try {
    const id = req.param.questionnaireID;
    const format = req.query.format;

    const questionnaire = await models.questionnaire.findOne({
      where: { Questionnaire_id: id },
      include: [
        {
            model: models.question,
            as: "questions",
            where: { QuestionnaireQuestionnaire_id: id},
            attributes: ["Question_id", "Text", "type", "Mandatory"],
            order: [["Question_id", "ASC"]]
        }
      ],
      attributes: ["Questionnaire_id", "Title", "Keywords"]
    });

    if (!id) {
      return res.status(400).json({ msg: "Questionnaire ID Undefined" });
    }

    if (format === "csv") {
      const csvString = questionnaire.toCsv();
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=questionnaire_${id}.csv`
      );
      return res.send(csvString);
    }

    return res.json(questionnaire);
    
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
