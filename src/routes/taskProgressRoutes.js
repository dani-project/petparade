const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskProgressController');

router.post('/', controller.verifyTaskProgressData, controller.createTaskProgress);
router.get('/:id', controller.getTaskProgressById);
router.put('/:id', controller.updateTaskProgressById);
router.delete('/:id', controller.deleteTaskProgressById);

module.exports = router;