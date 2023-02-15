const json2csv = require('json2csv').parse;
const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const op = Sequelize.Op;

exports.getQuestion = async (req, res) => {
  try {
    const questionnaireID= req.params.questionnaireID;
    const questionID= req.params.questionID;
    const format = req.query.format;

    const { Parser } = require('json2csv');

// Define an instance method on the Questionnaire model to convert it to CSV format
models.questionnaire.prototype.toCsv = function() {
  const fields = [
    { label: "Questionnaire ID", value: "Questionnaire_id" },
    { label: "Title", value: "Title" },
    { label: "Keywords", value: "Keywords" },
    { label: "Question ID", value: "questions.Question_id" },
    { label: "Question Text", value: "questions.Text" },
    { label: "Question Type", value: "questions.Type" },
    { label: "Question Mandatory", value: "questions.Mandatory" },
  ];

  const json2csvParser = new Parser({ fields, unwind: ["questions"] });
  const csv = json2csvParser.parse(this.toJSON());

  return csv;
};
    const question = await models.question.findOne({
                  where: {
                      QuestionnaireQuestionnaire_id: questionnaireID,
                      Question_id: questionID
                  },
                  include: [
                      {
                          model: models.option,
                          as: "options",
                          where: {
                              QuestionQuestion_id: questionID
                          },
                          on: {
                              'options.QuestionQuestion_id': Sequelize.col('question.Question_id')
                          },
                          attributes: ["Option_id", "OptText", "NextQuestion_id"],
                          order: [["Option_id", "ASC"]]
                      }
                  ],
                  attributes: ["QuestionnaireQuestionnaire_id", "Question_id", "Text", "type", "Mandatory"]
              });

   
              if (format === "csv") {
                const fields = ["QuestionnaireQuestionnaire_id", "Question_id", "Text", "type", "Mandatory"];
                const csv = json2csv(question, { fields });
                res.setHeader("Content-Type", "text/plain");
             
                return res.send(csv);
              } else {
                return res.json(question);
              }
            } catch (err) {
              console.error(err.message);
              return res.status(500).json({ msg: "Server error" });
            }
          };