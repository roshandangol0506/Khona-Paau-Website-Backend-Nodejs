window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled"); // Add the "scrolled" class
  } else {
    navbar.classList.remove("scrolled"); // Remove the "scrolled" class
  }
});
