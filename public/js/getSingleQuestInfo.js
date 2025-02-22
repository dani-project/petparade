const questId = localStorage.getItem("questId");
console.log("quest id is " + questId);

document.addEventListener("DOMContentLoaded", function () {

    const callbackForPlayerInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const questInfo = document.getElementById("questInfo"); // card to show all details of a quest
      questInfo.innerHTML = `
      <div class="card">
      <img src="img/quest${responseData.quest_id}.png" class="card-img-top quest-image" alt="Item Image">
      <div class="card-body">
          <h5 class="card-title">QUEST: ${responseData.quest_id}</h5>
          <p class="card-title">Real Life Action: ${responseData.real_life_action}</p>
          <p class="card-title">Reward: ${responseData.in_game_reward}</p>
          <p class="card-text">EXP: ${responseData.experience_points}</p>
          <button class="btn btn-success view-description-btn" id="backButton">Back</button>
      </div>
  </div>
          
      `;
      const backButton = document.getElementById("backButton");
      if (backButton) {
        backButton.addEventListener("click", goBack);
      }
    };
    
    fetchMethod(currentUrl + `/api/quests/${questId}`, callbackForPlayerInfo);

    function goBack() {
        window.history.back(); // button to go back
    }
});
