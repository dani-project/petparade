
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.getElementById("logoutButton");

  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    const authToken = localStorage.getItem("token");
    console.log("TOKEN IS " + authToken);
    const decodedToken = jwt_decode(authToken);
    console.log("DECODED TOKEN IS ", decodedToken);
    const user_id = decodedToken.userId;
    console.log("USER ID IS " + user_id);
    // Token exists, show profile button and hide login and register buttons
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
    profileButton.classList.remove("d-none");
    logoutButton.classList.remove("d-none");
  } else {
    // Token does not exist, show login and register buttons and hide profile and logout buttons
    loginButton.classList.remove("d-none");
    registerButton.classList.remove("d-none");
    profileButton.classList.add("d-none");
    logoutButton.classList.add("d-none");
  }

  logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});