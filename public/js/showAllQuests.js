console.log("ShowAllQuestsItems file runs");

const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const itemList = document.getElementById("questList");
  responseData.forEach((quest) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3"; // show all quests details on the cards created
    displayItem.innerHTML = `
    <div class="card">
    <img src="img/quest${quest.quest_id}.png" class="card-img-top" alt="Item Image">
    <div class="card-body">
        <h5 class="card-title">QUEST: ${quest.quest_id}</h5>
        <p class="card-title">Real Life Action: ${quest.real_life_action}</p>
        <p class="card-title">Reward: ${quest.in_game_reward}</p>
        <p class="card-text">EXP: ${quest.experience_points}</p>
        <button class="btn btn-success view-description-btn" data-quest-id="${quest.quest_id}">View More Here</button>
    </div>
</div>
        `;
    itemList.appendChild(displayItem);
  });

  const viewDescriptionButtons = document.querySelectorAll('.view-description-btn'); // view more button
  viewDescriptionButtons.forEach(button => {
    button.addEventListener('click', function () {
      // get the item_id from the data attribute
      const questId = this.getAttribute('data-quest-id');

      // store the item_id in local storage
      localStorage.setItem('questId', questId);

      // send user to single quest info page
      window.location.href = `singleQuestInfo.html?quest_id=${questId}`;
    });
  });
};

fetchMethod(currentUrl + "/api/quests", callback);