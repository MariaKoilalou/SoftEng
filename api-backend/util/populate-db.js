const sequelize = require('./database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const data_importer = require('./data_importer');

function populate() {

    data_importer("../data/user.csv", models.user, false)
        // .then( () => {
        //     return data_importer("../data/session.csv", models.session, false)
        // })
        .then( () => {
            return data_importer("../data/questionnaire.csv", models.questionnaire, false)
        })
        .then( () => {
            return data_importer("../data/question.csv", models.question, false)
        })
        .then( () => {
            return data_importer("../data/option.csv", models.option, false)
        })
        .then( () => {
            return data_importer("../data/session.csv", models.session, false)
        })
        .then( () => {
            return data_importer("../data/answer.csv", models.answer, false)
        })
}

module.exports = populate;