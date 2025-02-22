const pool = require('../services/db');

//Middleware to verify that user and task exist, by selecting from the user and task table with the ids provided
module.exports.verifyTaskUserExistenceMiddleware = (user_id, task_id, callback) => {
    const SQL_STATEMENT = `
        SELECT *
        FROM User
        WHERE user_id = ?;

        SELECT *
        FROM Task
        WHERE task_id = ?;
    `;

    const VALUES = [user_id, task_id];

    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(results);
        }
    });
};

//Creates link between user and task
module.exports.insertTaskProgress = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?, ?, ?, ?)
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

//Retrieve data on link between user and task
module.exports.getTaskProgressById = (progress_id, callback) => {
    const SQLSTATEMENT = `
        SELECT progress_id, user_id, task_id, completion_date, notes
        FROM TaskProgress
        WHERE progress_id = ?;
    `;

    const VALUES = [progress_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
};

//Retrieves data on all links between users and tasks
module.exports.updateTaskProgressById = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE TaskProgress
        SET notes = ?
        WHERE progress_id = ?;
    `;

    const VALUES = [data.notes, data.progress_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

//Removes link between user and task
module.exports.deleteTaskProgressById = (progress_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM TaskProgress 
        WHERE progress_id = ?;
    `;
    const VALUES = [progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};