const model = require('../models/petModel.js');

// To create new pet
module.exports.createNewPet = (req, res, next) => {
    if (req.body.name == undefined || req.body.type == undefined) {
        res.status(400).json({
            error: 'Bad Request', message: 'Your pet\'s name is missing in the request body',
        });
        return;
    }

    const data = {
        type: req.body.type, // Set type equal to the provided pet_id
        name: req.body.name,
        rarity: req.body.rarity
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            const pet_id = results.insertId;
            const dataResponse = {
                pet_id,
                ...data,
            };
            //To add in pet_id on top of the data
            res.status(201).json(dataResponse);
        }
    };

    model.insertSinglePet(data, callback);
};


//To retrieve the data of all of the pets
module.exports.getAllPets = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllPets(callback);
};

//Allows the user to see all of the data of their desired pet
module.exports.getPetById = (req, res, next) => {
    const pet_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: pet not found"
                });
            } else {
                const petData = results[0];
                const dataResponse = {
                    ...petData,
                    level: petData.level
                };
                res.status(200).json(dataResponse);
            }
        }
    };

    model.selectPetById(pet_id, callback);
};


//To update the pet's info by its ID
module.exports.updatePetById = (req, res, next) => {
    if (req.body.name == undefined) {
        res.status(400).json({
            error: 'Bad Request',
            message: 'Pet\'s name is missing',
        });
        return;
    }

    const data = {
        pet_id: req.params.id,
        name: req.body.name
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: pet not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updatePetById(data, callback);
};

//To delete a pet completely from the tables
module.exports.deletePetById = (req, res, next) => {
    const pet_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: task not found"
                });
            } else {
                res.status(204).send(); // 204 No Content
            }
        }
    };

    model.deletePetById(pet_id, callback);
};

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

module.exports.addMoneys = (req, res, next) => {
    const user_id = req.body.user_id;
    const pet_id = req.body.pet_id;

    // fetch the resellPrice of the pet
    model.getPetResellPrice(pet_id, (error, rarity) => {
        if (error) {
            console.error('Error fetching resell price:', error);
            res.status(500).json({ message: 'Internal Server Error', status: 500 });
            return;
        }

        console.log("rarity of the pet being sold is " + rarity);

        let resellPrice;

        if (rarity == 'Common') {
            resellPrice = 100;
        } else if (rarity == 'Rare') {
            resellPrice = 250;
        } else if (rarity == 'Legendary') {
            resellPrice = 1500;
        } else {
            resellPrice = 25000;
        }

        console.log("resellPrice is " + resellPrice);

        // add the users money the price of the pet
        model.updateUserMoneys(user_id, resellPrice, (error, result) => {
            if (error) {
                console.error('Error adding moneys to user:', error);
                res.status(500).json({ message: 'Internal Server Error', status: 500 });
                return;
            }

            res.locals.user_id = user_id;
            res.locals.pet_id = pet_id;
            next();
        });
    });
};

module.exports.deletePetById2 = (req, res, next) => {
    const pet_id = res.locals.pet_id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: task not found"
                });
            } else {
                res.status(204).send(); // 204 No Content
            }
        }
    };

    model.deletePetById(pet_id, callback);
};

// Controller function to equip a pet
module.exports.equipPet = (req, res, next) => {
    const pet_id = req.params.id;
    const user_id = req.body.user_id;

    model.equipPet(pet_id, user_id, (error, result) => {
        if (error) {
            console.error("Error equipPet:", error);
            res.status(500).json(error);
        } else {
            console.log("Pet equipped successfully");
            next();
        }
    });
};

// Controller function to unequip other pets and update user's equipped_pet_dmg and equipped_pet_hp
module.exports.unequipOthers = (req, res, next) => {
    const pet_id = req.params.id;
    const user_id = req.body.user_id;

    model.unequipOtherPetsAndUpdateStats(pet_id, user_id, (error, result) => {
        if (error) {
            console.error("Error unequipOthers:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send("New pet equipped, and previously equipped pet is now unequipped"); // 204 No Content
            console.log("Other pets unequipped and user stats updated successfully");
        }
    });
};
