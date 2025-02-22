const profileToken = localStorage.getItem("token");
console.log("TOKEN IS " + profileToken);
const profileDecodedToken = jwt_decode(profileToken);
console.log("DECODED TOKEN IS ", profileDecodedToken);
const user_id = profileDecodedToken.userId;
console.log("USER ID IS " + user_id);

// to get user id

document.addEventListener("DOMContentLoaded", function () {
  const callbackForPlayerInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const userInfo = document.getElementById("userInfo");
    if (responseStatus == 404) {
      userInfo.innerHTML = `${responseData.message}`;
      return;
    }
    // make card to show your own user details 
    userInfo.innerHTML = `
        <div class="card">
        <img src="img/userprofile.png" class="card-img-top quest-image" alt="Item Image">
            <div class="card-body">
                <p class="card-text">
                    ID: ${responseData.user_id} <br>
                    Name: ${responseData.username} <br>
                    Moneys: $${responseData.moneys} <br>
                    Equipped Pet ID: ${responseData.equipped_pet_id} <br>
                    Equipped Pet DMG: ${responseData.equipped_pet_dmg} <br>
                    Equipped Pet HP: ${responseData.equipped_pet_hp} <br>
                    Total EXP Earned From All Pets: ${responseData.total_pets_exp} <br>
                </p>
            </div>
        </div>
        
    `;
  };

  fetchMethod(currentUrl + `/api/users/${user_id}`, callbackForPlayerInfo);
});

// Function to fetch user data
const fetchUser = () => {
    fetchMethod(currentUrl + `/api/users/${user_id}`, (responseStatus, responseData) => {
        if (responseStatus === 200) {
            const equipped_pet_id = responseData.equipped_pet_id;
            console.log("equipped pet is ", equipped_pet_id);
            if (equipped_pet_id) {
                // If equipped_pet_id exists, fetch pet data
                fetchMethod(currentUrl + `/api/pets/${equipped_pet_id}`, (petResponseStatus, petResponseData) => {
                    if (petResponseStatus === 200) {
                        displayPetInfo(petResponseData);
                    } else {
                        console.error("Error fetching pet data:", petResponseData.message);
                    }
                });
            } else {
                console.error("No equipped pet found for user:", user_id);
            }
        } else {
            console.error("Error fetching user data:", responseData.message);
        }
    });
};

// Function to display pet information
const displayPetInfo = (petData) => {
    const petInfo = document.getElementById("petInfo");
    const imageId = getImageIdByPetType(petData.type);
    // Card to show details of the equipped pet
    petInfo.innerHTML = `
        <div class="card">
            <img src="img/petsprite${imageId}.gif" class="card-img-top quest-image" alt="Item Image">
            <div class="card-body">
                <p class="card-text">
                    Pet ID: ${petData.pet_id} <br>
                    Name: ${petData.name} <br>
                    Level: ${petData.level} <br>
                    Rarity: ${petData.rarity} <br>
                    DMG: ${petData.dmg} <br>
                    HP: ${petData.hp} <br>
                    EXP Left To Level Up: ${petData.exp_left_to_level_up} <br>
                </p>
            </div>
        </div>
    `;
};

//function to get the unique id of a pet, based on the type of the pet
function getImageIdByPetType(petType) {
    switch (petType) {
        case 'Berserker':
            return 19;
        case 'Sun God':
            return 18;
        case 'Road Blocks':
            return 17;
        case 'Ascended Dog':
            return 16;
        case 'Ascended Cat':
            return 15;
        case 'Shadow Dragon':
            return 14;
        case 'Light Dragon':
            return 13;
        case 'Kitsune':
            return 12;
        case 'Phoenix':
            return 11;
        case 'Unicorn':
            return 10;
        case 'Dinosaur':
            return 9;
        case 'Pig':
            return 8;
        case 'Mouse':
            return 7;
        case 'Goat':
            return 6;
        case 'Chicken':
            return 5;
        case 'Monkey':
            return 4;
        case 'Dog':
            return 3;
        case 'Cat':
            return 2;
        case 'Bunny':
            return 1;
    }
}

fetchUser();