const express = require("express");
const DoanswerController = require("../controllers/doanswer");
const router = express.Router();

router.get("/:questionnaireID/:questionID/:sessionID/:optionID", DoanswerController.postDoAnswer);

module.exports = router;