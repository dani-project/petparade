const pool = require('../services/db');

//Retrieves data on all quests
module.exports.selectAllQuests = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Mission;
    `;

    pool.query(SQLSTATEMENT, callback);
};

//Retrieves a certain quest
module.exports.selectQuestById = (mission_id, callback) => {
    const SQLSTATEMENT = `
        SELECT *
        FROM Mission
        WHERE mission_id = ?;
    `;

    const VALUES = [mission_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
