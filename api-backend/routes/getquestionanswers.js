const express = require("express");
const answerController = require("../controllers/getquestionanswers");
const router = express.Router();

router.get("/:questionnaireID/:questionID", answerController.getQuestionAnswers);

module.exports = router;