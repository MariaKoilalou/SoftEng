const express = require("express");
//const multer = require('multer');
const QuestionnaireUpdController = require("../controllers/questionnaireupd");
//const upload = multer({ dest: 'uploads/' });
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/questionnaire_upd", upload.single('file') ,QuestionnaireUpdController.postQuestionnaireUpd);

module.exports = router;

