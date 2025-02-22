document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const userList = document.getElementById("userList");
      responseData.forEach((user) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3"; // creates a card for each user and displays its details
        displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
              <img src="img/userprofile.png" class="card-img-top quest-image" alt="Item Image">
                  <h5 class="card-title">Name: ${user.username}</h5>
                  <p class="card-text">ID: ${user.user_id}</p>
                  <p class="card-text">Moneys: $${user.moneys}</p>
                  <p class="card-text">Equipped Pet DMG: ${user.equipped_pet_dmg}</p>
                  <a href="singleUserInfo.html?user_id=${user.user_id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
        userList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/users", callback);
  });