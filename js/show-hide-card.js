export const forBeginnersCard = document.querySelector(
  ".our-speakers .product-card:first-child"
);
const productCardsWrapper = document.querySelector(
  ".our-speakers__product-cards"
);
const hiddenCard = document.querySelector(
  ".our-speakers .product-card:nth-child(2)"
);
let isSlider = false;

export function showHideCard(slider) {
  if (!isSlider) {
    slider.classList.add("visible");
    productCardsWrapper.classList.add("hidden");
    setTimeout(() => {
      hiddenCard.classList.add("none");
    }, 400);

    isSlider = true;
  } else {
    hiddenCard.classList.remove("none");
    setTimeout(() => {
      productCardsWrapper.classList.remove("hidden");
      slider.classList.remove("visible");
    }, 20);

    forBeginnersCard.style.pointerEvents = "none";
    setTimeout(() => {
      forBeginnersCard.style.pointerEvents = "all";
    }, 500);

    isSlider = false;
  }
}
