const questionnaireController = require('../controllers/questionnaire');

const upload = require("../middlewares/upload");
const isAuth = require('../middlewares/authentication')
const permit = require('../middlewares/authorization')

const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/:questionnaireId', controller.getQuestionnaire);

module.exports = router;