const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".slider");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    slider.style.transform = `translateX(-${index * 33.3333}%)`;
  });
});
