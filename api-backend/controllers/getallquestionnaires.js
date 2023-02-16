const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getQuestionnaire = async (req, res) => {
  try {
    const questionnaireID= req.params.questionnaireID;
    const questionID= req.params.questionID;
    const format = req.query.format;

    const questionnaire = await models.questionnaire.findAll();
    console.log(typeof questionnaire)

    // if (format === "csv") {
    //   const csvString = questionnaire.toCsv();
    //   res.setHeader("Content-Type", "text/csv");
    //   res.setHeader(
    //     "Content-Disposition",
    //     `attachment; filename=questionnaires}.csv`
    //   );
    //   return res.send(csvString);
    // }

    return res.json(questionnaire);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};