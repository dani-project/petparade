const pool = require('../services/db');

//Creates task
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?);
    `;

    const VALUES = [data.title, data.description, data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Retrieves data on all tasks
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Task;
    `;

    pool.query(SQLSTATEMENT, callback);
};

//Retrieves data of a task
module.exports.selectById = (task_id, callback) => {
    const SQLSTATEMENT = `
        SELECT task_id, title, description, points
        FROM Task
        WHERE task_id = ?;
    `;

    const VALUES = [task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Allows for changes to be made about a task
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Task 
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?;
    `;

    const VALUES = [data.title, data.description, data.points, data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Removes a task
module.exports.deleteById = (task_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Task
        WHERE task_id = ?;
    `;

    const VALUES = [task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};