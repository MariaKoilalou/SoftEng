const express = require("express");
const sequelize = require('../util/database');
const initModels = require("../models/init-models");
const models = initModels(sequelize);


exports.ResetAll = async (req, res) => {
    try {
      
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await models.questionnaire.destroy({ truncate: true });  
      
      await models.question.destroy({ truncate: true });
      await models.session.destroy({ truncate: true });
      await models.answer.destroy({ truncate: true });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
 
      return res.status(200).json({ msg: "All data removed successfully" });
      
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  };