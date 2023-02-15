const json2csv = require('json2csv').parse;
const express = require("express");
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const Questionnaire = models.questionnaire;
const Session = models.session;
const Answer = models.answer;

exports.getSessionAnswers = async (req, res, next) => {
  const questionnaireID = req.params.questionnaireID;
  const sessionID = req.params.session;

  try {
    // find the questionnaire
    const questionnaire = await Questionnaire.findById(questionnaireID);
    if (!questionnaire) {
      return res.status(400).json({ message: 'Questionnaire not found' });
    }

    // find the session
    const session = await Session.findOne({ _id: sessionID, questionnaire: questionnaireID });
    if (!session) {
      return res.status(400).json({ message: 'Session not found' });
    }

    // find all answers for the session
    const answers = await Answer.find({ session: sessionID });

    // group the answers by question
    const answersByQuestion = {};
    answers.forEach(answer => {
      if (!answersByQuestion[answer.question]) {
        answersByQuestion[answer.question] = [];
      }
      answersByQuestion[answer.question].push(answer);
    });

    // build the response object
    const response = {
      questionnaire: questionnaire,
      session: session,
      answers: answersByQuestion,
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};