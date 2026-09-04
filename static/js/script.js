(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Año
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Toast
  const toast = $('#toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-on');
      toast.setAttribute('aria-hidden', 'true');
    }, 2300);
  }

  // Botón demo búsqueda
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toast]');
    if (btn) showToast('🔎 Búsqueda demo (sin backend).');
  });

  // Scroll suave (data-scroll)
  document.addEventListener('click', (e) => {
    const sc = e.target.closest('[data-scroll]');
    if (!sc) return;
    const sel = sc.getAttribute('data-scroll');
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Reveal
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

  // Contador animado
  const countEls = $$('.metric__value[data-count]');
  function animateCount(el) {
    const target = Number(el.getAttribute('data-count')) || 0;
    const startTime = performance.now();
    const duration = 900;
    const start = 0;

    function frame(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(start + (target - start) * eased);
      el.textContent = String(value);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window && countEls.length) {
    const obsCount = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obsCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    countEls.forEach(el => obsCount.observe(el));
  } else {
    countEls.forEach(animateCount);
  }

  // FAQ toggle
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-toggle="faq"]');
    if (!toggle) return;

    const faq = $('[data-faq]');
    if (!faq) return;

    const willShow = faq.hasAttribute('hidden');
    if (willShow) {
      faq.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = '<span aria-hidden="true">▾</span> Ocultar';
    } else {
      faq.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<span aria-hidden="true">▸</span> Ver';
    }
  });

  // Nav activo con IntersectionObserver
  const sections = $$('.top-nav a.nav__link[href^="#"]')
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const links = $$('.top-nav a.nav__link');

  if ('IntersectionObserver' in window && sections.length) {
    const obsNav = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
      });
    }, { threshold: 0.35 });

    sections.forEach(s => obsNav.observe(s));
  }

  // =========================
  // Modales (vanilla JS)
  // =========================
  const overlay = $('#modalOverlay');
  const modalState = { openModal: null, lastActive: null };

  function openModal(modal) {
    if (!modal) return;
    modalState.lastActive = document.activeElement;
    modalState.openModal = modal;

    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');

    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('[data-close]');
    (closeBtn || modal).focus?.();
  }

  function closeModal() {
    const modal = modalState.openModal;
    if (modal) modal.hidden = true;

    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
    modalState.openModal = null;

    modalState.lastActive?.focus?.();
  }

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open]');
    if (!openBtn) return;

    const which = openBtn.getAttribute('data-open');
    if (which === 'login') openModal($('#modalLogin'));
    if (which === 'register') openModal($('#modalRegister'));
  });

  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) closeModal();
  });

  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Formularios (demo)
  const formLogin = $('#formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Sesión iniciada (demo UI).');
      closeModal();
    });
  }

  const formRegister = $('#formRegister');
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(formRegister);
      const p1 = fd.get('password') || '';
      const p2 = fd.get('confirm') || '';

      if (p1 !== p2) {
        showToast('⚠️ Las contraseñas no coinciden.');
        return;
      }

      showToast('🎉 Registro completado (demo UI).');
      closeModal();
    });
  }

  // =========================
  // Menú móvil (sin librerías)
  // =========================
  const hamburger = $('[data-hamburger]');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      showToast('📱 Menú móvil demo: usa enlaces dentro del sitio.');
      // Nota: para mantenerlo simple y sin rehacer el layout,
      // no desplegamos un drawer completo. Si lo necesitas, lo agrego.
    });
  }

})();


(function() {
  const overlay = document.getElementById('overlay');
  const modalLogin = document.getElementById('modalLogin');
  const modalRegister = document.getElementById('modalRegister');

  if (!modalLogin || !modalRegister) return;

  function open(name) {
    const modal = name === 'login' ? modalLogin : modalRegister;
    modal.hidden = false; // Esto es lo que te bloquea todo
    modal.style.display = 'flex';
    if (overlay) {
      overlay.hidden = false;
      overlay.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
  }

  function close() {
    [modalLogin, modalRegister].forEach(m => {
      m.hidden = true;
      m.style.display = 'none';
    });
    if (overlay) {
      overlay.hidden = true;
      overlay.style.display = 'none';
    }
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open]').forEach(b => {
    b.addEventListener('click', () => open(b.dataset.open));
  });
  document.querySelectorAll('[data-close]').forEach(b => {
    b.addEventListener('click', close);
  });
  if (overlay) overlay.addEventListener('click', close);
})();
