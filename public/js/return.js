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
    const returnButton2 = document.getElementById("returnButton2");

    if (returnButton2) {
        returnButton2.addEventListener("click", function () {
            // go back to the previous page
            window.history.back();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const returnButton = document.getElementById("returnButtonProfile");

    if (returnButton) {
        returnButton.addEventListener("click", function () {
            // go back to the previous page
            window.location.href = "index.html"
        }); 
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const returnButton3 = document.getElementById("returnButton3");

    if (returnButton3) {
        returnButton3.addEventListener("click", function () {
            // go back to the previous page
            window.location.href = "raids.html"
        });
    }
});