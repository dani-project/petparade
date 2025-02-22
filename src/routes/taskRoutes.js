const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskController');

router.post('/', controller.createNewTask);
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.put('/:id', controller.updateTaskById);
router.delete('/:id', controller.deleteTaskById);

module.exports = router;