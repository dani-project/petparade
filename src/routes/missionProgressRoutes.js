const express = require('express');
const router = express.Router();

const controller = require('../controllers/missionProgressController');

router.get('/', controller.getAllMissionProgress);
router.post('/',controller.verifyMissionUserExistence, controller.postMissionProgress, controller.updateMoneysExp)

module.exports = router;