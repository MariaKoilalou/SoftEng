// require libraries for validation, encrypting, jwt
const { validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// end of libraries validation, encrypting, jwt

// require models
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);

const fs = require("fs");
const csv = require("fast-csv");

exports.getQuestion = async (req, res) => {
    try {
      const questionnaireId = req.params.questionnaireID;
      const questionId = req.params.questionID;
  
      const question = await models.question.findOne({
        where: { 
          QuestionnaireQuestionnaire_id: questionnaireId,
          Question_id: questionId
        },
        attributes: ["Question_id", "Text", "type", "Mandatory"]
      });
  
      if (!question) {
        return res.status(404).json({ msg: "Question not found" });
      }
  
      return res.json(question);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  };