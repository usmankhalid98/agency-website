// Detect touch device
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Custom cursor (desktop only)
if (!isTouch) {
  const cursor = document.getElementById('cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('cursor--visible');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--visible');
  });

  document.querySelectorAll('a, button, .work-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
}

// Navigation scroll (only on pages without nav--case)
const nav = document.getElementById('nav');
if (nav && !nav.classList.contains('nav--case')) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 100);
  }, { passive: true });
}

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function toggleMenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const isOpen = navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
  nav.classList.toggle('nav--open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  navLinks.classList.remove('active');
  navToggle.classList.remove('active');
  nav.classList.remove('nav--open');
  document.body.style.overflow = '';
}

// Use pointerdown for faster, more reliable mobile response; fall back to click
if (window.PointerEvent) {
  navToggle.addEventListener('pointerdown', toggleMenu);
} else {
  navToggle.addEventListener('touchstart', toggleMenu, { passive: false });
  navToggle.addEventListener('click', toggleMenu);
}

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Reveal on scroll (desktop only — mobile shows everything immediately)
if (!isTouch) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(
          entry.target.classList.contains('reveal-stagger')
            ? 'reveal-stagger--visible'
            : 'reveal--visible'
        );
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.work-card, .service, .process__step, .testimonial, .about__content, .contact__inner, .case-section, .case-featured, .case-images, .case-deliverable').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.services__grid, .process__steps').forEach(el => {
    el.classList.add('reveal-stagger');
    revealObserver.observe(el);
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const contactReset = document.getElementById('contactReset');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.reset();
    contactForm.classList.add('hidden');
    contactSuccess.classList.add('active');
  });
}

if (contactReset) {
  contactReset.addEventListener('click', () => {
    contactSuccess.classList.remove('active');
    contactForm.classList.remove('hidden');
  });
}

// Smooth scroll (exclude bare "#" to avoid double-handling the logo link)
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fix iOS 100vh issue
function setVH() {
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
}
setVH();
window.addEventListener('resize', setVH);
