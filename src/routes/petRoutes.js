const express = require('express');
const router = express.Router();

const controller = require('../controllers/petController');

router.post('/', controller.createNewPet);
router.get('/leaderboard', controller.getLeaderboard);
router.get('/:id', controller.getPetById);
router.get('/', controller.getAllPets);
router.put('/:id', controller.updatePetById);

router.delete('/sell', controller.addMoneys, controller.deletePetById2);
router.delete('/:id', controller.deletePetById);

router.put('/equip/:id', controller.equipPet, controller.unequipOthers)

module.exports = router;