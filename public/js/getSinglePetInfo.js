document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams; //to take the petId from the url set from the previous js
    const petId = urlParams.get("petId");
    localStorage.setItem("petId", petId); 

    const callbackForPlayerInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const petInfo = document.getElementById("petInfo");
      const imageId = getImageIdByPetType(responseData.type);
      if (responseStatus == 404) {
        petInfo.innerHTML = `${responseData.message}`;
        return;
      }
      //card to show details of a pet chosen
      petInfo.innerHTML = `
          <div class="card">
          <img src="img/petsprite${imageId}.gif" class="card-img-top quest-image" alt="Item Image">
              <div class="card-body">
                  <p class="card-text">
                  Pet ID: ${responseData.pet_id} <br>
                      Name: ${responseData.name} <br>
                      Type: ${responseData.type} <br>
                      Level: ${responseData.level} <br>
                      Rarity: ${responseData.rarity} <br>
                      DMG: ${responseData.dmg} <br>
                      HP: ${responseData.hp} <br>
                      Birthday: ${responseData.birthday} <br>
                      EXP Left To Level Up: ${responseData.exp_left_to_level_up} <br>
                      Total EXP: ${responseData.total_exp} <br>
                      Status: ${responseData.status} <br>
                  </p>
              </div>
          </div>
          
      `;
    };
  
    fetchMethod(currentUrl + `/api/pets/${petId}`, callbackForPlayerInfo);
});

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