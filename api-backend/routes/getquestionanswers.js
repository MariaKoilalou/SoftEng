const express = require('express');

const answerController = require('../controllers/getquestionanswers');

const upload = require("../middlewares/upload");
const isAuth = require('../middlewares/authentication')
const permit = require('../middlewares/authorization')

const router = express.Router();

router.get('/:questionnaireID/:questionID', answerController.getAnswer);

module.exports = router;