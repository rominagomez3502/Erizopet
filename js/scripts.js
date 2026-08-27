(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ✅ Año actual
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // ✅ Scroll para CTAs (data-scroll)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-scroll]');
    if (!btn) return;

    const targetSel = btn.getAttribute('data-scroll');
    const el = document.querySelector(targetSel);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ✅ Toast simple para botones de Login/Registro (solo UI)
  const toast = $('#toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-on');
    toast.setAttribute('aria-hidden', 'false');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-on');
      toast.setAttribute('aria-hidden', 'true');
    }, 2200);
  }

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open]');
    if (!openBtn) return;

    const type = openBtn.getAttribute('data-open');
    if (type === 'login') showToast('🔐 Inicio de sesión (demo UI)');
    if (type === 'register') showToast('📝 Registro (demo UI)');
  });

  // ✅ IntersectionObserver para revelar elementos
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });

    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ✅ Contador animado (data-count)
  const countEls = $$('.metric__value[data-count]');
  const canAnimate = 'IntersectionObserver' in window;

  const runCount = (el) => {
    const target = Number(el.getAttribute('data-count')) || 0;
    const start = 0;
    const duration = 900;
    const startTime = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(start + (target - start) * eased);
      el.textContent = String(val);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if (canAnimate) {
    const obsCount = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          runCount(el);
          obsCount.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    countEls.forEach(el => obsCount.observe(el));
  } else {
    countEls.forEach(runCount);
  }

  // ✅ Aside FAQ: alternar visualmente
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-toggle="faq"]');
    if (!toggle) return;

    const faq = $('[data-faq]');
    if (!faq) return;

    const isHidden = faq.style.display === 'none';
    faq.style.display = isHidden ? 'block' : 'none';

    // Cambiar texto del botón sin usar librerías
    const label = toggle;
    label.innerHTML = isHidden ? '<span aria-hidden="true">▾</span> Ver' : '<span aria-hidden="true">▸</span> Ocultar';
  });

  // ✅ Active nav por scroll (solo UI)
  const navLinks = $$('.nav__link[href^="#"]');
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && navLinks.length) {
    const obsNav = new IntersectionObserver((entries) => {
      // elegir el que tenga mayor intersección visible
      const visible = entries
        .filter(en => en.isIntersecting)
        .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0];

      if (!visible) return;

      const id = visible.target.id;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
    }, { threshold: [0.25, 0.35, 0.5] });

    sections.forEach(sec => obsNav.observe(sec));
  }
})();