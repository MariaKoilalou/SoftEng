const express = require("express");
const QuestionnaireController = require("../controllers/getallquestionnaires");
const router = express.Router();

router.get( "", QuestionnaireController.getQuestionnaire);

module.exports = router;