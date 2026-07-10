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

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
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