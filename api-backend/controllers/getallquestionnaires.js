const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const json2csv = require('json2csv').parse;

exports.getQuestionnaire = async (req, res) => {
  try {
    const questionnaireID= req.params.questionnaireID;
    const questionID= req.params.questionID;
    const format = req.query.format;

    const questionnaire = await models.questionnaire.findAll();
    console.log(typeof questionnaire)

    if (format === "csv") {
      const fields = ["Questionnaire_id", "Keywords", "Title"];
      const csv = json2csv(questionnaire, { fields });
      res.setHeader("Content-Type", "text/plain");

      return res.send(csv);
    }

    return res.json(questionnaire);

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};