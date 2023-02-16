const express = require('express');

const adminController = require('../controllers/admin');

const upload = require("../middlewares/upload");

const router = express.Router();


router.post("/questionnaire_upd", upload.single('file') ,adminController.postQuestionnaireUpd);

router.post("/resetq/:questionnaireID" , adminController.postQuestionnaire);

router.get("/resetall", adminController.postReset);

router.get("/healthcheck", adminController.getHealthcheck);


module.exports = router;