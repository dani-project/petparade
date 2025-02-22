const model = require('../models/userModel.js');

//To add new user
module.exports.createNewUser = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).json({ error: 'Bad Request', message: 'Username or Email is undefined' });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
    };

    const checkExistingUserCallback = (error, results, fields) => {
        // Check if the email already exists
        if (results.length > 0) {
            res.status(409).json({ error: 'Conflict', message: 'Email already exists' });
        } else {
            // If the email isnt registered to another user, then the user will be created
            const insertUserCallback = (error, results, fields) => {
                if (error) {
                    console.error("Error creating new user:", error);
                    res.status(500).json(error);
                } else {
                    const user_id = results.insertId;
                    const dataResponse = {
                        user_id,
                        username: data.username,
                        email: data.email,
                    };
                    res.status(201).json(dataResponse);
                }
            };

            model.insertSingle(data, insertUserCallback);
        }
    };

    model.selectByEmail(data.email, checkExistingUserCallback);
};


//Retrieves all data on every user
module.exports.readAllUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
};

//To calculate the total points a user has based on the taskProgress linked to a user
function calculateTotalPoints(user_id, callback){
    model.selectTotalPointsByUserId(user_id, (error, result) => {
        if (error) {
            callback(error);
        } else {
            //Total points will be set to 0 by default, but if a value can be calculated then it will appear
            let totalPoints;
            if (result.length > 0) {
                totalPoints = result[0].total_points;
            } else {
                totalPoints = 0;
            }
            callback(null, totalPoints);
        }
    });
};

//To retrieve specific info on a user, showing the total points earned as well
module.exports.readUserById = (req, res, next) => {
    const user_id = req.params.id;

    model.selectById(user_id, (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            const data = results[0];
            res.status(200).json(data);
        }
    });
};

//Lets users change their username or email
module.exports.updateUserById = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).json({
            message: "Error: name or email is undefined"
        });
        return;
    }
    
    const data = {
        user_id: req.params.id,
        username: req.body.username,
        email: req.body.email,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: user is not found"
                });
            }
            else res.status(201).json(data);
        }
    }

    model.updateById(data, callback);
};

//Removes user 
module.exports.deleteUserById = (req, res, next) => {
    const user_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: user is not found"
                });
            } else {
                res.status(204).send();
            }
        }
    };

    model.deleteById(user_id, callback);
};

//Allows for users to see which pets they own
module.exports.getAllUserPets = (req, res, next) => {
    const user_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllUserPets(user_id, callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
      res.status(400).json({
        message: "Error: username or password is undefined",
      });
      return;
    }
  
    const data = {
      username: req.body.username,
      password: req.body.password
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error login:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else {
          res.locals.userId = results[0].user_id;
          res.locals.username = results[0].username;
          res.locals.hash =  results[0].password;
          res.locals.message = "User " + res.locals.username + " logged in successfully.";
          next();
        }
      }
    };
  
    model.selectUserByUsername(data, callback);
  };

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    if (
      req.body.username == undefined ||
      req.body.email == undefined ||
      req.body.password == undefined
    ) {
      res.status(400).send("Error: username is undefined");
      return;
    }
  
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: res.locals.hash,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error register:", error);
        res.status(500).json(error);
      } else {
        res.locals.userId = results.insertId;
        res.locals.username = req.body.username;
        res.locals.message = "User " + req.body.username + " created successfully.";
        next();
      }
    };
  
    model.insertUser(data, callback);
  };
  

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
      res.status(400).send("Error: username or email is undefined");
      return;
    }
  
    const data = {
      username: req.body.username,
      email: req.body.email,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error checkUsernameOrEmailExist:", error);
        res.status(500).json(error);
      } else {
        if (results.length > 0) {
          res.status(409).json({
            message: "Username or email already exists",
          });
        } else next();
      }
    };
  
    model.selectUserByUsernameOrEmail(data, callback);
  }

  module.exports.getLeaderboard = (req, res, next) => {
    const callback = (error, results) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    // call model to get leaderboard
    model.getLeaderboard(callback);
};