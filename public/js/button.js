function scrollToTop() { // button to go up
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("scroll", function () {
  var button = document.getElementById("backToTopBtn");
  button.classList.toggle("show", window.scrollY >= 0);
});

function scrollToBottom() { // button to go down
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

window.addEventListener("scroll", function () {
  var button = document.getElementById("backToBottomBtn");
  button.classList.toggle("show", window.scrollY >= 0);
});
