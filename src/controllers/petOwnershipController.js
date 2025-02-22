const model = require('../models/petOwnershipModel.js');

//Middleware to verify that the user and the pet provided in the req body actually exists
module.exports.verifyOwnershipData = (req, res, next) => {
    const user_id = req.body.user_id;
    const pet_id = req.body.pet_id;

    model.verifyUserPetExistenceMiddleware(user_id, pet_id, (results) => {
        const userResult = results[0];
        const petResult = results[1];
        const ownershipResult = results[2];
        //To check if a pet is already linked to a user as its owner, if it is then error 409 conflict occurs
        if (ownershipResult.length > 0) {
            res.status(409).json({
                error: 'Conflict',
                message: 'Pet already linked to a user'
            });
        } else {
            
            if (userResult.length == 0) {
                res.status(404).json({ message: "user not found", status: 404 });
            } else if (petResult.length == 0) {
                res.status(404).json({ message: "pet not found", status: 404 });
            } else {
                // Proceed to the next module,which is to declare the pet and user link
                next();
            }
        }
    });
};

//To declare the link between pet and user
module.exports.createOwnership = (req, res) => {
    const data = {
        user_id: req.body.user_id,
        pet_id: req.body.pet_id
    };

    model.insertOwnership(data, (error, result) => {
        if (error) {
            return res.status(500).json(error);
        }

        const ownership_id = result.insertId;
        const dataResponse = {
            ownership_id,
            ...data,
        };

        res.status(201).json(dataResponse);
    });
};

//Retrieves all data, showing all of the links between user and pets
module.exports.getAllOwnerships = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllOwnerships(callback);
};

//Deletes the link between pets and users
module.exports.deleteOwnershipById = (req, res, next) => {
    const ownership_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: taskProgress not found"
                });
            } else {
                res.status(204).send(); // 204 No Content
            }
        }
    };

    model.deleteOwnershipById(ownership_id, callback);
};