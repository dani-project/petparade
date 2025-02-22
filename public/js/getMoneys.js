const authToken = localStorage.getItem("token");

if (authToken) {
    const decodedToken = jwt_decode(authToken);
    user_id = decodedToken.userId;
    console.log("messaging user id is " + user_id);
} //decoding of the token to get the user id of the user that is logged in

document.addEventListener("DOMContentLoaded", function () {
    const moneysValue = document.getElementById("moneysValue");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        console.log("MONEYS IS " + responseData.moneys);

        const userMoneys = responseData.moneys; // retrieve moneys of the user logged in

        moneysValue.innerText = `Moneys: $${userMoneys}`; // to show moneys in the nav bar

        moneysValue.classList.add("custom-moneys-text");
    };

    fetchMethod(`${currentUrl}/api/users/${user_id}`, callback, 'GET', null);
});
