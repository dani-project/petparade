const token2 = localStorage.getItem("token");
if (token2) {
    const item_id = parseInt(localStorage.getItem("itemId"));
    document.addEventListener("DOMContentLoaded", function () {
        const buyItemButton = document.getElementById("buyItemButton");

        if (buyItemButton) {
            buyItemButton.addEventListener("click", function () {
                // prepare data to be sent in the request body
                const data = {
                    user_id: user_id,
                    item_id: item_id
                };

                console.log("dataMerchant", data);

                const callback = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);

                    if (responseStatus === 201) {
                        window.location.href = `buySuccess.html?petId=${(responseData.pet_id)}`; // bring to page where it shows what user just got
                    } else if (responseStatus === 403) {
                        window.location.href = "buyFailure.html"; // bring to page where it says user has not enough money
                    } else {
                        console.error("Transaction failed:", responseData.message);
                    }
                };

                fetchMethod(`${currentUrl}/api/merchant`, callback, "POST", data); // post data to the url to buy an item
            });
        }
    });

} else {
    window.location.href = "noAccount.html";
}

if (token2) {
    const item_id = parseInt(localStorage.getItem("itemId"));
    document.addEventListener("DOMContentLoaded", function () {
        const buyItemButton2 = document.getElementById("buyItemButton2");

        if (buyItemButton2) {
            buyItemButton2.addEventListener("click", function () {
                // Define a function to handle the fetch request
                const buyItem = () => {
                    // Prepare data to be sent in the request body
                    const data = {
                        user_id: user_id,
                        item_id: item_id
                    };

                    console.log("dataMerchant", data);

                    const callback = (responseStatus, responseData) => {
                        console.log("responseStatus:", responseStatus);
                        console.log("responseData:", responseData);

                        if (responseStatus === 201) {
                            window.location.href = `buySuccess2.html?petId=${(responseData.pet_id)}`; // bring to page where it shows what user just got
                        } else if (responseStatus === 403) {
                            window.location.href = "buyFailure.html"; // bring to page where it says user has not enough money
                        } else {
                            console.error("Transaction failed:", responseData.message);
                        }
                    };

                    fetchMethod(`${currentUrl}/api/merchant`, callback, "POST", data); // post data to the url to buy an item
                };

                // Loop to buy the item 10 times
                for (let i = 0; i < 10; i++) {
                    buyItem();
                }
            });
        }
    });

} else {
    window.location.href = "noAccount.html";
}