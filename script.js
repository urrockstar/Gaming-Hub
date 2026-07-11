/* =========================
   PROFESSIONAL NAVBAR
========================= */

const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const body = document.body;

if (navbarToggle && navbarMenu) {

  function openMenu() {
    navbarToggle.classList.add("active");
    navbarMenu.classList.add("active");

    navbarToggle.setAttribute("aria-expanded", "true");

    body.style.overflow = "hidden";
  }

  function closeMenu() {
    navbarToggle.classList.remove("active");
    navbarMenu.classList.remove("active");

    navbarToggle.setAttribute("aria-expanded", "false");

    body.style.overflow = "";
  }

  function toggleMenu() {

    if (navbarMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }

  }

  navbarToggle.addEventListener("click", toggleMenu);


  const navLinks = navbarMenu.querySelectorAll("a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      closeMenu();

    });

  });

  document.addEventListener("click", (event) => {

    const clickedInsideMenu =
      navbarMenu.contains(event.target);

    const clickedToggle =
      navbarToggle.contains(event.target);

    if (
      navbarMenu.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedToggle
    ) {

      closeMenu();

    }

  });

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      navbarMenu.classList.contains("active")
    ) {

      closeMenu();

    }

  });

}
/* =========================
   DARK / LIGHT MODE
========================= */
function updateToggleIcon() {
  const btn = document.querySelector(".mode-toggle");
  if (!btn) return;

  btn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
}

(function initMode() {
  const mode = localStorage.getItem("mode") || "dark";

  if (mode === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.add("light-mode");
  }

  updateToggleIcon();
})();

function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  localStorage.setItem(
    "mode",
    document.body.classList.contains("dark-mode")
      ? "dark"
      : "light"
  );

  updateToggleIcon();
}

/* =========================
   HERO SLIDESHOW
========================= */
(function startSlideshow() {

  const hero = document.getElementById("hero");
  const slideshow = document.getElementById("slideshow");

  if (!hero || !slideshow) return;

  const slidePaths = [
    "images/slide1.jpg",
    "images/slide2.jpg",
    "images/slide3.jpg",
    "images/slide4.jpg"
  ];

  hero.style.backgroundImage = `url('${slidePaths[0]}')`;

  const slides = slideshow.querySelectorAll(".slide");

  let loadedCount = 0;
  let started = false;

  function startNow() {
    if (started) return;

    started = true;
    hero.style.backgroundImage = "";
    slideshow.classList.add("started");
  }

  slidePaths.forEach((src, idx) => {

    const img = new Image();
    img.src = src;

    img.onload = () => {

      loadedCount++;

      if (idx === 0 && slides[0]) {
        slides[0].style.opacity = "1";
      }

      if (loadedCount === slidePaths.length) {
        startNow();
      }
    };

    img.onerror = () => {

      loadedCount++;

      if (loadedCount === slidePaths.length) {
        startNow();
      }
    };
  });

  setTimeout(startNow, 2000);

})();


/* =========================
   ACTIVE NAV ON SCROLL
========================= */

const pageSections = document.querySelectorAll("section[id]");
const navMenuLinks = document.querySelectorAll(".navbar-menu a");

if (pageSections.length > 0) {

  window.addEventListener("scroll", () => {

    let current = "";

    pageSections.forEach((section) => {

      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      const sectionMiddle = sectionTop + sectionHeight / 3;

      if (window.scrollY >= sectionMiddle) {
        current = section.id;
      }

    });

    navMenuLinks.forEach((link) => {

      const href = link.getAttribute("href");

      if (href.startsWith("#")) {

        link.classList.remove("active");

        if (href === "#" + current) {
          link.classList.add("active");
        }

      }

    });

  });

}

/* =========================
   ACTIVE PAGE LINK
========================= */

const currentPage =
  window.location.pathname.split("/").pop();

navMenuLinks.forEach((link) => {

  const href = link.getAttribute("href");

  if (
    href === currentPage ||
    (currentPage === "" && href === "index.html")
  ) {
    link.classList.add("active");
  }

});
window.addEventListener("scroll", () => {

  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});
/* =========================
     FOOTER YEAR
========================= */
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {

  const revealObserver = new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }

  );

  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

} else {

  /* Fallback for older browsers */

  revealElements.forEach((element) => {

    element.classList.add("active");

  });

}
/* =========================
   SCROLL PROGRESS BAR
========================= */

const scrollProgressBar = document.getElementById("scroll-progress-bar");

if (scrollProgressBar) {

  function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    scrollProgressBar.style.width = `${progress}%`;

  }

  window.addEventListener("scroll", updateScrollProgress);

  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

}

/* =========================
   BACK TO TOP BUTTON
========================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  });

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}

/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {

  const preloader = document.getElementById("preloader");

  if (preloader) {

    preloader.classList.add("hide");

    setTimeout(() => {

      preloader.remove();

    }, 500);

  }

});
/* =========================
   CUSTOM CURSOR
========================= */

if (window.matchMedia("(pointer:fine)").matches) {

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

  });

  function animateRing() {

    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animateRing);

  }

  animateRing();

  document
    .querySelectorAll("a, button")
    .forEach((element) => {

      element.addEventListener("mouseenter", () => {

        ring.classList.add("hover");

      });

      element.addEventListener("mouseleave", () => {

        ring.classList.remove("hover");

      });

    });

}