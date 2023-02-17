const express = require("express");
const resetQController = require("../controllers/resetq");
const router = express.Router();

router.get("/:questionnaireID", resetQController.deleteQuestionnaireAnswers);

module.exports = router;