const pool = require('../services/db'); 

//Basically just selects everything from the user, pet and pet ownership tables to see if the user_id and pet_id given actually exist in the table
module.exports.verifyUserPetExistenceMiddleware = (user_id, pet_id, callback) => {
    const SQL_STATEMENT = `
        SELECT *
        FROM User
        WHERE user_id = ?;

        SELECT *
        FROM Pet
        WHERE pet_id = ?;
        
        SELECT *
        FROM PetOwnership
        WHERE pet_id = ?;
    `;

    const VALUES = [user_id, pet_id, pet_id];

    pool.query(SQL_STATEMENT, VALUES, (error, results) => {
        if (error) {
            callback(error);
        } else {
            callback(results);
        }
    });
};

//Creates link between user and pet
module.exports.insertOwnership = (data, callback) => {
    const SQL_STATEMENT = `
        INSERT INTO PetOwnership (user_id, pet_id)
        VALUES (?, ?)
    `;
    const VALUES = [data.user_id, data.pet_id];

    pool.query(SQL_STATEMENT, VALUES, callback);
};

//Retrieves the data of all user and pet links
module.exports.selectAllOwnerships = (callback) => {
    const SQLSTATEMENT = `
        SELECT PetOwnership.ownership_id, User.user_id AS user_id, User.username AS owner_username, Pet.pet_id AS pet_id, Pet.type AS pet_type, Pet.name AS pet_name
        FROM PetOwnership
        LEFT JOIN User ON PetOwnership.user_id = User.user_id
        LEFT JOIN Pet ON PetOwnership.pet_id = Pet.pet_id;
    `;

    pool.query(SQLSTATEMENT, callback);
};

//Removes link between user and pets
module.exports.deleteOwnershipById = (ownership_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM PetOwnership 
        WHERE ownership_id = ?;
    `;
    const VALUES = [ownership_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};