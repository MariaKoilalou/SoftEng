// const sequelize = require('../util/database');
// const initModels = require('../models/init-models');
// const Sequelize = require("sequelize");
// const models = initModels(sequelize);

// exports.getSessionAnswers = async (req, res) => {
//   try {
//     const sessionID = req.params.sessionID;

//     if (!sessionID) {
//       return res.status(400).json({ msg: 'Data Undefined' });
//     }

//     const session = await models.session.findOne({
//       where: {
//         Session_id: sessionID,
//       },
//       include: {
//         model: models.answer,
//         as : "answers",
//         on: {
//           'answers.SessionSession_id': Sequelize.col('session.Session_id')
//         },
//         attributes: ["Answer_id"],
//         order: [["Answer_id", "ASC"]]
//       }
//       },
//     );

//     if (!session) {
//       return res.status(404).json({ msg: 'Session not found' });
//     }

//     const answers = session.answers;

//     return res.json(answers);
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({ msg: 'Server error' });
//   }
// };

const Questionnaire = require('../models/questionnaire');
const Session = require('../models/session');
const Answer = require('../models/answer');

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