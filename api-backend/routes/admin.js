const express = require('express');

const adminController = require('../controllers/admin');

const upload = require("../middlewares/upload");
const isAuth = require('../middlewares/authentication');
const permit = require('../middlewares/authorization');

const router = express.Router();


router.post("/usermod/:username/:password", isAuth, permit('sysadmin'), adminController.postUsermod);

router.post("/questionnaire_upd", isAuth , permit('sysadmin') , upload.single('file') ,adminController.postQuestionnaireUpd);

// router.post('/login', adminController.login);

router.post("/resetq/:questionnaireID" , isAuth , permit('sysadmin') , adminController.postQuestionnaire);

router.get("/users/:username" , isAuth , permit('sysadmin') , adminController.getUser);

router.get("/resetall", isAuth, permit('sysadmin'), adminController.postReset);

router.get("/healthcheck", adminController.getHealthcheck);


module.exports = router;