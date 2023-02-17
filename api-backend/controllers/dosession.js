
const express = require("express");
const sequelize = require("../util/database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { Op } = require("sequelize");

function generateRandomString() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  let result = '';

  for (let i = 0; i < 4; i++) {
    const randomChar = Math.floor(Math.random() * 2) == 0 ? letters : numbers;
    result += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
  }

  return result;
}

exports.postDoSession = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;

    if (!questionnaireID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    var tempSession = generateRandomString();
    const newSession = await models.session.create({
      Session_id: tempSession,
      //Userid: "0069",
      QuestionnaireQuestionnaire_id : questionnaireID
    });
    return res.json(tempSession);
    // return res.sendStatus(200);
    // return res.json({ msg: "Answer recorded successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};