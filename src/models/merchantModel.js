const pool = require('../services/db');

module.exports.selectAllItems = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Merchant
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectItemById = (item_id, callback) => {
    const SQLSTATEMENT = `
        SELECT * 
        FROM Merchant
        WHERE item_id = ?;
    `;

    const VALUES = [item_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.verifyUserItemExistence = (user_id, item_id, callback) => {
    const SQL_STATEMENT = `
        SELECT *
        FROM User
        WHERE user_id = ?;
        
        SELECT *
        FROM Merchant
        WHERE item_id = ?;
    `;

    const VALUES = [user_id, item_id];

    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(results);
        }
    });
};

//////

module.exports.getEggCost = (item_id, callback) => {
    const SQL_STATEMENT = `
        SELECT item_cost
        FROM Merchant
        WHERE item_id = ?;
    `;

    const VALUES = [item_id];

    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            console.error('Error fetching egg cost:', error);
            callback(error);
        } else {
            const itemCost = results.length > 0 ? results[0].item_cost : 0;
            callback(null, itemCost);
        }
    });
};

module.exports.getUserMoneys = (user_id, callback) => {
    const SQL_STATEMENT = `
        SELECT moneys
        FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [user_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
    console.log("user money was retrieved")
    console.log("user's moneys is: " + user_id.moneys);
};

module.exports.updateUserMoneys = (user_id, itemCost, callback) => {
    const SQL_STATEMENT = `
        UPDATE User
        SET moneys = CASE WHEN moneys - ? < 0 THEN 0 ELSE moneys - ? END
        WHERE user_id = ?;
    `;
    const VALUES = [itemCost, itemCost, user_id];
    console.log("VALUES array:", VALUES);

    pool.query(SQL_STATEMENT, VALUES, callback);
    console.log("Money was deducted");
};



//////

module.exports.insertSinglePet = (data, callback) => {
    const insertPetSQL = `
        INSERT INTO Pet (type, name, birthday, rarity, status)
        VALUES (?, ?, CURRENT_TIMESTAMP, ?, 'Unequipped');
    `;

    const VALUES= [data.type, data.name, data.rarity];

    pool.query(insertPetSQL, VALUES, (error, petResult) => {
        if (error) {
            callback(error, null, null);
        } else {
            const pet_id = petResult.insertId;
            module.exports.insertPetOwnership(pet_id, data.user_id, callback);
        }
    });
};

module.exports.insertPetOwnership = (pet_id, user_id, callback) => {
    const ownershipSQL = `
        INSERT INTO PetOwnership (pet_id, user_id)
        VALUES (?, ?);
    `;

    const ownershipValues = [pet_id, user_id];

    pool.query(ownershipSQL, ownershipValues, callback);
};


////

module.exports.updatePetStats = (data, callback) => {
    const updateStatsSQL = `
        UPDATE Pet
        SET dmg = ?, hp = ?
        WHERE pet_id = ?;
    `;

    const VALUES = [data.dmg, data.hp, data.pet_id];

    pool.query(updateStatsSQL, VALUES, callback);
    console.log("stats created and updated");
    console.log(VALUES);
};
