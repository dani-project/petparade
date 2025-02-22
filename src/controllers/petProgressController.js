const model = require('../models/petProgressModel.js');

//Middleware to verify that the pet and the quest actually exist
module.exports.verifyPetQuestExistenceMiddleware = (req, res, next) => {
    console.log("THIS WORKS LOL 1");
    const pet_id = req.body.pet_id;
    const quest_id = req.body.quest_id;

    model.verifyPetQuestExistenceMiddleware(pet_id, quest_id, (results) => {
        const petResult = results[0];
        const questResult = results[1];
        //Check if the pet is not found or if the quest is not found
        if (petResult.length == 0) {
            res.status(404).json({ message: "pet not found", status: 404 });
        } else if (questResult.length == 0) {
            res.status(404).json({ message: "quest not found", status: 404 });
        } else {
            if (pet_id == undefined || quest_id == undefined ) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: 'pet_id or quest_id is missing in the request body',
                });
            } else {
                res.locals.pet_id = pet_id;
                res.locals.quest_id = quest_id;
                res.locals.experience_points = questResult[0].experience_points; // Add this line
                console.log("verifyPetProgressData executed");
                console.log(res.locals); // Log the values
                next();
                //Proceed to record the quests that are linked to the pet
            }
        }
    });
};

//Records down the quests that are linked to a pet
module.exports.createNewPetProgress = (req, res, next) => {
    console.log("THIS WORKS LOL 2");
    if (req.body.pet_id == undefined || req.body.quest_id == undefined) {
        res.status(400).json({
            error: 'Bad Request', message: 'pet_id or quest_id is missing in the request body',
        });
        return;
    }

    const data = {
        pet_id: req.body.pet_id,
        quest_id: req.body.quest_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            const petProgress_id = results.insertId;
            const dataResponse = {
                petProgress_id,
                ...data,
            };

            res.status(201).json(dataResponse);
        }
    };
    next();

    model.insertSinglePetProgress(data, callback);
};

module.exports.updatePetMiddleware = (req, res, next) => {
    console.log(res.locals);
    console.log("THIS WORKS LOL 3");
    const data = {
        total_exp_change: res.locals.experience_points, // Update this line
        pet_id: res.locals.pet_id
    };
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePetMiddleware:", error);
            res.status(500).json(error);
        }
    };
  
    model.updatePetData(data, callback);
};

//Shows all quests that are linked to pets
module.exports.getAllPetProgress = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllPetProgress(callback);
};

//Deletes the link between pets and quests from the tables
module.exports.deletePetProgressById = (req, res, next) => {
    const pet_progress_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: pet progress id not found"
                });
            } else {
                res.status(204).send(); // 204 No Content
            }
        }
    };

    model.deletePetProgressById(pet_progress_id, callback);
};