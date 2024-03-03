const slider = document.querySelector("[data-slider]");
const track = slider.querySelector("[data-slider-track]");
const prev = slider.querySelector("[data-slider-prev]");
const next = slider.querySelector("[data-slider-next]");
const slides = Array.from(track.querySelectorAll(".slide"));

if (track) {
  prev.addEventListener("click", () => {
    next.removeAttribute("disabled");

    track.scrollTo({
      left: track.scrollLeft - track.firstElementChild.offsetWidth,
      behavior: "smooth"
    });
  });

  next.addEventListener("click", () => {
    prev.removeAttribute("disabled");

    track.scrollTo({
      left: track.scrollLeft + track.firstElementChild.offsetWidth,
      behavior: "smooth"
    });
  });

  track.addEventListener("scroll", () => {
    const trackScrollWidth = track.scrollWidth;
    const trackOuterWidth = track.clientWidth;

    prev.removeAttribute("disabled");
    next.removeAttribute("disabled");

    if (track.scrollLeft <= 0) {
      prev.setAttribute("disabled", "");
    }

    if (track.scrollLeft === trackScrollWidth - trackOuterWidth) {
      next.setAttribute("disabled", "");
    }
    slides.forEach((slide) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 1;
      const trackCenter = track.getBoundingClientRect().left + track.offsetWidth / 1;

      if (Math.abs(slideCenter - trackCenter) < slideRect.width / 1) {
        slide.classList.add("active");
        track.style.height = `${slide.offsetHeight}px`;
      } else {
        slide.classList.remove("active");
      }
    });
  });
}
