const express = require("express");
const QuestionnaireController = require("../controllers/questionnaire");
const router = express.Router();

router.get("/:questionnaireID", QuestionnaireController.getQuestionnaire);

module.exports = router;