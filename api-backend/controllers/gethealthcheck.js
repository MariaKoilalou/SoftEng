// require libraries for validation, encrypting, jwt
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// end of libraries validation, encrypting, jwt

// require models
const sequelize = require('../util/database');
var initModels = require("../models/init-models");
var models = initModels(sequelize);
// end of require models

const fs = require("fs");
const path = require("path");



exports.getHealthcheck = (req, res, next) => {

    sequelize.authenticate()
        .then(() => {
            res.status(200).json({status: "OK"});
        })
        .catch(err => {
            res.status(500).json({status: "FAILED"});
        })
}