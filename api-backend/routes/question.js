const express = require("express");
const QuestionController = require("../controllers/question");
const router = express.Router();

router.get("/:questionnaireID/:questionID", QuestionController.getQuestion);

module.exports = router;