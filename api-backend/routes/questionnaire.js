// const express = require('express');

// const questionnaireController = require('../controllers/questionnaire');

// const upload = require("../middlewares/upload");
// const isAuth = require('../middlewares/authentication')
// const permit = require('../middlewares/authorization')

// const router = express.Router();

// // router.get('/:questionnaireID', questionnaireController.getQuestionnaire);

// module.exports = router;

const express = require("express");
const QuestionnaireController = require("../controllers/questionnaire");
const router = express.Router();

router.get("/:questionnaireID", QuestionnaireController.getQuestionnaire);

module.exports = router;