document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const leaderboardList = document.getElementById("leaderboardList");
      let counter = 1; // start counter
  
      for (let i = 0; i < responseData.length; i++) {
        const pet = responseData[i];
  
        // check if pet_id is greater than 14 and counter is less than or equal to 20
        if (pet.pet_id > 17 && counter <= 20) {
          const displayItem = document.createElement("div");
          displayItem.className = "col-xl-12 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">#${counter}: ${pet.name}</h5>
                      <p class="card-title">DMG: ${pet.dmg}, Type: ${pet.type}, Pet ID: ${pet.pet_id}, Level: ${pet.level}, Owner: ${pet.owner_username}, Total EXP:${pet.total_exp} </p>
                  </div>
              </div>
          `;
          leaderboardList.appendChild(displayItem);
  
          counter++;
        }
  
        if (counter > 20) { // basically to limit it to only the top 20 pets 
          break;
        }
      }
    };
  
    fetchMethod(currentUrl + "/api/pets/leaderboard", callback);
  });
  