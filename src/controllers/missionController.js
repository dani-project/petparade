const model = require('../models/missionModel.js');

//Retrieves all the quests that the users can take on
module.exports.getAllMissions = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };

    model.selectAllQuests(callback);
};

//To retrieve a certain quest desired by user
module.exports.getMissionById = (req, res, next) => {
    const mission_id = req.params.id;

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
                const questData = results[0];
                res.status(200).json(questData);
            }
        }
    };

    model.selectQuestById(mission_id, callback);
};
