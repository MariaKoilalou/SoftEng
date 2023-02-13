const express = require('express');

const adminController = require('../controllers/admin');

const upload = require("../middlewares/upload");
const isAuth = require('../middlewares/authentication');
const permit = require('../middlewares/authorization');

const router = express.Router();


router.post('/usermod/:username/:password', isAuth, permit('sysadmin'), adminController.postUsermod); //this doesnt work

router.post('/questionnaire_upd', isAuth , permit('sysadmin') , upload.single('file') ,adminController.postQuestionnaireUpd); //this doesnt work

router.post('/login', adminController.login); //this doesnt work

router.post('/resetq/:questionnaireID' , isAuth , permit('sysadmin') , adminController.postQuestionnaire); //this doesnt work

router.get('/users/:username' , isAuth , permit('sysadmin') , adminController.getUser);

router.get('/resetall', isAuth, permit('sysadmin'), adminController.postReset);

router.get('/healthcheck', adminController.getHealthcheck);


module.exports = router;