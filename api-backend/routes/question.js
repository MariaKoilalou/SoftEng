const express = require('express');

const questionController = require('../controllers/question');

const upload = require("../middlewares/upload");
const isAuth = require('../middlewares/authentication')
const permit = require('../middlewares/authorization')

const router = express.Router();

// router.get('/:questionnaireID/:questionID', questionController.getQuestion);