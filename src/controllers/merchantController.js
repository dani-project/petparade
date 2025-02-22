const model = require('../models/merchantModel.js');

module.exports.getAllItems = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllItems(callback);
};

module.exports.getItemById = (req, res, next) => {
    const item_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: quest not found"
                });
            } else {
                const itemData = results[0];
                res.status(200).json(itemData);
            }
        }
    };

    model.selectItemById(item_id, callback);
};

//middleware to verify the existence of the item and user selected (works)
module.exports.verifyUserItemExistence = (req, res, next) => {
    if (req.body.user_id == undefined || req.body.item_id == undefined) {
        res.status(400).json({
            error: 'Bad Request', message: 'user_id or item_id is missing in the request body',
        });
        return;
    }
    const user_id = req.body.user_id;
    const item_id = req.body.item_id;

    model.verifyUserItemExistence(user_id, item_id, (results) => {
        const userResult = results[0];
        const itemResult = results[1];
        if (userResult.length == 0) {
            res.status(404).json({ message: "user not found", status: 404 });
        } else if (itemResult.length == 0) {
            res.status(404).json({ message: "item not found", status: 404 });
        } else {
            res.locals.user_id = user_id;
            res.locals.item_id = item_id;
            console.log("user_id is " + user_id);
            console.log("item_id is " + item_id);
            next();
        }
    }
    );
};

//middleware to check if the user_id's user.moneys is = or more than the item_cost of the item_id. If user has more than enough money move on, but if not then error
//and then to subtract the user_id's user.moneys by the price of item_cost
module.exports.verifyMoneys = (req, res, next) => {
    const user_id = res.locals.user_id;
    const item_id = res.locals.item_id;

    console.log('Inside verifyMoneys middleware 1');

    model.getEggCost(item_id, (errorCost, itemCost) => {
        if (errorCost) {
            console.error('Error fetching egg cost:', errorCost);
            res.status(500).json({ message: "Internal Server Error", status: 500 });
            return;
        }

        console.log('Inside verifyMoneys middleware 2');
        console.log(itemCost + " is the item's cost");

        model.getUserMoneys(user_id, (errorMoneys, results) => {
            if (errorMoneys) {
                console.error('Error fetching user moneys:', errorMoneys);
                res.status(500).json({ message: "Internal Server Error", status: 500 });
                return;
            }

            // check if results array is not empty
            if (results.length > 0) {
                const userMoneys = results[0].moneys;
                console.log("user's moneys is:", userMoneys);

                if (userMoneys >= itemCost) {
                    // deduct moneys and update user's total_pets_exp
                    model.updateUserMoneys(user_id, itemCost, (errorUpdate, updateResults) => {
                        if (errorUpdate) {
                            console.error('Error updating user moneys:', errorUpdate);
                            res.status(500).json({ message: "Internal Server Error", status: 500 });
                        } else {
                            console.log('Inside verifyMoneys middleware 4');
                            next();
                        }
                    });
                } else {
                    console.log('Inside verifyMoneys middleware 5');
                    res.status(403).json({ message: "Insufficient funds", status: 403 });
                }
            } else {
                console.log("User not found");
                res.status(404).json({ message: "User not found", status: 404 });
            }
        });
    });
};

// controller to buy item or egg
module.exports.buyEgg = (req, res, next) => {
    console.log("BUY EGG FUNCTION RUNS");
    const user_id = res.locals.user_id;
    const item_id = res.locals.item_id;

    if (isNaN(item_id) || item_id < 1 || item_id > 4) {
        res.status(400).json({
            error: 'Bad Request', message: 'Item ID must be a number between 1 and 4',
        });
        return;
    }

    let petType;
    switch (item_id) {
        case 1:
            //  common egg - 1/8 chance for each pet type (pet_id 1-8)
            petType = Math.floor(Math.random() * 8) + 1;
            break;
        case 2:
            // rare egg - 1/4 chance for each pet type (pet_id 9-12)
            petType = Math.floor(Math.random() * 4) + 9;
            break;
        case 3:
            // legendary egg - 50/50 chance for pet_id 13 or pet_id 14
            petType = Math.floor(Math.random() * 4) + 13;
            break;
        case 4:
            // mystery egg - custom probabilities
            const randomNum = Math.random();
            if (randomNum < 0.5) {
                // 50% chance for case 1
                petType = Math.floor(Math.random() * 8) + 1;
            } else if (randomNum < 0.85) {
                // 35% chance for case 2
                petType = Math.floor(Math.random() * 4) + 9;
            } else if (randomNum < 0.97) {
                // 12% chance for case 3
                petType = Math.floor(Math.random() * 2) + 13;
            } else if (randomNum < 0.993) {
                // 1% chance for petType = 17
                petType = 17;
            } else if (randomNum < 0.997) {
                // 1% chance for petType = 18
                petType = 18;
            } else {
                // 1% chance for petType = 19
                petType = 19;
            }
            break;


        default:
            res.status(400).json({
                error: 'Bad Request', message: 'Invalid item ID',
            });
            return;
    }

    const actualPetName = getPetName(petType);

    console.log('Pet Type:', petType);
    console.log("USER ID IS " + user_id);
    const data = {
        type: actualPetName,
        name: actualPetName,
        rarity: determineRarity(petType),
        user_id: user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            const pet_id = (results.insertId + 19);
            const rarity = (data.rarity);
            console.log("PET ID IS " + pet_id)
            res.locals.pet_id = pet_id; // Pass pet_id to the next middleware
            res.locals.rarity = rarity; // Pass pet_id to the next middleware
            next(); // Call next middleware
        }
    };

    model.insertSinglePet(data, callback);
};

// function to determine pet name based on pet type
function getPetName(petType) {
    switch (petType) {
        case 1: return 'Bunny';
        case 2: return 'Cat';
        case 3: return 'Dog';
        case 4: return 'Monkey';
        case 5: return 'Chicken';
        case 6: return 'Goat';
        case 7: return 'Mouse';
        case 8: return 'Pig';
        case 9: return 'Dinosaur';
        case 10: return 'Unicorn';
        case 11: return 'Phoenix';
        case 12: return 'Kitsune';
        case 13: return 'Light Dragon';
        case 14: return 'Shadow Dragon';
        case 15: return 'Ascended Cat';
        case 16: return 'Ascended Dog';
        case 17: return 'Road Blocks';
        case 18: return 'Sun God';
        case 19: return 'Berserker';
        default: return 'Unknown';
    }
}

// Helper function to determine pet rarity based on pet type
function determineRarity(petType) {
    // Adjust this logic based on your rarity distribution
    if (petType <= 8) {
        return 'Common';
    } else if (petType <= 12) {
        return 'Rare';
    } else if (petType <= 16) {
        return 'Legendary';
    } else
        return 'Secret';
}

module.exports.statDeterminer = (req, res, next) => {
    console.log("statDeterminer runs!");
    const pet_id = res.locals.pet_id; // Assuming you pass the pet_id from previous middleware
    const rarity = res.locals.rarity; // Assuming you pass the pet's rarity from previous middleware
    console.log("The pet's id is " + pet_id);
    console.log("The pet's rarity is " + rarity);

    const stats = generateRandomStats(rarity); // Function to generate random stats based on rarity

    const data = {
        pet_id: pet_id,
        dmg: stats.dmg,
        hp: stats.hp
    };
    console.log("Data sets for values are: ");

    console.log(data);

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            const dataResponse = {
                pet_id,
                ...data,
            };
            res.status(201).json(dataResponse);
        }
    };

    model.updatePetStats(data, callback);
};


function generateRandomStats(rarity) {
    let minDamage, maxDamage, minHP, maxHP, minSpeed, maxSpeed;

    // Determine stat ranges based on rarity
    switch (rarity) {
        case 'Common':
            minDamage = 1;
            maxDamage = 100;
            minHP = 1;
            maxHP = 100;
            break;
        case 'Rare':
            minDamage = 100;
            maxDamage = 200;
            minHP = 100;
            maxHP = 200;
            break;
        case 'Legendary':
            minDamage = 500;
            maxDamage = 1000;
            minHP = 500;
            maxHP = 1000;
            break;
        case 'Secret':
            minDamage = 5000;
            maxDamage = 10000;
            minHP = 5000;
            maxHP = 10000;
            break;
        default:
            minDamage = 1;
            maxDamage = 100;
            minHP = 1;
            maxHP = 100;
            break;
    }

    // Generate random stats within the determined ranges
    return {
        dmg: Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage,
        hp: Math.floor(Math.random() * (maxHP - minHP + 1)) + minHP
    };
}

