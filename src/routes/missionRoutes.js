const express = require('express');
const router = express.Router();

const controller = require('../controllers/missionController');

router.get('/:id', controller.getMissionById);
router.get('/', controller.getAllMissions);

module.exports = router;