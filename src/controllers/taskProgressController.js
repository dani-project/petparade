const model = require('../models/taskProgressModel.js');

//Middleware to verify that the user and the task actually exist
module.exports.verifyTaskProgressData = (req, res, next) => {
    const user_id = req.body.user_id;
    const task_id = req.body.task_id;
    const completion_date = req.body.completion_date;

    model.verifyTaskUserExistenceMiddleware(user_id, task_id, (results) => {
        const userResult = results[0];
        const taskResult = results[1];
        //To show the cause of error, by showing that either the user or the task doesnt exist
        if (userResult.length == 0) {
            res.status(404).json({ message: "user not found", status: 404 });
        } else if (taskResult.length == 0) {
            res.status(404).json({ message: "task not found", status: 404 });
        } else {
            if (user_id == undefined || task_id == undefined || completion_date == undefined) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: 'user_id or task_id or completion_date is missing in the request body',
                });
            } else {
                next();
            }
        }
    });
};

//To add a new task and user link
module.exports.createTaskProgress = (req, res) => {
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    };

    model.insertTaskProgress(data, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }

        const progress_id = result.insertId;
        const dataResponse = {
            progress_id,
            ...data,
        };

        res.status(201).json(dataResponse);
    });
};

//To retrieve info about a certain task and user link
module.exports.getTaskProgressById = (req, res) => {
    const progress_id = req.params.id;

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
                const taskProgress = results[0];
                res.status(200).json(taskProgress);
            }
        }
    };

    model.getTaskProgressById(progress_id, callback);
};

//To change which user is linked to which task or vice versa
module.exports.updateTaskProgressById = (req, res) => {
    if (req.body.notes == undefined) {
        return res.status(400).json({ 
            error: 'Bad Request', 
            message: 'notes is missing in the request body'
        });
    }

    const data = {
        progress_id: req.params.id,
        notes: req.body.notes
    };

    model.updateTaskProgressById(data, (error, results) => {
        if (error) {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: taskProgress not found"
                });
            } else {
                return res.status(500).json(error);
            }
        }

        model.getTaskProgressById(data.progress_id, (error, updatedTaskProgress) => {
            if (error) {
                return res.status(500).json(error);
            }
            res.status(200).json(updatedTaskProgress);
        });
    });
};

//To remove the link between task and user 
module.exports.deleteTaskProgressById = (req, res, next) => {
    const progress_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: taskProgress not found"
                });
            } else {
                res.status(204).send(); // 204 No Content
            }
        }
    };

    model.deleteTaskProgressById(progress_id, callback);
};