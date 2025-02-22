const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS Pet;
DROP TABLE IF EXISTS PetType;
DROP TABLE IF EXISTS Quest;
DROP TABLE IF EXISTS PetOwnership;
DROP TABLE IF EXISTS PetProgress;
DROP TABLE IF EXISTS Merchant;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Mission;
DROP TABLE IF EXISTS MissionProgress;

CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT,
  email TEXT,
  password TEXT,
  total_pets_exp INT DEFAULT 0,
  moneys INT DEFAULT 100,
  equipped_pet_id INT,
  equipped_pet_dmg INT DEFAULT 0,
  equipped_pet_hp INT DEFAULT 0
);

CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  points INT
);

CREATE TABLE TaskProgress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

CREATE TABLE Pet (
  pet_id INT PRIMARY KEY AUTO_INCREMENT,
  type TEXT,
  rarity TEXT,
  name TEXT,
  birthday TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_exp INT DEFAULT 0,
  level INT DEFAULT 1,
  exp_left_to_level_up INT DEFAULT 100,
  dmg INT DEFAULT 0,
  hp INT DEFAULT 0,
  status TEXT 
);

CREATE TABLE Quest (
  quest_id INT PRIMARY KEY AUTO_INCREMENT,
  in_game_reward TEXT,
  real_life_action TEXT,
  action_description TEXT,
  experience_points INT
);

CREATE TABLE Mission (
  mission_id INT PRIMARY KEY AUTO_INCREMENT,
  mission_name TEXT,
  dmg_req INT,
  hp_req INT,
  experience_points INT,
  moneys INT
);

CREATE TABLE MissionProgress (
  mission_progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  mission_id INT NOT NULL,
  completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PetOwnership (
  ownership_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  pet_id INT NOT NULL
);

CREATE TABLE PetProgress (
  pet_progress_id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  quest_id INT NOT NULL,
  quest_action TEXT,
  quest_reward TEXT,
  completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  experience_points INT
);

CREATE TABLE Merchant (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  item_name TEXT,
  item_cost INT NOT NULL,
  description TEXT
);

CREATE TABLE Messages ( 
  id INT PRIMARY KEY AUTO_INCREMENT, 
  message_text TEXT NOT NULL, 
  username TEXT NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO Task (title, description, points) VALUES
('Plant a Tree', 'Plant a tree in your neighborhood or a designated green area.', 50),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

INSERT INTO Pet (type, rarity) VALUES 
('Bunny', 'Common'),
('Cat', 'Common'),
('Dog', 'Common'),
('Monkey', 'Common'),
('Chicken', 'Common'),
('Goat', 'Common'),
('Mouse', 'Common'),
('Pig', 'Common'),
('Dinosaur', 'Rare'),
('Unicorn', 'Rare'),
('Phoenix', 'Rare'),
('Kitsune', 'Rare'),
('Light Dragon', 'Legendary'),
('Shadow Dragon', 'Legendary'),
('Ascended Cat', 'Legendary'),
('Ascended Dog', 'Legendary'),
('Road Blocks', 'Secret'),
('Sun God', 'Secret'),
('Berserker', 'Secret');

INSERT INTO Quest (in_game_reward, real_life_action, action_description, experience_points) VALUES
('Feed Your Pet', 'Plant a Tree', 'Plant a tree in your neighborhood or a designated green area.', 80),
('Walk Your Pet', 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 50),
('Play with Your Pet', 'Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 75),
('Teach Pet Tricks', 'Energy Conservation', 'Turn off lights and appliances when not in use.', 60),
('Groom Your Pet', 'Composting', 'Start composting kitchen scraps to create natural fertilizer.', 100);

INSERT INTO Merchant (item_name, item_cost, description) VALUES
('Common Egg', 100, 'Open for 1/8 chance to get any of the common pets'),
('Rare Egg', 250, 'Open for 1/4 chance to get any of the rare pets'),
('Legendary Egg', 1000, 'Open for 1/2 chance to get any of the legendary pets'),
('Mystery Egg', 200, '50% chance for a common, 35% chance for a rare, 12% chance for a legendary, 3% chance for a secret');


INSERT INTO Mission (mission_name, dmg_req, hp_req, experience_points, moneys) VALUES 
('Pain Raid', 50, 50, 100, 100),
('Sukuna Raid', 250, 200, 200, 300),
('Dio Raid', 900, 1000, 500, 500),
('Madara Raid', 5000, 2500, 2000, 1500),
('Kaido & Big Mom Raid', 9500, 12000, 4000, 5000),
('Gilgamesh Raid', 25000, 20000, 10000, 25000);

`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});