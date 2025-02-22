const token2 = localStorage.getItem("token");

if (token2) {
    const decodedToken2 = jwt_decode(token2);
    user_id2 = decodedToken2.userId;
    console.log("messaging user id is " + user_id2);

    document.addEventListener("DOMContentLoaded", function () {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            const commonContainer = document.getElementById("common");
            const rareContainer = document.getElementById("rare");
            const legendaryContainer = document.getElementById("legendary");
            const secretContainer = document.getElementById("secret");
            const equippedContainer = document.getElementById("equipped"); // Add container for equipped pets

            responseData.forEach((pet) => {
                const displayItem = document.createElement("div");
                displayItem.className = "col-lg-4 col-md-6 mb-4";
                const imageId = getImageIdByPetType(pet.type); // Get the pet_id based on type
                displayItem.innerHTML = `
                <div class="pet-box2 rounded-container">
                    <img src="img/petsprite${imageId}.gif" class="pet-box2-image" alt="Pet Image">
                    <div class="pet-box2-content">
                        <h5 class="pet-box2-text">Petdex No. : ${pet.pet_id}</h5>
                        <h5 class="pet-box2-text">Pet Name: ${pet.name}</h5>
                        <button class="btn btn-primary" onclick="redirectToAnotherPage(${pet.pet_id})">Pet Details</button>
                        <button class="btn btn-danger" onclick="redirectToAnotherPage2(${pet.pet_id})">Sell</button>
                    </div>
                </div>
            `;
                if (pet.status === 'Equipped') {
                    equippedContainer.appendChild(displayItem); // Add to equipped container if status is 'equipped'
                } else if (pet.rarity === 'Common') {
                    commonContainer.appendChild(displayItem); // Push pets into their respective containers based on rarity
                } else if (pet.rarity === 'Rare') {
                    rareContainer.appendChild(displayItem);
                } else if (pet.rarity === 'Legendary') {
                    legendaryContainer.appendChild(displayItem);
                } else if (pet.rarity === 'Secret') {
                    secretContainer.appendChild(displayItem);
                }
            });
        };
        fetchMethod(`${currentUrl}/api/users/pets/${user_id}`, callback, 'GET', null); // Retrieve data of user's pets
    });

    function redirectToAnotherPage(petId) {
        window.location.href = `singlePetInfo.html?petId=${petId}`; // Send user to page about selected pet
    }

    function redirectToAnotherPage2(petId) {
        window.location.href = `confirmSell.html?petId=${petId}`; // Send user to the confirm sale page
    }

    function getImageIdByPetType(petType) { // Determine what unique id the pet is based on their type
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
}

