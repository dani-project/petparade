const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

//const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/', controller.createNewUser);
router.get('/leaderboard', controller.getLeaderboard);
router.get('/pets/:id', controller.getAllUserPets);
router.get('/:id', controller.readUserById);
router.get('/', controller.readAllUsers);
router.put('/:id', controller.updateUserById);
router.delete('/:id', controller.deleteUserById);

module.exports = router;