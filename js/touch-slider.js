let startX;
let scrollLeft;
export const SLIDER = {
  isDown: false,
};

export function onMouseDown(event, slider) {
  SLIDER.isDown = true;
  slider.style.cursor = "grabbing";
  startX = event.clientX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

export function onMouseUp(slider) {
  SLIDER.isDown = false;
  slider.style.cursor = "grab";
}

export function onMouseMove(event, slider) {
  if (!SLIDER.isDown) return;
  event.preventDefault();
  const x = event.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.7;
  slider.scrollLeft = scrollLeft - walk;
}
