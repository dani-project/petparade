document.addEventListener("DOMContentLoaded", function () {
    const equipButton = document.getElementById("equipButton"); // Assuming the button's id is "equipButton"
    
    if (equipButton) {
        equipButton.addEventListener("click", function () {
            event.preventDefault();
            const profileToken = localStorage.getItem("token");
            if (profileToken) {
                const profileDecodedToken = jwt_decode(profileToken);
                const user_id = profileDecodedToken.userId;
                const petId = localStorage.getItem("petId");
                
                const data = {
                    user_id: user_id
                };

                const callback = (responseStatus, responseData) => {
                    console.log("Response status:", responseStatus);
                    console.log("Response data:", responseData);

                    if (responseStatus === 204) {
                        console.log("Pet equipped successfully!");
                        // Handle success if needed
                    } else {
                        console.error("Equipping pet failed:", responseData.message);
                        // Handle failure if needed
                    }
                };

                fetchMethod(`${currentUrl}/api/pets/equip/${petId}`, callback, "PUT", data);
                window.location.reload() //refreshes the page to show updated name
            } else {
                console.error("User token not found.");
                // Handle the case where the user token is not found
            }
        });
    } else {
        console.error("Equip button not found.");
        // Handle the case where the equip button is not found
    }
});
