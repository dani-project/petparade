# Name: Mohamed Dani Bin Mohamed Kasim
# Admin No. : P2323093
# Class : DIT/1B/06

# Introduction
This is my CA2 assignment for BED. I have enhanced my backend to incorporate additional features such and systems such as a Rarity system for the pets, the Merchant where users can buy eggs that hatch into new pets based on the rarity of the egg that you've bought, including a common, rare, legendary and mystery egg, which is the only way you can test your luck to get secret pets! You can purchase pets by completing quests to level up your pets to earn Moneys now! If you've had no luck trying to hatch secret pets you can also sell your pets to get some Moneys back to try again. Chat with your friends through the global chat and also compete with them for the top spot on the leaderboard for pets.

# Prerequisites
Make sure to have these dependencies downloaded before running the initialisation tables(initTables.js) via npm run init_tables

1. nodemon
2. express
3. mysql2
4. dotenv
5. bcrypt
6. jsonwebtoken

# Summary of changes for Backend enhancements
- Added Merchant table to show all the items and cost of items
- Endpoint: POST /api/merchant -> To buy pet from merchant to be added to user's pets
- Example request body {
    "user_id": 1,
    "item_id": 3
}
- Endpoint: GET /api/merchant -> To show all the items and their cost, as well as description
- Endpoint: GET /api/merchant/id -> To show details about a specific item

- Added Messages table to show all messages
- Endpoint: GET /api/message -> To show all the messages
- Endpoint: GET /api/message/id -> To show specific message
- Endpoint: PUT /api/message/id -> To edit a specific message
- Endpoint: DELETE /api/message/id -> To delete specific message

- Added some additional endpoints to the existing ones such as the DELETE api/pets/sell
- Example request body {
    "user_id": 1,
    "pet_id": 3
}

- Added some additional endpoints to the existing ones such as the GET api/pets/leaderboard

# List of main pages
- Home Page
- Tutorial
- Merchant
- Quests
- Quest Logs
- Your Pets
- Pet Dex
- Global Chat
- About the Creator
- Leaderboard
- Profile
- Users

