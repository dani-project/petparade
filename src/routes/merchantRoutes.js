const express = require('express');
const router = express.Router();

const controller = require('../controllers/merchantController');

router.post('/', controller.verifyUserItemExistence, controller.verifyMoneys, controller.buyEgg, controller.statDeterminer);
router.get('/:id', controller.getItemById);
router.get('/', controller.getAllItems);


module.exports = router;