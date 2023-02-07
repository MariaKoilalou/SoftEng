const express = require('express');

const doanswerController = require('../controllers/doanswer');

const upload = require("../middlewares/upload");
const isAuth = require('../middlewares/authentication')
const permit = require('../middlewares/authorization')

const router = express.Router();

router.post('/:questionnaireID/:questionID/:session/:optionID', doanswerController.postDoAnswer);