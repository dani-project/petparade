const pool = require('../services/db');

//Creates new user
module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO User (username, email)
    VALUES (?, ?)
  `;
  const VALUES = [data.username, data.email];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//Selects email from the user table to see if that email already exists in the database
module.exports.selectByEmail = (email, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE email = ?;
    `;

    const VALUES = [email];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Retrieves all data on users
module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM User
  `;

  pool.query(SQLSTATEMENT, callback);
};

//Retrieves data about a user
module.exports.selectById = (user_id, callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM User
  WHERE user_id = ?
  `;

  const VALUES = [user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//To display the total_points as the sum of all the points from all the tasks linked to a userin the taskProgress table
module.exports.selectTotalPointsByUserId = (user_id, callback) => {
  const SQL_STATEMENT = `
      SELECT SUM(Task.points) AS total_points 
      FROM TaskProgress
      INNER JOIN Task ON TaskProgress.task_id = Task.task_id
      WHERE TaskProgress.user_id = ?;
  `;

  const VALUES = [user_id];

  pool.query(SQL_STATEMENT, VALUES, callback);
};

//Allows for user to change their email or username
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?, email = ?
    WHERE user_id = ?;
    `;
const VALUES = [data.username, data.email, data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
};

//Removes a user
module.exports.deleteById = (user_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM User 
        WHERE user_id = ?;
    `;

    const VALUES = [user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Lets the user retrieve data on all pets linked to a user
module.exports.selectAllUserPets = (user_id, callback) => {
  const SQLSTATEMENT = `
      SELECT * 
      FROM Pet
      LEFT JOIN PetOwnership ON Pet.pet_id = PetOwnership.pet_id
      WHERE PetOwnership.user_id = ?;
  `;

  const VALUES = [user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};


//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.selectUserByUsernameOrEmail = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM User WHERE username = ? OR email = ?`;
  const VALUES = [data.username, data.email];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertUser = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO User (username, email, password) VALUES (?, ?, ?)`;
  const VALUES = [data.username, data.email, data.password];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////
module.exports.selectUserByUsername = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM User WHERE username = ?`;
  const VALUES = [data.username];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.getLeaderboard = (callback) => {
  const SQLSTATEMENT = `
      SELECT User.*
      FROM User
      ORDER BY User.moneys DESC
      LIMIT 25;
  `;

  pool.query(SQLSTATEMENT, callback);
};