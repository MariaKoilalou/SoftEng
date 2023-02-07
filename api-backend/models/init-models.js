var DataTypes = require("sequelize").DataTypes;
var _answer = require("./answer");
var _option = require("./option");
var _question = require("./question");
var _questionnaire = require("./questionnaire");
var _session = require("./session");
var _user = require("./user");
var _system_admins = require("./system_admin");
var _expired_tokens = require("./expired_tokens");

function initModels(sequelize) {
    var answer = _answer(sequelize, DataTypes);
    var option = _option(sequelize, DataTypes);
    var question = _question(sequelize, DataTypes);
    var questionnaire = _questionnaire(sequelize, DataTypes);
    var session = _session(sequelize, DataTypes);
    var user = _user(sequelize, DataTypes);
    var system_admins = _system_admins(sequelize, DataTypes);
    var expired_tokens = _expired_tokens(sequelize, DataTypes);


    questionnaire.belongsTo(user, { foreignKey: "Author_id"});
    user.hasMany(questionnaire, {foreignKey: "Author_id",onDelete: 'cascade', onUpdate: 'cascade'});
    question.belongsTo(questionnaire,{foreignKey: "QuestionnaireQuestionnaire_id"});
    questionnaire.hasMany(question, {foreignKey: "QuestionnaireQuestionnaire_id", onDelete: 'set null', onUpdate: 'cascade'});
    answer.belongsTo(question, {foreignKey: "QuestionQuestion_id"});
    question.hasMany(answer, { foreignKey: "QuestionQuestion_id", onDelete: 'set null', onUpdate: 'cascade'});
    session.belongsTo(user, {foreignKey: "Userid"});
    user.hasMany(session, {foreignKey:"Userid", onDelete: 'cascade', onUpdate: 'cascade'});
    answer.belongsToMany(session, { through: option, foreignKey: "AnswerAnswer_id", otherKey: "SessionSession_id" });
    session.belongsToMany(answer, { through: option, foreignKey: "SessionSession_id", otherKey: "AnswerAnswer_id" });
    // option.hasOne(question, {foreignKey: "QuestionQuestionOp_id"});
    // question.belongsTo(option, {foreignKey: "QuestionQuestionOp_id ", onDelete: 'cascade', onUpdate: 'cascade'});
    option.belongsTo(user, {foreignKey:"Userid"});
    user.hasOne(option, {foreignKey:"Userid", onDelete: 'cascade', onUpdate: 'cascade'});
    option.hasOne(question, {foreignKey: "NextQuestion_id",onDelete: 'set null', onUpdate: 'cascade'});
    question.belongsTo(option,{foreighKey:"NextQuestion_id"});

    return {
        answer,
        option,
        question,
        questionnaire,
        session,
        user,
        system_admins,
        expired_tokens
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;