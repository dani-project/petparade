const express = require('express');
const router = express.Router();

const controller = require('../controllers/questController');

router.post('/', controller.createNewQuest);
router.get('/:id', controller.getQuestById);
router.get('/', controller.getAllQuests);
router.put('/:id', controller.updateQuestById);
router.delete('/:id', controller.deleteQuestById);

module.exports = router;