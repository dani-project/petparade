const token3 = localStorage.getItem("token");

if (token3) {
    const itemId = localStorage.getItem("itemId");

    document.addEventListener("DOMContentLoaded", function () {
        const callbackForPlayerInfo = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            const itemInfo = document.getElementById("merchantItem");
            if (responseStatus == 404) {
                userInfo.innerHTML = `${responseData.message}`;
                return;
            }

            itemInfo.innerHTML = `
    <img id="buyItemImage" src="img/eggsprite${itemId}.gif" alt="Item Image">
    `;
        };

        fetchMethod(`${currentUrl}/api/merchant/${itemId}`, callbackForPlayerInfo);
    });
}

// used in the buy item page, to show what the users are buying