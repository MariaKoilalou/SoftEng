const express = require("express");
const sequelize = require("../util/database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require("sequelize");

exports.getQuestionAnswers = async (req, res) => {
  try {
    const { questionnaireID, questionID } = req.params;

    if (!questionnaireID || !questionID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    const answers = await models.answer.findAll({
      attributes: ["SessionSession_id","Answer_id"],
      where: {
        [Op.and]: [
          { QuestionQuestion_id: questionID },
          { QuestionnaireQuestionnaire_id: questionnaireID },
        ],
      },
    });

    return res.json(answers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};