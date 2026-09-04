document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const modalLogin = document.getElementById('modalLogin');
  const modalRegister = document.getElementById('modalRegister');
  
  // 1. HACER VISIBLE TODO EL CONTENIDO (arregla tu pantalla blanca)
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('is-visible');
  });

  // Animación reveal con observer (por si tu CSS lo usa)
  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('is-visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } catch(e){}

  // Contadores del hero
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 30);
  });

  // 2. HAMBURGUESA (sin $ para que no se crashee)
  const hamburger = document.querySelector('[data-hamburger]');
  const navMenu = document.querySelector('[data-nav-menu]');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
    });
  }

  // 3. MODALES - ESTO ES LO QUE ARREGLA TUS VENTANITAS
  function openModal(name) {
    const modal = name === 'login' ? modalLogin : modalRegister;
    if (!modal) return;
    // cierra el otro
    [modalLogin, modalRegister].forEach(m => { if(m){ m.hidden=true; m.style.display='none'; }});
    
    modal.hidden = false;
    modal.removeAttribute('hidden');
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.zIndex = '10000';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.background = 'rgba(0,0,0,0.5)';
    
    if (overlay) {
      overlay.hidden = false;
      overlay.removeAttribute('hidden');
      overlay.style.display = 'block';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '9999';
      overlay.style.background = 'rgba(0,0,0,0.5)';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeModals() {
    [modalLogin, modalRegister].forEach(m => { if(m){ m.hidden=true; m.style.display='none'; }});
    if (overlay) { overlay.hidden=true; overlay.style.display='none'; }
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn.dataset.open);
    });
  });
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });
  if (overlay) overlay.addEventListener('click', closeModals);
  document.addEventListener('keydown', e => { if(e.key==='Escape') closeModals(); });

  // Scroll
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const t = document.querySelector(btn.dataset.scroll);
      if(t) t.scrollIntoView({behavior:'smooth'});
    });
  });
});
