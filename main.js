/* ============================================================
   Anthony Sardain — Personal Site JS
   ============================================================ */

// ── Mobile menu toggle ──
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Scroll reveal ──
const revealElements = document.querySelectorAll(
  '#about .container > *, #work .container > *, #projects .container > *, #contact .container > *, #footer .container > *'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = '#fff';
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ── Nav background opacity on scroll ──
const nav = document.getElementById('nav');
function updateNav() {
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(0,0,0,0.95)';
  } else {
    nav.style.background = 'rgba(0,0,0,0.85)';
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
