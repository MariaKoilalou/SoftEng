const sequelize = require('../util/database');
const initModels = require("../models/init-models");
const models = initModels(sequelize);

exports.getQuestionAnswers = async (req, res) => {
  try {
    const questionnaireID = req.params.questionnaireID;
    const questionID = req.params.questionID;

    if (!questionnaireID || !questionID) {
      return res.status(400).json({ msg: "Data Undefined" });
    }

    const question = await models.question.findOne({
      where: { 
        QuestionnaireQuestionnaire_id: questionnaireID,
        Question_id: questionID
      }
    });

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }

    const answers = await models.answer.findAll({
      where: {
        QuestionQuestion_id: questionID
      }
    });

    return res.json(answers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};