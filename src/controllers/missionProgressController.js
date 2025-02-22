const model = require('../models/missionProgressModel.js');

//Retrieves all the quests that the users can take ons
module.exports.getAllMissionProgress = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllMissions(callback);
};

module.exports.verifyMissionUserExistence = (req, res, next) => {
    console.log("THIS WORKS LOL 1");
    const mission_id = req.body.mission_id;
    const user_id = req.body.user_id;

    model.verifyMissionUserExistenceMiddleware(mission_id, user_id, (results) => {
        console.log("THIS WORKS LOL 1.1");
        const missionResult = results[0];
        const userResult = results[1];

        // Check if the mission or user is not found
        if (missionResult.length === 0) {
            res.status(404).json({ message: "Mission not found", status: 404 });
        } else if (userResult.length === 0) {
            res.status(404).json({ message: "User not found", status: 404 });
        } else {
            if (!mission_id || !user_id) {
                res.status(400).json({
                    error: 'Bad Request',
                    message: 'mission_id or user_id is missing in the request body',
                });
            } else {
                res.locals.mission_id = mission_id;
                res.locals.user_id = user_id;
                console.log("verifyMissionUserExistence executed");
                console.log(res.locals); // Log the values
                next();
            }
        }
    });
};

module.exports.postMissionProgress = (req, res, next) => {
    console.log("THIS WORKS LOL 2");

    const user_id = res.locals.user_id;
    const mission_id = res.locals.mission_id;
    console.log("user_id", user_id);
    console.log("mission_id", mission_id);

    // Fetch the experience_points and moneys from the mission
    model.fetchMissionData(mission_id, (missionData) => {
        const experience_points = missionData.experience_points;
        const moneys = missionData.moneys;

        // Set experience_points and moneys in res.locals
        res.locals.experience_points = experience_points;
        res.locals.moneys = moneys;

        console.log("Experience Points:", experience_points);
        console.log("Moneys:", moneys);

        // Proceed to check mission requirements
        model.checkMissionRequirements(user_id, mission_id, (results) => {
            const mission = results[0][0]; // Access the first element of the array
            const dmgReq = mission.dmg_req;
            const hpReq = mission.hp_req;

            const user = results[1][0]; // Access the first element of the array
            const equippedPetDmg = user.equipped_pet_dmg;
            const equippedPetHp = user.equipped_pet_hp;

            console.log("Mission:", mission);
            console.log("User:", user);

            const data = {
                user_id: res.locals.user_id,
                mission_id: res.locals.mission_id
            }

            // Check if the equipped pet's damage and health meet mission requirements
            if (equippedPetDmg >= dmgReq && equippedPetHp >= hpReq) {
                console.log("Equipped pet meets mission requirements");

                // If requirements are met, proceed to post to MissionProgress table
                model.postToMissionProgress(data, (result) => {
                    console.log("Mission progress posted successfully");
                    next();
                });
            } else {
                console.log("Equipped pet does not meet mission requirements");

                // If the equipped pet is too weak, return an error response
                res.status(400).json({
                    error: 'Bad Request',
                    message: 'Equipped pet is too weak',
                });
            }
        });
    });
};

// Middleware to update pet's total_exp and user's moneys
module.exports.updateMoneysExp = (req, res, next) => {
    const experience_points = res.locals.experience_points;
    const moneys = res.locals.moneys;
    const user_id = res.locals.user_id;

    // Calculate the level increment based on experience_points
    const levelIncrement = Math.floor(experience_points / 100);

    const data = {
        total_exp_change: experience_points,
        level_increment: levelIncrement,
        moneys_change: moneys,
        user_id: user_id
    };

    model.updatePetAndUser(data, (error, results) => {
        if (error) {
            console.error("Error updateMoneysExp:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({ message: "Your pet emerged victorious! Good job!" });
            console.log("Pet's total_exp and User's moneys updated successfully");
        }
    });
};

