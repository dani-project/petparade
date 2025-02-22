document.addEventListener("DOMContentLoaded", function () {
    const returnButton = document.getElementById("returnButton");

    if (returnButton) {
        returnButton.addEventListener("click", function () {
            // go back to the previous page
            window.history.back();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const returnButton = document.getElementById("returnButton2");

    if (returnButton2) {
        returnButton.addEventListener("click", function () {
            // go back to the previous page
            window.history.back();
        });
    }
});