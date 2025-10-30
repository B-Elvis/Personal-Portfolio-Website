const scrollContainer = document.getElementById("scroll-container");
let scrollTarget = scrollContainer.scrollTop;
let isScrolling = false;
const ease = 0.0575;

function smoothScroll() {
  const current = scrollContainer.scrollTop;
  const diff = scrollTarget - current;
  const move = diff * ease;

  scrollContainer.scrollTop = current + move;

  if (Math.abs(diff) > 0.5) {
    requestAnimationFrame(smoothScroll);
  } else {
    isScrolling = false;
  }
}

scrollContainer.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    scrollTarget += e.deltaY;

    scrollTarget = Math.max(
      0,
      Math.min(
        scrollTarget,
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      )
    );

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(smoothScroll);
    }
  },
  { passive: false }
);

document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById("scroll-container");
  const nav = document.querySelector("nav");
  const nav_button = document.querySelector(".nav_button a");
  const nav_text = document.querySelectorAll("nav a");
  const logo = document.querySelector(".logo");
  const originalPadding = 24;

  scrollContainer.addEventListener("scroll", () => {
    const scrollY = scrollContainer.scrollTop;

    if (scrollY > 20) {
      nav_button.style.padding = "8px 22px";
      logo.style.fontSize = "24px";
      nav.style.padding = `${originalPadding / 2 + 8}px var(--margin-inline)`;
      nav_text.forEach((el) => (el.style.fontSize = "14px"));
    } else {
      nav_button.style.padding = "12px 30px";
      logo.style.fontSize = "28px";
      nav.style.padding = `${originalPadding}px var(--margin-inline)`;
      nav_text.forEach((el) => (el.style.fontSize = "16px"));
    }
  });
  const sections = scrollContainer.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      root: scrollContainer,
      threshold: 0.125,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

const keyframes = [
  { transform: "translateX(0%)" },
  { transform: "translateX(-100%)" },
];

const baseDuration = 28000;
document.addEventListener("DOMContentLoaded", () => {
  const allCopies = document.querySelectorAll(".first_copy");
  const container = document.querySelector(".carousel_container");

  const animations = [];

  allCopies.forEach((copy) => {
    const anim = copy.animate(keyframes, {
      duration: baseDuration,
      iterations: Infinity,
      easing: "linear",
    });
    animations.push(anim);
  });

  container.addEventListener("mouseenter", () => {
    animations.forEach((a) => a.updatePlaybackRate(0.42));
  });

  container.addEventListener("mouseleave", () => {
    animations.forEach((a) => a.updatePlaybackRate(1));
  });
});
