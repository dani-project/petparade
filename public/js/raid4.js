document.addEventListener("DOMContentLoaded", function () {
    const raidText = document.querySelector(".raidText2");

    if (raidText) {
        // Assuming you have stored the mission_id in localStorage
        const missionId = localStorage.getItem("selectedRaidIndex");

        fetch(`${currentUrl}/api/missions/${missionId}`)
            .then(response => response.json())
            .then(data => {
                const data2 = {
                    dmg_req: data.dmg_req,
                    hp_req: data.hp_req,
                    moneys: data.moneys,
                    exp: data.experience_points
                };

                raidText.innerHTML = `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 5px;">
                <p class="mb-2" style="color: #4CAF50; font-size: 0.7em;">Moneys Rewarded: ${data2.moneys} Moneys</p>
                <p class="mb-2" style="color: #4CAF50; font-size: 0.7em;">EXP Rewarded: ${data2.exp} EXP</p>
            </div>`;
            })
            .catch(error => {
                console.error('Error fetching mission details:', error);
                raidText.innerHTML = '<h1>Error fetching mission details</h1>';
            });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const raidHeader = document.querySelector(".raidHeader2");

    if (raidHeader) {
        // Assuming you have stored the mission_id in localStorage
        const missionId = localStorage.getItem("selectedRaidIndex");

        fetch(`${currentUrl}/api/missions/${missionId}`)
            .then(response => response.json())
            .then(data => {
                const missionName = data.mission_name;
                console.log("mission name is ", missionName)
                raidHeader.innerHTML = `<h1 class="mb-4 text-center"><p>Congratulations! You beat the <span style="color: red;">${missionName}</span>!</p>
                </h1>`;
            })
            .catch(error => {
                console.error('Error fetching mission details:', error);
                raidHeader.innerHTML = '<h1>Error fetching mission details</h1>';
            });
    }
});