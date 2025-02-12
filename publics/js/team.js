document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".team-slider");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let currentIndex = 0;

  const updateSlider = () => {
    const cardWidth = document.querySelector(".team-card").offsetWidth;
    slider.style.transform = `translateX(-${currentIndex * cardWidth * 3}px)`;
  };

  rightArrow.addEventListener("click", () => {
    const totalCards = document.querySelectorAll(".team-card").length;
    const maxIndex = Math.ceil(totalCards / 3) - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
});
