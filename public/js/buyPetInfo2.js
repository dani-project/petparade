document.addEventListener("DOMContentLoaded", function () {
    const callbackForPetInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const petInfoContainer = document.getElementById("petInfoContainer");
        const row = document.createElement("div");
        row.className = "row";
        responseData.slice(-10).forEach(pet => { // Get the last 10 pets from the response data
            const imageId = getImageIdByPetType(pet.type);
            const col = document.createElement("div");
            col.className = "col-lg-2 col-md-3 col-sm-4 mb-3"; // Adjust the column width for 5 x 2 layout
            const petCard = document.createElement("div");
            petCard.className = "card";
            petCard.style.height = "240px"; // Set the height of each pet display to 250 pixels
            petCard.innerHTML = `
                <div class="card-body">
                    <img src="img/petsprite${imageId}.gif" class="card-img-top" alt="Pet Image" style="height: 38%; object-fit: contain;">
                    <p class="card-text" style="font-size: 15px;">
                    ID: ${pet.pet_id} <br>
                        Name: ${pet.name} <br>
                        Rarity: ${pet.rarity} <br>
                        DMG: ${pet.dmg} <br>
                        HP: ${pet.hp} <br>
                    </p>
                </div>
            `;
            col.appendChild(petCard);
            row.appendChild(col);
        });
        petInfoContainer.appendChild(row);
    };

    fetchMethod(currentUrl + "/api/pets", callbackForPetInfo); // Fetch pet data from the server
});


// Function to get the unique ID of a pet based on its type
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
