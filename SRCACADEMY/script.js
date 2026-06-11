// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => {
        console.log('Service Worker registered successfully', reg);
      })
      .catch(err => {
        console.log('Service Worker registration failed:', err);
      });
  });
}

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

// Active nav link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  if (a.getAttribute('href') === path) a.classList.add('active');
});

// Search → scroll to first match
document.querySelectorAll('.search-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = form.querySelector('input').value.trim().toLowerCase();
    if (!q) return;
    const main = document.querySelector('main') || document.body;
    const el = Array.from(main.querySelectorAll('h1,h2,h3,h4,p,li,a'))
      .find(n => n.textContent.toLowerCase().includes(q));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else alert('No matches found for "' + q + '"');
  });
});

// Visitor counter
(function(){
  const el = document.getElementById('visitor-count');
  if (!el) return;
  const v = parseInt(localStorage.getItem('src_visits') || '0', 10) + 1;
  localStorage.setItem('src_visits', String(v));
  el.textContent = (v + 1247).toLocaleString();
})();

// Newsletter
document.querySelectorAll('.newsletter').forEach(f => {
  f.addEventListener('submit', e => { e.preventDefault(); alert('Thanks for subscribing!'); f.reset(); });
});

// CAPTCHA
function initCaptcha() {
  const captchaEl = document.getElementById('captcha-q');
  if (!captchaEl) return;
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  captchaEl.textContent = `${a} + ${b} = ?`;
  captchaEl.dataset.answer = a + b;
}
initCaptcha();

// Register form
const regForm = document.getElementById('register-form');
if (regForm) {
  regForm.addEventListener('submit', e => {
    e.preventDefault();
    const captcha = document.getElementById('captcha-q');
    const answer = document.getElementById('captcha-input').value.trim();
    const robotCheck = document.getElementById('robot-check');
    if (!robotCheck.checked) {
      alert('Please confirm that you are not a robot.');
      return;
    }
    if (answer !== captcha.dataset.answer) {
      alert('Captcha incorrect. Try again.');
      initCaptcha();
      return;
    }
    document.getElementById('reg-success').style.display = 'block';
    regForm.reset();
    initCaptcha();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Book form
const bookForm = document.getElementById('book-form');
if (bookForm) {
  bookForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('book-success').style.display = 'block';
    bookForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// YouTube iframes are automatically muted and autoplay enabled via URL parameters
