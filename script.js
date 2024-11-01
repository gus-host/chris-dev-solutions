"use strict";
import { createAppKit } from "@reown/appkit";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";

const droplistings = document.querySelectorAll(".droplisting");
const preserveBtns = document.querySelectorAll(".preserve-btn");
const headerImgBox = document.querySelector(".header-img-box");
headerImgBox.addEventListener("click", () => {
  window.location.href = "./index.html";
});

// Slider
const sliderFunc = function () {
  // BUILDING A SLIDER COMPONENT - 1

  let curSlide = 0;
  const slides = document.querySelectorAll(".listing");
  const slider = document.querySelector(".latest-listings");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".next-btn");
  const dotContainer = document.querySelector(".dots");

  console.log(droplistings);

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

const droplisting = function () {
  return ` <div class="droplisting droplisting--1">
          <div class="drop-img-box">
            <img
              src="./public/img/drop-img--1.png"
              alt=""
              class="drop-img drop-img--1"
            />
          </div>
          <div class="drop-feature-box">
            <img
              src="./public/img/verified-artist--1.png"
              alt="Verified artist name"
              class="verifiedartist verified-artist--1"
            />
            <p class="art-name">African LAMA</p>
            <div class="drop-sales">
              <div class="price-box">
                <p class="price-heading">price</p>
                <p class="price">0.0034 ETH</p>
              </div>
              <div class="sales-box">
                <p class="sales-heading">Last Sales</p>
                <p class="sales-">0.003 ETH</p>
              </div>
            </div>
            <a href="" class="preserve-btn hidden"
              ><p>Preserve</p>
              <span class="shop-cart-cont"
                ><img
                  src="./public/img/btn-shopping-cart.png"
                  alt="shopping-cart-icon"
                  class="btn-shopping-cart" /></span
            ></a>
          </div>
  `;
};

// 1. Get projectId from https://cloud.reown.com
const projectId = "f769e00b28ac56af603b09c4a7d13389";

// 2. Create your application's metadata object
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "http://localhost:5173/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Create a AppKit instance
export const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

droplistings.forEach((drop, i) => {
  drop.addEventListener("mouseenter", (e) => {
    preserveBtns[i].classList.remove("hidden");
  });
});
droplistings.forEach((drop, i) => {
  drop.addEventListener("mouseleave", (e) => {
    preserveBtns[i].classList.add("hidden");
  });
});

preserveBtns.forEach((prBtn, i) => {
  prBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (modal.getAddress() === null) {
      console.log("connect wallet first");
      modal.open();
    }
    if (modal.getAddress) {
      window.location.href = "./public/arts/index.html";
    }
    console.log(modal.getAddress(), modal.getIsConnectedState());
  });
});

console.log(modal);

// Trigger modal programaticaly
// Add this code inside `main.js` file at the end of the code file
const openConnectModalBtn = document.getElementById("open-connect-modal");

// const openNetworkModalBtn = document.getElementById('open-network-modal')
openConnectModalBtn.addEventListener("click", function () {
  modal.open();
});

modal.getEvent(); // get last event
modal.subscribeEvents((event) => {
  if (event.data.event === "CONNECT_SUCCESS") {
    window.location.href = "./public/arts/index.html";
    console.log("wallet connected");
  }

  console.log(event.data.event);
});

// openNetworkModalBtn.addEventListener('click', () => modal.open({ view: 'Networks' }))
