document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuBackground = document.querySelectorAll("main, footer");
const mobileNavigation = window.matchMedia("(max-width: 960px)");

const closeMenu = (restoreFocus = false) => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  menuBackground.forEach((element) => { element.inert = false; });
  if (restoreFocus) menuToggle.focus();
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
  menuBackground.forEach((element) => { element.inert = !isOpen; });
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
mobileNavigation.addEventListener("change", () => closeMenu());
window.addEventListener("keydown", (event) => {
  if (menuToggle?.getAttribute("aria-expanded") !== "true") return;
  if (event.key === "Escape") closeMenu(true);
  if (event.key === "Tab") {
    const links = [...navigation.querySelectorAll("a")];
    const lastLink = links[links.length - 1];
    if (event.shiftKey && document.activeElement === menuToggle) {
      event.preventDefault();
      lastLink?.focus();
    } else if (!event.shiftKey && document.activeElement === lastLink) {
      event.preventDefault();
      menuToggle.focus();
    }
  }
});

const typewriter = document.querySelector("[data-typewriter]");

if (typewriter && !reduceMotion) {
  const copy = window.matchMedia("(max-width: 640px)").matches
    ? typewriter.dataset.typewriterMobile
    : typewriter.dataset.typewriter;
  typewriter.textContent = "";
  let character = 0;

  const typeNext = () => {
    character += 1;
    typewriter.textContent = copy.slice(0, character);

    if (character < copy.length) {
      window.setTimeout(typeNext, character === 11 ? 240 : 42);
    } else {
      typewriter.classList.add("is-complete");
    }
  };

  window.setTimeout(typeNext, 450);
} else {
  if (typewriter) {
    typewriter.textContent = window.matchMedia("(max-width: 640px)").matches
      ? typewriter.dataset.typewriterMobile
      : typewriter.dataset.typewriter;
  }
  typewriter?.classList.add("is-complete");
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-accordion] button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    const accordion = item?.closest("[data-accordion]");
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const wasOpen = item?.classList.contains("is-open");

    accordion?.querySelectorAll(".accordion-item").forEach((otherItem) => {
      const otherButton = otherItem.querySelector("button");
      const otherPanel = document.getElementById(otherButton?.getAttribute("aria-controls"));
      otherItem.classList.remove("is-open");
      otherButton?.setAttribute("aria-expanded", "false");
      if (otherPanel) {
        window.setTimeout(() => {
          if (!otherItem.classList.contains("is-open")) otherPanel.hidden = true;
        }, 360);
      }
    });

    if (!wasOpen && item && panel) {
      panel.hidden = false;
      requestAnimationFrame(() => {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      });
    }
  });
});

const slides = [...document.querySelectorAll("[data-slide]")];
const dotsContainer = document.querySelector(".carousel-dots");
let activeSlide = 0;

const showSlide = (index) => {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.hidden = !isActive;
    slide.classList.toggle("is-active", isActive);
  });

  dotsContainer?.querySelectorAll("button").forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

slides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer?.appendChild(dot);
});

document.querySelector("[data-carousel-prev]")?.addEventListener("click", () => showSlide(activeSlide - 1));
document.querySelector("[data-carousel-next]")?.addEventListener("click", () => showSlide(activeSlide + 1));
showSlide(0);

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

// Load YouTube only after an explicit play action. The link also works without JS.
document.querySelector("[data-video-play]")?.addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const player = document.querySelector("[data-video-player]");
  if (!player) return;
  event.preventDefault();
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube-nocookie.com/embed/TxkcoPLQ5YA?autoplay=1&rel=0&playsinline=1";
  iframe.title = "How to create proposal decks with Claude — Tyde workshop";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  player.replaceChildren(iframe);
  iframe.focus();
});
