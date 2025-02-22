const pool = require('../services/db');

//Create quest
module.exports.insertSingleQuest = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO Quest (in_game_reward, real_life_action, action_description, experience_points)
        VALUES (?, ?, ?, ?);
    `;

    const VALUES = [data.in_game_reward, data.real_life_action, data.action_description, data.experience_points];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

//Retrieves data on all quests
module.exports.selectAllQuests = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Quest;
    `;

    pool.query(SQLSTATEMENT, callback);
};

//Retrieves a certain quest
module.exports.selectQuestById = (quest_id, callback) => {
    const SQLSTATEMENT = `
        SELECT quest_id, in_game_reward, real_life_action, action_description, experience_points
        FROM Quest
        WHERE quest_id = ?;
    `;

    const VALUES = [quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Allows for changes to be made to the quests
module.exports.updateQuestById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Quest 
        SET in_game_reward = ?, real_life_action = ?, action_description = ?, experience_points = ?
        WHERE quest_id = ?;
    `;

    const VALUES = [data.in_game_reward, data.real_life_action, data.action_description, data.experience_points, data.quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Removes quest
module.exports.deleteQuestById = (quest_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Quest
        WHERE quest_id = ?;
    `;

    const VALUES = [quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};