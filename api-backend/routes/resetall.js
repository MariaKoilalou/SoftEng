const express = require("express");
const resetAllController = require("../controllers/resetall");
const router = express.Router();

router.get("", resetAllController.ResetAll);

module.exports = router;