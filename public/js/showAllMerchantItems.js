const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const itemList = document.getElementById("itemList");
  responseData.forEach((merchant) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3"; //create cards to show img and data of each item sold
    displayItem.innerHTML = `
        <div class="item-card">
            <img src="img/eggsprite${merchant.item_id}.gif" class="card-img-top" alt="Item Image">
            <div class="item-card-body">
                <h5 class="item-card-title">ITEM: ${merchant.item_id}</h5>
                <h5 class="item-card-title">NAME: ${merchant.item_name}</h5>
                <p class="item-card-text">
                    Cost: $${merchant.item_cost} Moneys<br>
                </p>
                <button class="btn btn-primary view-description-btn" data-item-id="${merchant.item_id}">View More Here</button>
                <button class="btn btn-primary buy-item-btn" data-item-id="${merchant.item_id}">Buy This Item></button>
            </div>
        </div>
        `;
    itemList.appendChild(displayItem);
  });

  const viewDescriptionButtons = document.querySelectorAll('.view-description-btn');
  viewDescriptionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-item-id');
      localStorage.setItem('itemId', itemId); // retrieves the item id of the option clicked and then stores it in the local storage
      
      window.location.href = `singleItemInfo.html?item_id=${itemId}`; //send user to page about chosen item
    });
  });

  const buyItemButtons = document.querySelectorAll('.buy-item-btn');
  buyItemButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = this.getAttribute('data-item-id');
      localStorage.setItem('itemId', itemId);
      
      window.location.href = `buyitem.html?item_id=${itemId}`; // brings to confirm buy page
    });
  });
};

fetchMethod(currentUrl + "/api/merchant", callback);