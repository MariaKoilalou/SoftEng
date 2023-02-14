const express = require('express');

const sessionController = require('../controllers/getsessionanswers');

const upload = require("../middlewares/upload");
const isAuth = require('../middlewares/authentication')
const permit = require('../middlewares/authorization')

const router = express.Router();

router.get('/:questionnaireID/:session', sessionController.getSession);

module.exports = router;