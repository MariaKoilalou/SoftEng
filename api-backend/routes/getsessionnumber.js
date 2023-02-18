const express = require("express");
const sessionNumberController = require("../controllers/getsessionnumber");
const router = express.Router();

router.get("/:questionnaireID", sessionNumberController.getSessionNumber);

module.exports = router;