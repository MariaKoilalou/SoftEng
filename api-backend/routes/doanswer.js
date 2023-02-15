const express = require("express");
const doanswerController = require("../controllers/doanswer");
const router = express.Router();

router.post("/:questionnaireID/:questionID/:session/:optionID", doanswerController.postDoAnswer);

module.exports = router;