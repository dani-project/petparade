const decodedOwnerToken = jwt_decode(localStorage.getItem("token"));
const ownerId = decodedOwnerToken.userId;
console.log("Owner id here is " + ownerId);

url = new URL(document.URL);
const urlParams = url.searchParams;
const petId = urlParams.get("petId");
localStorage.setItem("petId", petId);
console.log("Pet id here is " + petId);

document.addEventListener("DOMContentLoaded", function () {
    const sellHeader = document.querySelector(".sellHeader");

    if (sellHeader) {
        fetch(`${currentUrl}/api/pets/${petId}`)
            .then(response => response.json())
            .then(data => {
                const petName = data.name;
                if (data.rarity == 'Common') {
                    resellPrice = 100;
                } else if (data.rarity == 'Rare') {
                    resellPrice = 250;
                } else if (data.rarity == 'Legendary') {
                    resellPrice = 2000;
                } else {
                    resellPrice = 25000; // to display the price user will be getting if pet is sold
                }

                sellHeader.innerHTML = `<h1 class="mb-4 text-center">Are you sure you want to sell ${petName} for ${resellPrice} Moneys?</h1>`;
            })
            .catch(error => {
                console.error('Error fetching pet details:', error);
                sellHeader.innerHTML = '<h1>Error fetching pet details</h1>';
            });
    }
});

    document.addEventListener("DOMContentLoaded", function () {
        const sellButton = document.getElementById("sellButton");
        sellButton.addEventListener("click", function () {
            const data = {
                pet_id: petId,
                user_id: ownerId // data to be posted to the endpoint
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                if (responseStatus == 204) {
                    window.location.href = "yourPets.html";
                } else {
                    console.error("Deletion failed:", responseData.message);
                }
            };

            fetchMethod(`${currentUrl}/api/pets/sell`, callback, "DELETE", data);
        });
    });