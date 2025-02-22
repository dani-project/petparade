const pool = require('../services/db');

//Retrieves data on all quests
module.exports.selectAllMissions = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM MissionProgress;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// Middleware to verify the existence of a pet, user, and mission
module.exports.verifyMissionUserExistenceMiddleware = (mission_id, user_id, callback) => {
    const SQL_STATEMENT = `
        SELECT *
        FROM Mission
        WHERE mission_id = ?;

        SELECT *
        FROM User
        WHERE user_id = ?;

    `;

    const VALUES = [mission_id, user_id];

    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(results);
        }
    });
};


module.exports.checkMissionRequirements = (user_id, mission_id, callback) => {
    const SQL_STATEMENT = `
        SELECT dmg_req, hp_req
        FROM Mission
        WHERE mission_id = ?;

        SELECT equipped_pet_dmg, equipped_pet_hp
        FROM User
        WHERE user_id = ?;

    `;

    const VALUES = [mission_id, user_id];

    // Execute the SQL query using the database pool
    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            // If an error occurs, log the error
            console.error("Error in checkMissionRequirements:", error);
            // Pass the error to the callback function
            callback(error);
        } else {
            // Log the retrieved results
            console.log("Results in checkMissionRequirements:", results);
            // Pass the results to the callback function
            callback(results);
        }
    });
};


// Post mission progress to MissionProgress table
module.exports.postToMissionProgress = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO MissionProgress (user_id, mission_id, completion_date)
        VALUES (?, ?, CURRENT_TIMESTAMP);
    `;

    const VALUES = [data.user_id, data.mission_id];

    // Execute the SQL query using the database pool
    pool.query(SQL_STATEMENT, VALUES, (error, result) => {
        if (error) {
            // If an error occurs, pass it to the callback function
            callback(error);
        } else {
            // If the query is successful, pass the result to the callback function
            callback(result);
        }
    });
};

// Function to fetch mission data based on mission_id
module.exports.fetchMissionData = (mission_id, callback) => {
    const SQL_STATEMENT = `
        SELECT experience_points, moneys
        FROM Mission
        WHERE mission_id = ?;
    `;

    pool.query(SQL_STATEMENT, [mission_id], (error, results) => {
        if (error) {
            console.error("Error fetching mission data:", error);
            callback(error);
        } else {
            if (results.length > 0) {
                const missionData = results[0];
                callback(missionData);
            } else {
                console.error("Mission not found");
                callback("Mission not found");
            }
        }
    });
};

module.exports.updatePetAndUser = (data, callback) => {
    const SQL_STATEMENT = `
        UPDATE Pet
        SET total_exp = LEAST(total_exp + ?, 500000000),
            level = CASE 
                WHEN dmg >= 500000000 OR hp >= 500000000 THEN level 
                WHEN level <= 100 THEN FLOOR(total_exp / 100) 
                ELSE level 
            END,
            exp_left_to_level_up = LEAST((FLOOR((total_exp / 100) + 1) * 100) - total_exp, 100),
            dmg = LEAST(
                CASE 
                    WHEN level <= 100 THEN dmg * POWER(1.10, ?)
                    ELSE dmg * POWER(1.01, ?)
                END,
                500000000
            ),
            hp = LEAST(hp * POWER(1.01, ?), 500000000)
        WHERE pet_id = (SELECT equipped_pet_id FROM User WHERE user_id = ?);

        UPDATE User
        SET moneys = moneys + ?,
            total_pets_exp = total_pets_exp + ?,
            equipped_pet_dmg = LEAST(equipped_pet_dmg * POWER(1.01, ?), 500000000),
            equipped_pet_hp = LEAST(equipped_pet_hp * POWER(1.01, ?), 500000000)
        WHERE user_id = ?;
    `;

    const VALUES = [
        data.total_exp_change, // Increase pet's total_exp by the experience_points of the mission
        data.level_increment, // Increase pet's level by levelIncrement
        data.level_increment, // Increase dmg and hp by 1.1x per level
        data.level_increment, // Increase dmg and hp by 1.1x per level
        data.user_id, // Use user_id to retrieve equipped_pet_id
        data.moneys_change, // Increase user's moneys by the moneys of the mission
        data.total_exp_change, // Increase user's total_exp by the experience_points of the mission
        data.level_increment, // Increase equipped_pet_dmg and equipped_pet_hp by 1.1x per level
        data.level_increment, // Increase equipped_pet_dmg and equipped_pet_hp by 1.1x per level
        data.user_id // Use user_id to update moneys for the correct user
    ];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

