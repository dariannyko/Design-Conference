export const VIDEO = {
  videoContent: document.querySelector(".video__list"),
  videoFrame: document.querySelector(".video__frame"),
  videoCloseButton: document.querySelectorAll(".video__button-close"),
  videoSlider: document.querySelector(".video__list"),
  buttonPrevious: document.querySelector(".arrow-left"),
  buttonNext: document.querySelector(".arrow-right"),
  videoSliderItems: [...document.querySelectorAll(".video__item")],
  videoSection: document.querySelector(".video"),
  videoSliderButtonsWrapper: document.querySelector(".video__slider-buttons"),
  videoSliderStep: 1,
};

let itemNumber = 0;
let step = 0;

export function openVideoTab(event) {
  event.preventDefault();
  let currentVideoPlayer = event.target.closest(".video__item");
  let currentVideoPreview = document.querySelector(
    "#" + currentVideoPlayer.dataset.videoButton
  );
  let videoContainer = currentVideoPreview.closest(".video__player");

  if (!currentVideoPlayer) return;
  currentVideoPlayer.classList.add("no-hover");
  currentVideoPreview.classList.add("video__preview--open");
  VIDEO.videoFrame.classList.remove("none");
  videoContainer
    .querySelector(".video__button-close")
    .classList.remove("video__button-close--hidden");
}

export function stopVideo(element) {
  let iframe = element.querySelector("iframe");
  let video = element.querySelector("video");
  if (iframe) {
    let iframeSrc = iframe.src;
    iframe.src = iframeSrc.replace("?autoplay=1", "");
  }
  if (video) {
    video.pause();
  }
}

export function closeVideoTab() {
  const videoContainer = this.closest(".video__player");
  stopVideo(videoContainer);

  const currentVideoPreview = videoContainer.querySelector(".video__preview");
  const attribute = currentVideoPreview.getAttribute("id");
  let currentVideoPlayer = document.querySelector(
    `[data-video-button = ${attribute}]`
  );
  currentVideoPreview.classList.remove("video__preview--open");
  currentVideoPlayer.classList.remove("no-hover");
  VIDEO.videoFrame.classList.add("none");
  this.classList.add("video__button-close--hidden");
}

export function findVideos() {
  const videos = document.querySelectorAll(".video__preview");

  videos.forEach((item) => {
    setupVideo(item);
  });
}

export function setupVideo(video) {
  const link = video.querySelector(".video__link");
  const media = video.querySelector(".video__media");
  const button = video.querySelector(".video__button");
  const id = parseMediaURL(media);

  video.addEventListener("click", () => {
    const iframe = createIframe(id);
    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute("href");
  video.classList.add("video__preview--enabled");
}

export function parseMediaURL(media) {
  const regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\//;
  const url = media.src;
  const match = url.match(regexp);

  return match[1];
}

export function createIframe(id) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video__media");

  return iframe;
}

export function generateURL(id) {
  const query = "?autoplay=1";
  return "https://www.youtube.com/embed/" + id + query;
}

//video slider

export function stepForward() {
  if (VIDEO.videoSliderItems[step]) {
    VIDEO.videoSliderItems[step].classList.add("video__item--hover");
  }
  if (VIDEO.videoSliderItems[step - VIDEO.videoSliderStep]) {
    VIDEO.videoSliderItems[step - VIDEO.videoSliderStep].classList.remove(
      "video__item--hover"
    );
  }
  if (!VIDEO.videoSliderItems[step]) {
    step = 0;
    VIDEO.videoSliderItems[step].classList.add("video__item--hover");
  }
  step++;
}

export function stepBack() {
  if (VIDEO.videoSliderItems[step - VIDEO.videoSliderStep]) {
    VIDEO.videoSliderItems[step - VIDEO.videoSliderStep].classList.remove(
      "video__item--hover"
    );
  }
  if (VIDEO.videoSliderItems[step - VIDEO.videoSliderStep * 2]) {
    VIDEO.videoSliderItems[step - VIDEO.videoSliderStep * 2].classList.add(
      "video__item--hover"
    );
  }
  step--;
}

export function closeVideoHover() {
  const videoItemActive = this.querySelector(".video__item--hover");
  if (videoItemActive) {
    videoItemActive.classList.remove("video__item--hover");
  }
  step = 0;
}
