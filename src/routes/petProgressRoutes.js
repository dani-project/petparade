const express = require('express');
const router = express.Router();

const controller = require('../controllers/petProgressController');

router.post('/', controller.verifyPetQuestExistenceMiddleware, controller.createNewPetProgress, controller.updatePetMiddleware);
router.get('/', controller.getAllPetProgress);
router.delete('/:id', controller.deletePetProgressById);

module.exports = router;