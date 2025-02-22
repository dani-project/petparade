document.addEventListener("DOMContentLoaded", function () {
    const decodedOwnerToken = jwt_decode(localStorage.getItem("token"));
    const ownerId = decodedOwnerToken.userId;
    console.log("Owner id here is " + ownerId);

    const sellHeader = document.querySelector(".sellHeader");

    if (sellHeader) {
        // Fetch all pets owned by the user
        fetch(`${currentUrl}/api/users/pets/${ownerId}`)
            .then(response => response.json())
            .then(data => {
                // Filter out pets with rarity 'Secret' or status 'Equipped'
                const petsToSell = data.filter(pet => pet.rarity !== 'Secret' && pet.status !== 'Equipped');

                // Display confirmation message based on the user's pets
                const petsCount = petsToSell.length;
                const totalResellPrice = calculateTotalResellPrice(petsToSell);

                sellHeader.innerHTML = `<h1 class="mb-4 text-center">Are you sure you want to sell ${petsCount} pets for a total of ${totalResellPrice} Moneys?</h1>`;
            })
            .catch(error => {
                console.error('Error fetching user\'s pets:', error);
                sellHeader.innerHTML = '<h1>Error fetching user\'s pets</h1>';
            });
    }

    const sellAllButton = document.getElementById("sellAllButton2");
    if (sellAllButton) {
        sellAllButton.addEventListener("click", function () {
            // Fetch all pets owned by the user
            fetch(`${currentUrl}/api/users/pets/${ownerId}`)
                .then(response => response.json())
                .then(data => {
                    // Filter out pets with rarity 'Secret' or status 'Equipped'
                    const petsToSell = data.filter(pet => pet.rarity !== 'Secret' && pet.status !== 'Equipped');

                    // Sell each pet except those with rarity 'Secret' or status 'Equipped'
                    petsToSell.forEach(pet => {
                        const sellData = {
                            pet_id: pet.pet_id,
                            user_id: ownerId
                        };

                        // Sell each pet individually
                        fetchMethod(`${currentUrl}/api/pets/sell`, (responseStatus, responseData) => {
                            console.log("responseStatus:", responseStatus);
                            console.log("responseData:", responseData);

                            if (responseStatus === 204) {
                                // Handle successful sale, if needed
                            } else {
                                console.error("Deletion failed:", responseData.message);
                                // Handle failed sale, if needed
                            }
                        }, "DELETE", sellData);
                    });

                    // Redirect after selling all pets
                    window.location.href = "yourPets.html";
                })
                .catch(error => {
                    console.error('Error fetching user\'s pets:', error);
                    // Handle error fetching user's pets, if needed
                });
        });
    }
});

// Function to calculate the total resell price for all pets
function calculateTotalResellPrice(pets) {
    let totalResellPrice = 0;

    pets.forEach(pet => {
        switch (pet.rarity) {
            case 'Common':
                totalResellPrice += 100;
                break;
            case 'Rare':
                totalResellPrice += 250;
                break;
            case 'Legendary':
                totalResellPrice += 2000;
                break;
            default:
                totalResellPrice += 25000;
                break;
        }
    });

    return totalResellPrice;
}
