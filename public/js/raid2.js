// Get the user_id from the decoded token
const profileToken = localStorage.getItem("token");
const profileDecodedToken = jwt_decode(profileToken);
const user_id = profileDecodedToken.userId;

console.log("user id for raids is ", user_id);

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
                window.location.href = "equipError.html";
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

// Call the fetchUser function to start the process
fetchUser();

document.addEventListener("DOMContentLoaded", function () {
    const raidText = document.querySelector(".raidText");

    if (raidText) {
        // Assuming you have stored the mission_id in localStorage
        const missionId = localStorage.getItem("selectedRaidIndex");

        fetch(`${currentUrl}/api/missions/${missionId}`)
            .then(response => response.json())
            .then(data => {
                const data2 = {
                    dmg_req: data.dmg_req,
                    hp_req: data.hp_req,
                    moneys: data.moneys,
                    exp: data.experience_points
                };

                raidText.innerHTML = `
                    <div style="display: flex; justify-content: space-around; align-items: center; padding-top: 5px;">
                        <p class="mb-2" style="color: #4CAF50; font-size: 0.7em;">DMG Requirement: ${data2.dmg_req},</p>
                        <p class="mb-2" style="color: #4CAF50; font-size: 0.7em;">HP Requirement: ${data2.hp_req},</p>
                        <p class="mb-2" style="color: #4CAF50; font-size: 0.7em;">Moneys Rewarded: ${data2.moneys} Moneys</p>
                        <p class="mb-2" style="color: #4CAF50; font-size: 0.7em;">EXP Rewarded: ${data2.exp} EXP</p>
                    </div>`;
            })
            .catch(error => {
                console.error('Error fetching mission details:', error);
                raidText.innerHTML = '<h1>Error fetching mission details</h1>';
            });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const raidHeader = document.querySelector(".raidHeader");

    if (raidHeader) {
        // Assuming you have stored the mission_id in localStorage
        const missionId = localStorage.getItem("selectedRaidIndex");

        fetch(`${currentUrl}/api/missions/${missionId}`)
            .then(response => response.json())
            .then(data => {
                const missionName = data.mission_name;
                console.log("mission name is ", missionName)
                raidHeader.innerHTML = `<h1 class="mb-4 text-center">Are you sure you want to attempt the <span style="color: red;">${missionName}</span> with this pet?</h1>`;
            })
            .catch(error => {
                console.error('Error fetching mission details:', error);
                raidHeader.innerHTML = '<h1>Error fetching mission details</h1>';
            });
    }
});

