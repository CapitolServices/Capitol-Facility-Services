// Capitol Facility Services — shared site JS
// In-memory only (no localStorage/sessionStorage) — sandbox safe

(function () {
  // ---- theme toggle (in-memory; defaults to light) ----
  const root = document.documentElement;
  root.setAttribute('data-theme', 'light');
  const toggle = document.querySelector('[data-theme-toggle]');

  function currentTheme() {
    const explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return 'light';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      toggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // ---- mobile nav ----
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks  = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- active nav state ----
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav-links] a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // ---- year ----
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();

// ---- contact / partner form mailto composer ----
function composeMailto(formId, to, subject, statusId) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [];

    // Collect all keys
    const keys = new Set();
    for (const [k] of data.entries()) keys.add(k);

    keys.forEach(key => {
      const values = data.getAll(key);
      if (values.length === 0) return;
      // Skip empties
      const joined = values.filter(v => v && String(v).trim() !== '').join(', ');
      if (!joined) return;
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      lines.push(`${label}: ${joined}`);
    });

    const body = lines.join('\n');
    const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show fallback first so it's always visible
    if (status) {
      status.innerHTML =
        `Opening your email client to send this message to ` +
        `<a href="mailto:${to}">${to}</a>. ` +
        `If nothing happens, copy this email address and paste your message manually.`;
      status.classList.add('show');
    }

    // Trigger mailto
    window.location.href = url;
  });
}
