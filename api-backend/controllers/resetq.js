const express = require("express");
const sequelize = require('../util/database');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const json2csv = require('json2csv').parse;

exports.deleteQuestionnaireAnswers = async (req, res) => {
    try {
      const { questionnaireID } = req.params;
  
      if (!questionnaireID) {
        return res.status(400).json({ msg: "Questionnaire ID Undefined" });
      }
  
      await models.answer.destroy({
        where: { QuestionnaireQuestionnaire_id: questionnaireID }
      });
  
      return res.status(200).json({ msg: "Answers deleted succesfully!" });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  };