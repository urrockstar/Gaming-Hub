/* =========================
   MOBILE NAV TOGGLE
========================= */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}
/* =========================
   NAVBAR TOGGLE (drawer menu)
========================= */
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle) {
  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
}


/* =========================
   DARK/LIGHT MODE
========================= */
function updateToggleIcon() {
  const btn = document.querySelector('.mode-toggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
}

(function initMode() {
  const mode = localStorage.getItem('mode') || 'dark';
  document.body.classList.add(mode === 'dark' ? 'dark-mode' : 'light-mode');
  updateToggleIcon();
})();

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  localStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateToggleIcon();
}

/* =========================
   SLIDESHOW
========================= */
(function startSlideshow() {
  const slidePaths = [
    'images/slide1.jpg',
    'images/slide2.jpg',
    'images/slide3.jpg',
    'images/slide4.jpg'
  ];
  const hero = document.getElementById('hero');
  const slideshow = document.getElementById('slideshow');
  if (!hero || !slideshow) return;

  // fallback background
  hero.style.backgroundImage = `url('${slidePaths[0]}')`;

  const slides = slideshow.querySelectorAll('.slide');
  let loadedCount = 0;
  let started = false;

  const startNow = () => {
    if (started) return;
    started = true;
    hero.style.backgroundImage = '';
    slideshow.classList.add('started');
  };

  slidePaths.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (idx === 0) {
        slides[0].style.opacity = '1';
        hero.style.backgroundImage = `url('${src}')`;
      }
      if (loadedCount === slidePaths.length) startNow();
    };
    img.onerror = () => {
      loadedCount++;
      console.warn("Failed to load image:", src);
      if (loadedCount === slidePaths.length) startNow();
    };
  });

  // fallback start if slow
  setTimeout(startNow, 2000);
})();
