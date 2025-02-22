document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const petId = urlParams.get("petId"); // get petId from the params of the url set by previous js script
    localStorage.setItem("petId", petId);// store in localstorage

    const callbackForPlayerInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const petInfo = document.getElementById("buyPetInfo");
        const imageId = getImageIdByPetType(responseData.type); // to get corresponding img
        if (responseStatus == 404) {
            petInfo.innerHTML = `${responseData.message}`;
            return;
        }
        // create a card to show the user details of the pet they just got from an egg
        petInfo.innerHTML = `
          <div class="card">
          <img src="img/petsprite${imageId}.gif" class="card-img-top quest-image" alt="Item Image">
              <div class="card-body">
                  <p class="card-text">
                  Pet ID: ${responseData.pet_id} <br>
                  Name: ${responseData.name} <br>
                      Level: ${responseData.level} <br>
                      Rarity: ${responseData.rarity} <br>
                      DMG: ${responseData.dmg} <br>
                      HP: ${responseData.hp} <br>
                      Birthday: ${responseData.birthday} <br>
                      Total EXP: ${responseData.total_exp} <br>
                      Status: ${responseData.status} <br>
                  </p>
              </div>
          </div>
          
      `;
    };

    fetchMethod(currentUrl + `/api/pets/${petId}`, callbackForPlayerInfo); //get data from specific pet
});

function getImageIdByPetType(petType) { //function to return the UNIQUE pet_id from the pet. cannot just show pet_id as if its over 19, it shows no img as theres only sprites for pets 1-19
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
        default:
            return 0;
    }
}