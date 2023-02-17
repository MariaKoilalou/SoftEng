const express = require("express");
const optionController = require("../controllers/getquestionoptions");
const router = express.Router();

router.get("/:questionnaireID/:questionID", optionController.getQuestionOptions);

module.exports = router;