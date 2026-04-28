/* ================================================================
   DentaCare — main.js
   Vanilla JS, no dependencies.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  initBurger();
  initFAQ();
  initAccessibility();
  initSmoothScroll();
  initForms();
  initActiveNav();
  initAnimations();
  initCookieBanner();
  initWorkStatus();
});

/* ================================================================
   INJECT STYLES
   ================================================================ */
function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .form-field.error input,
    .form-field.error select,
    .form-field.error textarea {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
    }
    .field-error {
      font-size: 0.8rem;
      color: #ef4444;
      margin-top: 4px;
      display: block;
    }
    .form-success {
      background: #f0fdf4;
      border: 1.5px solid #22c55e;
      border-radius: 8px;
      padding: 20px 24px;
      text-align: center;
      color: #15803d;
      font-weight: 600;
      font-size: 1rem;
    }
    .faq-item__answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease;
    }
    .error-checkbox { color: #ef4444 !important; }
    .checkbox-error {
      font-size: 0.8rem;
      color: #ef4444;
      margin-top: 4px;
      display: block;
    }
  `;
  document.head.appendChild(style);
}

/* ================================================================
   1. BURGER MENU
   ================================================================ */
function initBurger() {
  const burger = document.querySelector('.burger');
  const menu   = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    menu.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-label', 'Закрыть меню');
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('hidden', '');
    document.body.style.overflow = '';
    burger.setAttribute('aria-label', 'Открыть меню');
  }

  function isOpen() {
    return burger.getAttribute('aria-expanded') === 'true';
  }

  burger.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && isOpen()) closeMenu();
  });
}

/* ================================================================
   2. FAQ ACCORDION
   ================================================================ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const answer = item.querySelector('.faq-item__answer');
    if (!answer) return;
    answer.style.maxHeight = '0';
    answer.style.display = 'block';
  });

  function closeItem(item) {
    const btn    = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    if (!answer) return;
    item.classList.remove('open');
    btn && btn.setAttribute('aria-expanded', 'false');
    answer.style.maxHeight = '0';
  }

  function openItem(item) {
    const btn    = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    if (!answer) return;
    item.classList.add('open');
    btn && btn.setAttribute('aria-expanded', 'true');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }

  items.forEach(item => {
    const btn = item.querySelector('.faq-item__question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      items.forEach(other => closeItem(other));
      if (!wasOpen) openItem(item);
    });
  });
}

/* ================================================================
   3. ACCESSIBILITY (visually impaired mode)
   ================================================================ */
function initAccessibility() {
  const btn = document.getElementById('accessibility-toggle');
  if (!btn) return;

  const STORAGE_KEY = 'visually-impaired';

  function apply(enabled) {
    document.body.classList.toggle('visually-impaired', enabled);
    btn.setAttribute('aria-pressed', String(enabled));
    const svg = btn.querySelector('svg');
    btn.textContent = enabled ? 'Обычная версия' : 'Версия для слабовидящих';
    if (svg) btn.prepend(svg);
  }

  const saved = localStorage.getItem(STORAGE_KEY) === 'true';
  if (saved) apply(true);

  btn.addEventListener('click', () => {
    const next = !document.body.classList.contains('visually-impaired');
    apply(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  });
}

/* ================================================================
   4. SMOOTH SCROLL
   ================================================================ */
function initSmoothScroll() {
  const HEADER_OFFSET = 80;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

/* ================================================================
   5. FORM VALIDATION
   ================================================================ */
function initForms() {
  const forms = document.querySelectorAll('form');
  console.log('Forms found:', forms.length);

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(form)) submitForm(form);
    });
  });
}

/* ── Helpers ──────────────────────────────────────────────── */

function getField(form, name) {
  return form.querySelector(`[name="${name}"]`);
}

function getWrapper(input) {
  return input ? input.closest('.form-field') : null;
}

function showError(wrapper, message) {
  if (!wrapper) return;
  wrapper.classList.add('error');
  const existing = wrapper.querySelector('.field-error');
  if (existing) existing.remove();
  const span = document.createElement('span');
  span.className = 'field-error';
  span.setAttribute('role', 'alert');
  span.textContent = message;
  wrapper.appendChild(span);
}

function clearError(wrapper) {
  if (!wrapper) return;
  wrapper.classList.remove('error');
  const err = wrapper.querySelector('.field-error');
  if (err) err.remove();
}

function watchInput(input) {
  if (!input || input.dataset.watched) return;
  input.dataset.watched = '1';
  input.addEventListener('input',  () => clearError(getWrapper(input)));
  input.addEventListener('change', () => clearError(getWrapper(input)));
}

/* ── Checkbox-specific helpers ────────────────────────────── */

function getCheckboxContainer(checkbox) {
  // Prefer .form-consent wrapper, fall back to closest label or parent
  return checkbox.closest('.form-consent')
    || checkbox.closest('label')
    || checkbox.parentElement;
}

function getCheckboxLabel(checkbox) {
  return checkbox.closest('label')
    || (checkbox.id && document.querySelector(`label[for="${checkbox.id}"]`));
}

function showCheckboxError(checkbox, message) {
  const label = getCheckboxLabel(checkbox);
  if (label) label.classList.add('error-checkbox');

  const container = getCheckboxContainer(checkbox);
  const existing  = container.querySelector('.checkbox-error');
  if (existing) existing.remove();

  const span = document.createElement('span');
  span.className = 'checkbox-error';
  span.setAttribute('role', 'alert');
  span.textContent = message;
  container.after(span); // insert after the container, not inside
}

function clearCheckboxError(checkbox) {
  const label = getCheckboxLabel(checkbox);
  if (label) {
    label.classList.remove('error-checkbox');
    const afterLabel = label.nextElementSibling;
    if (afterLabel && afterLabel.classList.contains('checkbox-error')) afterLabel.remove();
  }

  const container = getCheckboxContainer(checkbox);
  const next = container.nextElementSibling;
  if (next && next.classList.contains('checkbox-error')) next.remove();
}

function watchCheckbox(checkbox) {
  if (!checkbox || checkbox.dataset.watchedCb) return;
  checkbox.dataset.watchedCb = '1';
  checkbox.addEventListener('change', () => clearCheckboxError(checkbox));
}

/* ── Core validation ──────────────────────────────────────── */

function validateForm(form) {
  const errors = [];
  const nameRe  = /^[а-яёА-ЯЁa-zA-Z\s\-]{2,}$/;
  const phoneRe = /^[78]\d{10}$|^9\d{9}$/;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ── Name: any text input, or [name="name"], or id containing "name" ──
  const name = form.querySelector(
    'input[type="text"], input[name="name"], input[id*="name"]'
  );
  if (name) {
    watchInput(name);
    if (!nameRe.test(name.value.trim())) {
      showError(getWrapper(name), 'Введите корректное имя (минимум 2 буквы)');
      errors.push(name);
    } else {
      clearError(getWrapper(name));
    }
  }

  // ── Phone: [type="tel"], or [name="phone"], or id containing "phone" ──
  const phone = form.querySelector(
    'input[type="tel"], input[name="phone"], input[id*="phone"]'
  );
  if (phone) {
    watchInput(phone);
    const digits = phone.value.replace(/\D/g, '');
    if (!phoneRe.test(digits)) {
      showError(getWrapper(phone), 'Введите корректный номер телефона (например: +7 999 123-45-67)');
      errors.push(phone);
    } else {
      clearError(getWrapper(phone));
    }
  }

  // ── Email: optional — validate only when filled ────────────
  const email = form.querySelector('input[type="email"]');
  if (email && email.value.trim()) {
    watchInput(email);
    if (!emailRe.test(email.value.trim())) {
      showError(getWrapper(email), 'Введите корректный email');
      errors.push(email);
    } else {
      clearError(getWrapper(email));
    }
  }

  // ── Textarea: if present — must be at least 10 chars ─────
  const textarea = form.querySelector('textarea');
  if (textarea) {
    watchInput(textarea);
    if (textarea.value.trim().length < 10) {
      showError(getWrapper(textarea), 'Введите сообщение (минимум 10 символов)');
      errors.push(textarea);
    } else {
      clearError(getWrapper(textarea));
    }
  }

  // ── Select: if present — must have a non-empty value ──────
  const select = form.querySelector('select');
  if (select) {
    watchInput(select);
    if (!select.value) {
      showError(getWrapper(select), 'Выберите тему обращения');
      errors.push(select);
    } else {
      clearError(getWrapper(select));
    }
  }

  // ── Checkbox: if present in form — must be checked ────────
  const checkbox = form.querySelector('input[type="checkbox"]');
  watchCheckbox(checkbox);
  if (checkbox && !checkbox.checked) {
    errors.push(checkbox);
    const label = form.querySelector('label[for="' + checkbox.id + '"]')
                  || checkbox.closest('label')
                  || checkbox.parentElement;
    const insertAfter = (label && label.parentElement) || label;
    const already = insertAfter && insertAfter.nextElementSibling;
    if (insertAfter && !(already && already.classList.contains('checkbox-error'))) {
      const err = document.createElement('span');
      err.className = 'checkbox-error';
      err.setAttribute('role', 'alert');
      err.textContent = 'Необходимо согласие на обработку данных';
      insertAfter.after(err);
    }
  } else if (checkbox) {
    clearCheckboxError(checkbox);
  }

  // Focus first invalid text/select/textarea field
  if (errors.length > 0) {
    const first = errors.find(el => el.type !== 'checkbox');
    if (first) first.focus();
  }

  return errors.length === 0;
}

/* ── Submit success ───────────────────────────────────────── */

function submitForm(form) {
  const children = Array.from(form.children);
  children.forEach(child => { child.style.display = 'none'; });

  const success = document.createElement('div');
  success.className = 'form-success';
  success.setAttribute('role', 'status');
  success.textContent = '✓ Заявка отправлена! Перезвоним в ближайшее время.';
  form.appendChild(success);

  setTimeout(() => {
    form.reset();
    success.remove();
    children.forEach(child => { child.style.display = ''; });
    form.querySelectorAll('.form-field.error').forEach(w => clearError(w));
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => clearCheckboxError(cb));
  }, 4000);
}

/* ================================================================
   6. ACTIVE NAV LINK
   ================================================================ */
function initActiveNav() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.main-nav__list a, .mobile-menu__list a').forEach(link => {
    link.classList.remove('active');
    const href     = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();
    const match =
      linkPage === page ||
      (page === '' && linkPage === 'index.html') ||
      (page === 'index.html' && linkPage === 'index.html');
    if (match) link.classList.add('active');
  });
}

/* ================================================================
   7. SCROLL ANIMATIONS (IntersectionObserver)
   ================================================================ */
function initAnimations() {
  const targets = document.querySelectorAll('.animate-on-scroll');
  if (!targets.length) return;

  document.documentElement.classList.add('js-anim');

  const vh = window.innerHeight;
  targets.forEach(el => {
    if (el.getBoundingClientRect().top < vh) {
      el.classList.add('is-visible');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    if (!el.classList.contains('is-visible')) observer.observe(el);
  });
}

/* ================================================================
   8. COOKIE BANNER
   ================================================================ */
function initCookieBanner() {
  const banner  = document.getElementById('cookie-banner');
  const accept  = document.getElementById('cookie-accept');
  const decline = document.getElementById('cookie-decline');
  if (!banner) return;

  if (!localStorage.getItem('cookie-consent')) {
    banner.removeAttribute('hidden');
  }

  function dismiss() {
    banner.setAttribute('hidden', '');
  }

  accept  && accept.addEventListener('click',  () => { localStorage.setItem('cookie-consent', 'accepted');  dismiss(); });
  decline && decline.addEventListener('click', () => { localStorage.setItem('cookie-consent', 'declined'); dismiss(); });
}

/* ================================================================
   9. WORK STATUS CHECKER
   ================================================================ */
function initWorkStatus() {
  const badge = document.getElementById('work-status-badge');
  if (!badge) return;

  function checkStatus() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const msk = new Date(utc + 3 * 3600000);
    const hours = msk.getHours();
    const minutes = msk.getMinutes();
    const day = msk.getDay();
    const timeInMinutes = hours * 60 + minutes;

    let isOpen = false;
    if (day >= 1 && day <= 5) {
      isOpen = timeInMinutes >= 480 && timeInMinutes < 1260;
    } else {
      isOpen = timeInMinutes >= 540 && timeInMinutes < 1140;
    }

    if (isOpen) {
      badge.textContent = 'Сейчас открыто';
      badge.style.background = '#22C5A0';
      badge.style.color = '#fff';
    } else {
      badge.textContent = 'Сейчас закрыто';
      badge.style.background = '#ef4444';
      badge.style.color = '#fff';
    }
  }

  checkStatus();
  setInterval(checkStatus, 60000);
}
