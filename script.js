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

// Navigation scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 100);
}, { passive: true });

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
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

  document.querySelectorAll('.work-item, .service, .process__step, .testimonial, .about__content, .contact__inner').forEach(el => {
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
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const original = btn.textContent;

  btn.textContent = 'Sent';
  btn.style.background = 'var(--khaki-dark)';
  contactForm.reset();

  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 3000);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
