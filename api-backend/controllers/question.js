const express = require("express");
const sequelize = require('../util/database');
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const Sequelize = require('sequelize');
//const op = Sequelize.Op;
const json2csv = require('json2csv').parse;

exports.getQuestion = async (req, res) => {
  try {
    const questionnaireID= req.params.questionnaireID;
    const questionID= req.params.questionID;
    const format = req.query.format;

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
            QuestionnaireQuestionnaire_id: questionnaireID,
            QuestionQuestion_id: questionID
          },
          attributes: ["Option_id", "OptText", "NextQuestion_id"],
          order: [["Option_id", "ASC"]]
        }
      ],
      attributes: ["QuestionnaireQuestionnaire_id", "Question_id", "Text", "type", "Mandatory"]
    });

    if (!questionnaireID || !questionID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    const quest = await models.question.findOne({
      where: {
        QuestionnaireQuestionnaire_id: questionnaireID,
        Question_id: questionID
      }
    });

    if (!quest) {
      return res.status(400).json({ msg: "Question not found" });
    }

    // Define the toCsv() function
    // question.toCsv = function () {
    //   const csvFields = ["QuestionnaireQuestionnaire_id", "Question_id", "Text", "type", "Mandatory"];
    //   const csvOptions = { fields: csvFields };
    //   const csvData = [question];
    //   return json2csv(csvData, csvOptions);
    // };

    // if (format === "csv") {
    //   const csvString = question.toCsv();
    //   res.setHeader("Content-Type", "text/csv");
    //   res.setHeader("Content-Disposition", "inline");
    //   res.write(csvString);
    //   return res.end();
    // }

    if (format === "csv") {
      
      const optionList = question.options.map((option) => [
        option.Option_id, 
        option.OptText, 
        option.NextQuestion_id
      ]);
      const fields = ["Questionnaire_id", "Question_id", "Question_text", 
                      "Required", "Type", "OptionID_OptionText_NextQuestion"];
      const result = {
        Questionnaire_id: questionnaireID,
        Question_id: questionID,
        Question_text: question.Text,
        Required: question.Mandatory,
        Type: question.type,
        OptionID_OptionText_NextQuestion: optionList
      };

      const csv = json2csv(result, { fields })
      // const html = `<pre>${csv}</pre>`;
      res.setHeader("Content-Type", "text/plain");
      return res.send(csv);
    }

    return res.json(question);

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};