const express = require("express");
const resetQController = require("../controllers/resetq");
const router = express.Router();

router.post("/:questionnaireID", resetQController.deleteQuestionnaireAnswers);

module.exports = router;