console.log("ShowAllQuestsItems file runs");

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const itemList = document.getElementById("questLogs");
    responseData.forEach((petprogress) => {
        const displayItem = document.createElement("div"); // creates a card of all quest logs
        displayItem.className =
            "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card">
        <img src="img/quest${petprogress.quest_id}.png" class="card-img-top" alt="Item Image">
        <div class="card-body">
            <p class="card-title">Quest Completed: ${petprogress.quest_id}</p>
            <p class="card-title">Pet ID: ${petprogress.pet_id}</p>
            <p class="card-text">EXP Earned: ${petprogress.experience_points}</p>
            <p class="card-text">Completed On: ${petprogress.completion_date}</p>
            <button class="btn btn-success view-description-btn" data-quest-id="${petprogress.quest_id}">View More Here</button>
        </div>
    </div>
            `;
        itemList.appendChild(displayItem);
    });

    const viewDescriptionButtons = document.querySelectorAll('.view-description-btn');
    viewDescriptionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const questId = this.getAttribute('data-quest-id');

            localStorage.setItem('questId', questId); // sets the questId to that of the id of the attribute when click on view more in the local storage

            window.location.href = `singleQuestInfo.html?quest_id=${questId}`; // send user to page to show details abt selected quest
        });
    });
};

fetchMethod(currentUrl + "/api/pet_progress", callback);