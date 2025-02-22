const profileToken2 = localStorage.getItem("token");

console.log("step 1");
if (profileToken2) {
    console.log("step 2")
    const savedRaidIndex = localStorage.getItem("selectedRaidIndex");
    const profileDecodedToken = jwt_decode(profileToken);
    const user_id = profileDecodedToken.userId;

    document.addEventListener("DOMContentLoaded", function () {
        const attemptRaidButton = document.getElementById("attemptRaidButton");
        console.log("step 3")
        if (attemptRaidButton) {
            attemptRaidButton.addEventListener("click", function () {
                // Prepare data to be sent in the request body
                const data = {
                    user_id: user_id,
                    mission_id: savedRaidIndex
                };
                console.log("data", data)

                console.log("Attempt mission data:", data);

                const callback = (responseStatus, responseData) => {
                    console.log("Response status:", responseStatus);
                    console.log("Response data:", responseData);

                    if (responseStatus === 201) {
                        window.location.href = `missionSuccess.html?missionId=${responseData.mission_id}`; // Redirect to success page
                    } else if (responseStatus === 400) {
                        window.location.href = "missionFailed.html"; // Redirect to failure page
                    } else {
                        console.error("Transaction failed:", responseData.message);
                    }
                };

                fetchMethod(`${currentUrl}/api/mission_progress`, callback, "POST", data); // Post data to the URL to attempt the mission
            });
        }
    });

} else {
    window.location.href = "noAccount.html";
}
