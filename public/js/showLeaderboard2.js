document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const leaderboardList2 = document.getElementById("leaderboardList2");
      let counter = 1; 
  
      for (let i = 0; i < responseData.length; i++) {
        const user = responseData[i];
  
        // check if pet_id is greater than 14 and counter is less than or equal to 20
          const displayItem = document.createElement("div");
          displayItem.className = "col-xl-12 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">#${counter}: ${user.username}</h5>
                      <p class="card-title">ID: ${user.user_id}, Moneys: $${user.moneys}, Total EXP From Pets: ${user.total_pets_exp}, Equipped Pet DMG: ${user.equipped_pet_dmg} </p>
                  </div>
              </div>
          `;
          leaderboardList2.appendChild(displayItem);
  
          counter++;
        
  
        if (counter > 10) { // basically to limit it to only the top 10 users
          break;
        }
      }
    };
  
    fetchMethod(currentUrl + "/api/users/leaderboard", callback);
  });
  