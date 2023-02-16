var DataTypes = require("sequelize").DataTypes;
var _answer = require("./answer");
var _option = require("./option");
var _question = require("./question");
var _questionnaire = require("./questionnaire");
var _session = require("./session");

function initModels(sequelize) {
    var answer = _answer(sequelize, DataTypes);
    var option = _option(sequelize, DataTypes);
    var question = _question(sequelize, DataTypes);
    var questionnaire = _questionnaire(sequelize, DataTypes);
    var session = _session(sequelize, DataTypes);


    question.belongsTo(questionnaire,{foreignKey: "QuestionnaireQuestionnaire_id"});
    questionnaire.hasMany(question, {foreignKey: "QuestionnaireQuestionnaire_id", onDelete: 'cascade', onUpdate: 'cascade'});
    answer.belongsTo(question, {foreignKey: "QuestionQuestion_id"});
    question.hasMany(answer, { foreignKey: "QuestionQuestion_id", onDelete: 'cascade', onUpdate: 'cascade'});
    session.belongsTo(questionnaire, { foreignKey: "QuestionnaireQuestionnaire_id"});
    questionnaire.hasMany(session, {foreignKey: "QuestionnaireQuestionnaire_id",onDelete: 'cascade', onUpdate: 'cascade'});
    answer.belongsTo(session, {foreignKey: "SessionSession_id"});
    session.hasMany(answer, { foreignKey: "SessionSession_id", onDelete: 'set null', onUpdate: 'cascade'});
    question.hasMany(option, {foreignKey: "QuestionQuestion_id",onDelete: 'cascade', onUpdate: 'cascade'});
    option.belongsTo(question,{foreignKey:"QuestionQuestion_id"});
    option.hasOne(question, {foreignKey: "NextQuestion_id",onDelete: 'set null', onUpdate: 'cascade'});
    option.hasOne(question, {foreignKey: {name: "NextQuestion_id", allowNull: true,}, onDelete: 'set null', onUpdate: 'cascade'});
    question.belongsTo(option,{foreignKey:"NextQuestion_id"});
    option.belongsTo(questionnaire, {foreignKey: "QuestionnaireQuestionnaire_id"});
    questionnaire.hasMany(option, {foreignKey:"QuestionnaireQuestionnaire_id", onDelete: 'cascade', onUpdate: 'cascade'});




    return {
        answer,
        option,
        question,
        questionnaire,
        session
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;