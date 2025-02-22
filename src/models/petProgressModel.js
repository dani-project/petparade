const pool = require('../services/db');

//Basically just selects everything from the quest and pet tables to see if the quest_id and pet_id given actually exist in the table
module.exports.verifyPetQuestExistenceMiddleware = (pet_id, quest_id, callback) => {
    const SQL_STATEMENT = `
        SELECT *
        FROM Pet
        WHERE pet_id = ?;

        SELECT *
        FROM Quest
        WHERE quest_id = ?;
    `;

    const VALUES = [pet_id, quest_id];

    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(results);
        }
    });
};

//Creates link between pet and quests
module.exports.insertSinglePetProgress = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO PetProgress (pet_id, quest_id, completion_date, quest_action, quest_reward, experience_points)
        SELECT ?, ?, CURRENT_TIMESTAMP, real_life_action, in_game_reward, experience_points
        FROM Quest
        WHERE quest_id = ?;
    `;

    const VALUES = [data.pet_id, data.quest_id, data.quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};



//Retrieves all links between pets and quests and even shows reward and points from quest
module.exports.selectAllPetProgress = (callback) => {
    const SQLSTATEMENT = `
    SELECT PetProgress.*, Quest.in_game_reward, Quest.experience_points
    FROM PetProgress
    INNER JOIN Quest ON PetProgress.quest_id = Quest.quest_id;
    `;

    pool.query(SQLSTATEMENT, callback);
};

//Removes the link between quests and pets
module.exports.deletePetProgressById = (pet_progress_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM PetProgress
        WHERE pet_progress_id = ?;
    `;

    const VALUES = [pet_progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updatePetData = (data, callback) => {
    const SQLSTATEMENT = `
      UPDATE Pet
      SET total_exp = total_exp + ?,
      level = FLOOR(total_exp / 100),
      exp_left_to_level_up = (FLOOR((total_exp / 100) + 1) * 100) - total_exp,
      dmg = dmg * 1.1,
      hp = hp * 1.1
      WHERE pet_id = ?;
      
      UPDATE User 
      SET total_pets_exp = (
        SELECT SUM(Pet.total_exp)
        FROM PetOwnership 
        JOIN Pet ON PetOwnership.pet_id = Pet.pet_id
        WHERE PetOwnership.user_id = User.user_id
      ),
      moneys = (
        SELECT SUM(Pet.total_exp)
        FROM PetOwnership 
        JOIN Pet ON PetOwnership.pet_id = Pet.pet_id
        WHERE PetOwnership.user_id = User.user_id
      )
      WHERE User.user_id IN (
        SELECT user_id
        FROM PetOwnership
        WHERE pet_id = ?
      );
    `;
  
    const VALUES = [data.total_exp_change, data.pet_id, data.pet_id];
  
    pool.query(SQLSTATEMENT, VALUES, callback);
};
