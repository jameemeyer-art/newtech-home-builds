/* NewTech Home Builds — main.js */

/* ── Navigation ───────────────────────────────────────────── */
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

/* ── Gallery Filter ───────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item[data-cat]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    galleryItems.forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
      item.classList.toggle('hidden', !show);
    });
  });
});

/* ── Lightbox ─────────────────────────────────────────────── */
const lightbox = document.querySelector('.lightbox');
const lbImg    = lightbox?.querySelector('img');
const lbCaption = lightbox?.querySelector('.lightbox-caption');
const lbClose  = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
  item.addEventListener('click', () => {
    lbImg.src = item.dataset.src;
    lbImg.alt = item.dataset.caption || '';
    if (lbCaption) lbCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lbClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox?.classList.remove('active');
  document.body.style.overflow = '';
}

/* ── Stat Counter ─────────────────────────────────────────── */
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current.toLocaleString() + suffix;
  }, 25);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num[data-count]').forEach(el => {
        const val    = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        animateCount(el, val, suffix);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-bar').forEach(el => observer.observe(el));

/* ── Booking Form ─────────────────────────────────────────── */
const bookingForm = document.getElementById('bookingForm');
bookingForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = bookingForm.querySelector('button[type=submit]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    bookingForm.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1200);
});

/* ── Scroll Reveal ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testi-card, .value-card, .team-card, .process-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});
