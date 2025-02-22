const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS Pet;
DROP TABLE IF EXISTS Quest;
DROP TABLE IF EXISTS PetOwnership;
DROP TABLE IF EXISTS PetProgress;

CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT,
  email TEXT
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
  name TEXT,
  birthday TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Quest (
  quest_id INT PRIMARY KEY AUTO_INCREMENT,
  in_game_reward TEXT,
  real_life_action TEXT,
  action_description TEXT,
  experience_points INT
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
  completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO User (username, email) VALUES
('Tyler', 'thecreator@gmail.com'),
('Frank', 'blonde@gmail.com');

INSERT INTO Task (title, description, points) VALUES
('Plant a Tree', 'Plant a tree in your neighborhood or a designated green area.', 50),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

INSERT INTO Pet (type, name) VALUES
('Rat', 'Kevin'),
('Cat', 'Jamal');

INSERT INTO Quest (in_game_reward, real_life_action, action_description, experience_points) VALUES
('Feed Your Pet', 'Plant a Tree', 'Plant a tree in your neighborhood or a designated green area.', 100),
('Walk Your Pet', 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 50),
('Play with Your Pet', 'Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 75),
('Teach Pet Tricks', 'Energy Conservation', 'Turn off lights and appliances when not in use.', 60),
('Groom Your Pet', 'Composting', 'Start composting kitchen scraps to create natural fertilizer.', 80);

`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});