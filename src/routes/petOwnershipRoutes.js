const express = require('express');
const router = express.Router();

const controller = require('../controllers/petOwnershipController');

router.post('/', controller.verifyOwnershipData, controller.createOwnership);
router.get('/', controller.getAllOwnerships);
router.delete('/:id', controller.deleteOwnershipById);

module.exports = router;