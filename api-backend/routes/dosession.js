const express = require("express");
const DosessionController = require("../controllers/dosession");
const router = express.Router();

router.get("/:questionnaireID", DosessionController.postDoSession);

module.exports = router;