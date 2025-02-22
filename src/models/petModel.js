const pool = require('../services/db');

//Makes the current time into the pet's birthday
module.exports.insertSinglePet = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Pet (type, name, birthday, rarity)
        VALUES (?, ?, CURRENT_TIMESTAMP, ?);
    `;

    const VALUES = [data.type, data.name, data.rarity];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Modify selectAllPets function
module.exports.selectAllPets = (callback) => {
    const SQLSTATEMENT = `
        SELECT Pet.*
        FROM Pet
        LEFT JOIN PetProgress ON Pet.pet_id = PetProgress.pet_id
        GROUP BY Pet.pet_id, Pet.type, Pet.rarity, Pet.name, Pet.birthday;
    `;
    pool.query(SQLSTATEMENT, callback);
};

// Modify selectPetById function
module.exports.selectPetById = (pet_id, callback) => {
    const SQLSTATEMENT = `
        SELECT Pet.*,
        User.user_id AS owner_id,
        User.username AS owner_username
        FROM Pet
        LEFT JOIN PetOwnership ON Pet.pet_id = PetOwnership.pet_id
        LEFT JOIN User ON PetOwnership.user_id = User.user_id
        WHERE Pet.pet_id = ?
        GROUP BY Pet.pet_id, Pet.type, Pet.name, Pet.birthday, User.user_id, User.username;
    `;

    const VALUES = [pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};



//Retrieves exp from quests that are linked to pets, allows for the calculation of total exp of the pets
module.exports.selectLinkedQuests = (pet_id, callback) => {
    const SQL_STATEMENT = `
        SELECT Quest.experience_points
        FROM Quest
        INNER JOIN PetOwnership ON PetOwnership.pet_id = ?
        INNER JOIN PetProgress ON PetProgress.pet_id = PetOwnership.pet_id
        WHERE Quest.quest_id = PetProgress.quest_id;
    `;

    const VALUES = [pet_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

//Allows users to change name or type of their pets
module.exports.updatePetById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Pet 
        SET name = ?
        WHERE pet_id = ?;
    `;

    const VALUES = [data.name, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Removes pet
module.exports.deletePetById = (pet_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Pet
        WHERE pet_id = ?;
    `;

    const VALUES = [pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.getLeaderboard = (callback) => {
    const SQLSTATEMENT = `
        SELECT Pet.*, User.username AS owner_username
        FROM Pet
        JOIN PetOwnership ON Pet.pet_id = PetOwnership.pet_id
        JOIN User ON PetOwnership.user_id = User.user_id
        ORDER BY Pet.dmg DESC
        LIMIT 25;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.getPetResellPrice = (pet_id, callback) => {
    const SQL_STATEMENT = `
        SELECT rarity
        FROM Pet
        WHERE pet_id = ?;
    `;

    const VALUES = [pet_id];

    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            console.error('Error fetching pet resell price:', error);
            callback(error);
        } else {
            const rarity = results.length > 0 ? results[0].rarity : 0;
            callback(null, rarity);
        }
    });
};

module.exports.updateUserMoneys = (user_id, resellPrice, callback) => {
    const SQLSTATEMENT = `
        UPDATE User
        SET moneys = moneys + ?
        WHERE user_id = ?;
    `;
    const VALUES = [resellPrice, user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
    console.log("moneys added to user is " + resellPrice);
};

// Model function to equip a pet
module.exports.equipPet = (pet_id, user_id, callback) => {
    const SQL_STATEMENT = `
        UPDATE Pet
        SET status = 'Equipped'
        WHERE pet_id = ?;

        UPDATE User
        SET equipped_pet_id = ?,
            equipped_pet_dmg = (SELECT dmg FROM Pet WHERE pet_id = ?),
            equipped_pet_hp = (SELECT hp FROM Pet WHERE pet_id = ?)
        WHERE user_id = ?;
    `;

    const VALUES = [pet_id, pet_id, pet_id, pet_id, user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

// Model function to unequip other pets and update user's equipped_pet_id, equipped_pet_dmg, and equipped_pet_hp
module.exports.unequipOtherPetsAndUpdateStats = (pet_id, user_id, callback) => {
    const SQL_STATEMENT = `
        UPDATE Pet
        SET status = 'Unequipped'
        WHERE pet_id != ?;

        UPDATE User
        SET equipped_pet_dmg = (SELECT dmg FROM Pet WHERE pet_id = (SELECT pet_id FROM Pet WHERE status = 'Equipped' LIMIT 1)),
            equipped_pet_hp = (SELECT hp FROM Pet WHERE pet_id = (SELECT pet_id FROM Pet WHERE status = 'Equipped' LIMIT 1))
        WHERE user_id = ?;
    `;

    const VALUES = [pet_id, user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};
