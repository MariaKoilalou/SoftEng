const sequelize = require('../util/database');
const initModels = require("../models/init-models");
const models = initModels(sequelize);

// exports.getQuestionAnswers = async (req, res) => {
//   try {
//     const questionnaireID = req.params.questionnaireID;
//     const questionID = req.params.questionID;

//     if (!questionnaireID || !questionID) {
//       return res.status(400).json({ msg: "Data Undefined" });
//     }

//     const question = await models.question.findOne({
//       where: { 
//         QuestionnaireQuestionnaire_id: questionnaireID,
//         Question_id: questionID
//       },
//       include: {
//         model: models.answer,
//         as : "answers",
//         on: {
//           'answers.QuestionQuestion_id': Sequelize.col('question.Question_id')
//         },
//         attributes: ["Answer_id"],
//         order: [["Answer_id", "ASC"]]
//       }
//     });

//     if (!question) {
//       return res.status(404).json({ msg: "Question not found" });
//     }

//     const answers = await models.answer.findAll({
//       where: {
//         QuestionQuestion_id: questionID
//       }
//     });

//     return res.json(answers);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };

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
      },
      include: [
        {
          model: models.answer,
          as: "answers",
          where: { QuestionQuestion_id: questionID },
          attributes: ["Answer_id", "Text", "SessionSession_id"],
          order: [["Answer_id", "ASC"]]
        },
        {
          model: models.session,
          as: "sessions",
          attributes: ["Session_id"]
        }
      ]
    });

    if (!question) {
      return res.status(400).json({ msg: "Question not found" });
    }

    const answers = question.answers.map(answer => ({
      Answer_id: answer.Answer_id,
      Text: answer.Text,
      SessionSession_id: answer.SessionSession_id,
      Session_id: answer.sessions.Session_id
    }));

    return res.json(answers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};