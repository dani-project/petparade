document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("complete-quest");
    const petId = localStorage.getItem("petId");
    console.log("pet ID is " + petId);

    const questSelect = document.getElementById("questSelect");

    //listen for dropdown change
    questSelect.addEventListener("change", function () {
        const selectedValue = questSelect.value;
        const questNo = parseInt(selectedValue.split("quest")[1]);
        console.log("Quest ID: ", questNo);

        localStorage.setItem("questId", questNo);
    });

    // listen for form submission
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const questId = localStorage.getItem("questId");

        // prepare data for request
        const data = {
            pet_id: petId,
            quest_id: questId
        };
        window.location.href = "addExpSuccessful.html";
        const callback = (responseStatus, responseData) => {
            console.log("status:", responseStatus);
            console.log("data:", responseData);

            if (responseStatus === 200) {
                window.location.href = "addExpSuccessful.html"; // go to success page
            } else {
                console.error("Update failed:", responseData.message);
            }
        };

        fetchMethod(`${currentUrl}/api/pet_progress`, callback, "POST", data);

        editForm.reset();
    });
});
