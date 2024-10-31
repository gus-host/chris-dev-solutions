"use strict";

console.log(document.querySelector(".header"));
// Slider
const sliderFunc = function () {
  // BUILDING A SLIDER COMPONENT - 1

  let curSlide = 0;
  const slides = document.querySelectorAll(".listing");
  const slider = document.querySelector(".latest-listings");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".next-btn");
  const dotContainer = document.querySelector(".dots");

  console.log(slides, btnRight);

  const goToSlide = function (curSlide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  };

  //0% 100% 200% 300%
  // -------next slide--------
  const slide = function () {
    this[0] === slides.length ? curSlide++ : curSlide--;
    if (curSlide === this[0]) curSlide = this[1];

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const nextSlide = slide.bind([slides.length, 0]);
  // const prevSlide = slide.bind([-1, slides.length - 1]);
  btnRight.addEventListener("click", nextSlide);
  // btnLeft.addEventListener("click", prevSlide);

  // BUILDING A SLIDER COMPONENT - 2 -> Making the dots work

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  function activateDot(slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(curSlide);
  };

  init();

  document.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);

      activateDot(slide);
    }
  });
  console.log(slides, btnRight);
};
sliderFunc();
