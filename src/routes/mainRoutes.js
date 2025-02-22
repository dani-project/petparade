const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const taskProgressRoutes = require('./taskProgressRoutes');
const petRoutes = require('./petRoutes');
const questRoutes = require('./questRoutes');

const missionRoutes = require('./missionRoutes');
const missionProgressRoutes = require('./missionProgressRoutes');

const petOwnershipRoutes = require('./petOwnershipRoutes');
const petProgressRoutes = require('./petProgressRoutes');
const merchantRoutes = require('./merchantRoutes.js');
const messageRoutes = require('./messageRoutes.js');

const exampleController = require('../controllers/exampleController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController');

router.use("/users", userRoutes );
router.use("/tasks", taskRoutes );
router.use("/task_progress", taskProgressRoutes );
router.use("/pets", petRoutes );
router.use("/quests", questRoutes);

router.use("/missions", missionRoutes);
router.use("/mission_progress", missionProgressRoutes);

router.use("/pet_ownerships", petOwnershipRoutes);
router.use("/pet_progress", petProgressRoutes);
router.use("/merchant", merchantRoutes);
router.use("/message", messageRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

module.exports = router;