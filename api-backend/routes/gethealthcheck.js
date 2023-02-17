const express = require("express");
const HealthcheckController = require("../controllers/gethealthcheck");
const router = express.Router();

router.get( "", HealthcheckController.getHealthcheck);

module.exports = router;