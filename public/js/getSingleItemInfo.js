const itemId = localStorage.getItem("itemId");
console.log("item id is " + itemId);

document.addEventListener("DOMContentLoaded", function () {

    const callbackForPlayerInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const itemInfo = document.getElementById("itemInfo");
  
      if (responseStatus == 404) {
        itemInfo.innerHTML = `${responseData.message}`;
        return;
      }
      // to show details of the item selected including the gif
      itemInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
              <img src="img/eggsprite${responseData.item_id}.gif" class="card-img-top" alt="Item Image">
                  <h5 class="card-text">
                      Name: ${responseData.item_name} <br>
                      Cost: ${responseData.item_cost} <br>
                      Item ID: ${responseData.item_id} <br>
                      Description: ${responseData.description} <br>
                  </h5>
              </div>
          </div>
          
      `;
    };
    
    fetchMethod(currentUrl + `/api/merchant/${itemId}`, callbackForPlayerInfo); //fetch to get the item details
});
