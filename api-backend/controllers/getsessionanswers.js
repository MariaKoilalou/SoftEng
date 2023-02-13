const sequelize = require('../util/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

exports.getSessionAnswers = async (req, res) => {
  try {
    const sessionID = req.params.sessionID;

    if (!sessionID) {
      return res.status(400).json({ msg: 'Data Undefined' });
    }

    const session = await models.session.findOne({
      where: {
        Session_id: sessionID,
      },
      include: {
        model: models.answer,
        required: false,
      },
    });

    if (!session) {
      return res.status(404).json({ msg: 'Session not found' });
    }

    const answers = session.answers;

    return res.json(answers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};