const express = require("express");
const sessionController = require("../controllers/getsessionanswers");
const router = express.Router();

router.get("/:questionnaireID/:session", sessionController.getSessionAnswers);

module.exports = router;