const token2 = localStorage.getItem("token");
if (token2) {
  document.addEventListener("DOMContentLoaded", function () {
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const commonContainer = document.getElementById("common"); // create a container for each rarity
    const rareContainer = document.getElementById("rare");
    const legendaryContainer = document.getElementById("legendary");
    const secretContainer = document.getElementById("secret");

    responseData.forEach((pet) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-lg-4 col-md-6 mb-4"; // creates a container showing each type of pet 
      displayItem.innerHTML = `
        <div class="pet-box rounded-container">
            <img src="img/petsprite${pet.pet_id}.gif" class="pet-box-image" alt="Pet Image">
            <div class="pet-box-content">
            <h5 class="pet-box-text">Petdex No. : ${pet.pet_id}</h5>
                <h5 class="pet-box-text">Pet Species Type: ${pet.type}</h5>
                <h5 class="pet-box-text">Rarity: ${pet.rarity}</h5>
            </div>
        </div>
        `;

      if (pet.rarity == 'Common' && pet.pet_id < 9) {
        commonContainer.appendChild(displayItem);
      } else if (pet.rarity === 'Rare' && pet.pet_id < 13) { // to push each pet of the diff rarities into their respective containers
        rareContainer.appendChild(displayItem);
      } else if (pet.rarity == 'Legendary'&& pet.pet_id < 17) {
        legendaryContainer.appendChild(displayItem);
      } else if (pet.rarity == 'Secret' && pet.pet_id < 20) {
        secretContainer.appendChild(displayItem);
      }
    });
  };

  fetchMethod(currentUrl + "/api/pets", callback);
});

} else {
  window.location.href = "noAccount.html";
}
