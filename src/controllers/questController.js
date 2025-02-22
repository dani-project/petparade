const model = require('../models/questModel.js');

//Allows users to add their own quests, requiring the reward, real life action, description and the exp points given for completing the quest
module.exports.createNewQuest = (req, res, next) => {
    if (req.body.in_game_reward == undefined || req.body.real_life_action == undefined || req.body.action_description == undefined|| req.body.experience_points == undefined) {
        res.status(400).json({
            error: 'Bad Request', message: 'In-game reward, real-life action, or experience points are missing in the request body',
        });
        return;
    }

    const data = {
        in_game_reward: req.body.in_game_reward,
        real_life_action: req.body.real_life_action,
        action_description: req.body.action_description,
        experience_points: req.body.experience_points
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            const quest_id = results.insertId;
            const dataResponse = {
                quest_id,
                ...data,
            };

            res.status(201).json(dataResponse);
        }
    };

    model.insertSingleQuest(data, callback);
};

//Retrieves all the quests that the users can take on
module.exports.getAllQuests = (req, res, next) => {
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
module.exports.getQuestById = (req, res, next) => {
    const quest_id = req.params.id;

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

    model.selectQuestById(quest_id, callback);
};

//Lets user change an aspect of the quests
module.exports.updateQuestById = (req, res, next) => {
    if (req.body.in_game_reward == undefined || req.body.real_life_action == undefined || req.body.action_description == undefined|| req.body.experience_points == undefined) {
        res.status(400).json({
            error: 'Bad Request',
            message: 'Something is missing',
        });
        return;
    }

    const data = {
        quest_id: req.params.id,
        in_game_reward: req.body.in_game_reward,
        real_life_action: req.body.real_life_action,
        action_description: req.body.action_description,
        experience_points: req.body.experience_points
    };

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: quest not found"
                });
            } else {
                res.status(200).json(data);
            }
        }
    };

    model.updateQuestById(data, callback);
};

//Removes a quest from the tables
module.exports.deleteQuestById = (req, res, next) => {
    const quest_id = req.params.id;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    error: 'Not Found',
                    message: "Error: quest not found"
                });
            } else {
                res.status(204).send(); // 204 No Content
            }
        }
    };

    model.deleteQuestById(quest_id, callback);
};