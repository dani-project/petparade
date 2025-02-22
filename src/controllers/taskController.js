const model = require('../models/taskModel.js');

//To create a new task for the user to do, taking a title and description and points through the req body
module.exports.createNewTask = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            error: 'Bad Request', message: 'Title, description, or points is missing in the request body',
        });
        return;
    }

    const data = {
        title : req.body.title,
        description: req.body.description,
        points : req.body.points,
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            const task_id = results.insertId;
            const dataResponse = {
                task_id,
                ...data,
            };

            res.status(201).json(dataResponse);
        }
    };

    model.insertSingle(data, callback);
};

//Retrieves all data regarding the tasks
module.exports.getAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAll(callback);
};

//Retrieves desired task's info
module.exports.getTaskById = (req, res, next) => {
    const task_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: task not found"
                });
            } else {
                const task = results[0];
                res.status(200).json(task);
            }
        }
    };

    model.selectById(task_id, callback);
};

//Allows user to change something about a task
module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            error: 'Bad Request',
            message: 'Title or description or points is missing',
        });
        return;
    }

    const data = {
        task_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: task not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updateById(data, callback);
};

//Removes task from table
module.exports.deleteTaskById = (req, res, next) => {
    const task_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: task not found"
                });
            } else {
                res.status(204).send(); // 204 No Content
            }
        }
    };

    model.deleteById(task_id, callback);
};