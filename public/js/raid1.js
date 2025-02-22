document.addEventListener("DOMContentLoaded", function() {
    const raidContainers = document.querySelectorAll(".raids-container");

    raidContainers.forEach(function(container, index) {
        container.addEventListener("click", function() {
            // Save the index of the clicked container to local storage
            localStorage.setItem("selectedRaidIndex", index + 1);
            console.log("Selected Raid:", index + 1);
        });
    });
});
