export const CARD = {
  card: document.querySelectorAll(".for-whom .product-card"),
  wrapper: document.querySelector(".for-whom__list"),
  countContainer: document.querySelector(".count"),
  maxOpacity: 1,
  minOpacity: 0.2,
};

export function dragDropCards(currentMarginLeft, card) {
  const count = card.dataset.count;
  const nextCount = card.dataset.count - 1;
  const currentCard = card;
  currentCard.style.cursor = "grabbing";

  let shiftX = event.clientX - currentCard.getBoundingClientRect().left;

  document.addEventListener("pointermove", onMouseMove);
  document.addEventListener("pointerup", () => {
    onMouseUp();
    currentCard.style.cursor = "grab";
  });

  function onMouseMove(event) {
    event.preventDefault();
    let newLeft =
      event.clientX - shiftX - CARD.wrapper.getBoundingClientRect().left;

    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = CARD.wrapper.offsetWidth - currentCard.offsetWidth;

    if (newLeft < rightEdge) {
      currentCard.style.marginLeft = currentMarginLeft;
      if (currentCard.nextElementSibling) {
        currentCard.nextElementSibling.style.pointerEvents = "none";
      }
      if (currentCard.previousElementSibling) {
        if (newLeft === 0) {
          currentCard.previousElementSibling.style.pointerEvents = "unset";
        } else {
          currentCard.previousElementSibling.style.pointerEvents = "none";
        }
      }
    } else {
      newLeft = rightEdge;
      currentCard.style.marginLeft = "0";
      if (currentCard.nextElementSibling) {
        currentCard.nextElementSibling.style.pointerEvents = "unset";
      }
      if (currentCard.previousElementSibling) {
        currentCard.previousElementSibling.style.pointerEvents = "unset";
      }
    }

    currentCard.style.left = newLeft + "px";
    currentCard.style.opacity = CARD.maxOpacity - newLeft / rightEdge / 2;
    if (currentCard.nextElementSibling) {
      currentCard.nextElementSibling.style.opacity =
        CARD.minOpacity + newLeft / rightEdge;
    }

    if (currentCard.previousElementSibling) {
      if (newLeft === rightEdge) {
        currentCard.previousElementSibling.style.display = "none";
      } else {
        currentCard.previousElementSibling.style.display = "flex";
      }
    }

    if (newLeft > currentCard.offsetWidth) {
      CARD.countContainer.innerHTML = `(0${nextCount})`;
    } else {
      CARD.countContainer.innerHTML = `(0${count})`;
    }
  }

  function onMouseUp() {
    document.removeEventListener("pointerup", onMouseUp);
    document.removeEventListener("pointermove", onMouseMove);
  }
}
