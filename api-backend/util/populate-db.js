const sequelize = require('./database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const data_importer = require('./data_importer');

function populate() {

        data_importer("../data/questionnaire.json", models.questionnaire, false)
        .then( () => {
            return data_importer("../data/question.json", models.question, false)
        })
        .then( () => {
            return data_importer("../data/option.json", models.option, false)
        })
        .then( () => {
            return data_importer("../data/session.json", models.session, false)
        })
        .then( () => {
            return data_importer("../data/answer.json", models.answer, false)
        })
}

module.exports = populate;