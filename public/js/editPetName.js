document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("edit-name");
    const petId = localStorage.getItem("petId");
    console.log("PET ID IS " + petId);
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const petname = document.getElementById("petname").value;

        const data = {
            name: petname,
        };

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus === 200 && responseData.token) {
                localStorage.setItem("token", responseData.token);
            } else {
                console.error("Update failed:", responseData.message);
            }
        };

        // update with the data
        fetchMethod(currentUrl + `/api/pets/${petId}`, callback, "PUT", data);
        window.location.reload() //refreshes the page to show updated name

        signupForm.reset();
    });
});
