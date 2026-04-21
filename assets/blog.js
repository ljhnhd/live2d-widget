/* ═══════════════════════════════════════════════════
   星野日记 · Blog Interactions
   - Star canvas background
   - Sakura petal spawner
   - AOS scroll animations
   - Navbar scroll effect
   - Mobile nav toggle
   - Back-to-top button
   ═══════════════════════════════════════════════════ */

/* ── Star Canvas ───────────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makeStars() {
    stars = Array.from({ length: 130 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.006 + 0.002,
      dir:   Math.random() > 0.5 ? 1 : -1,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 1 || s.alpha <= 0.05) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha.toFixed(2)})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  makeStars();
  tick();
  window.addEventListener('resize', () => { resize(); makeStars(); });
}());

/* ── Sakura Petals ──────────────────────────────── */
(function initSakura() {
  const wrap = document.querySelector('.sakura-wrap');
  if (!wrap) return;

  function spawn() {
    const el = document.createElement('div');
    el.className = 'sakura';
    const size = Math.random() * 8 + 6;
    el.style.cssText = [
      `left:${Math.random() * 110 - 5}vw`,
      `width:${size}px`,
      `height:${size}px`,
      `animation-duration:${Math.random() * 6 + 7}s`,
      `animation-delay:${Math.random() * 3}s`,
      `opacity:${Math.random() * 0.5 + 0.3}`,
      `border-radius:${Math.random() > 0.5 ? '50% 0' : '0 50%'} 50% 0`,
    ].join(';');
    wrap.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  setInterval(spawn, 480);
}());

/* ── AOS ────────────────────────────────────────── */
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 700, once: true, offset: 60 });
}

/* ── Navbar Scroll Effect ───────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}());

/* ── Mobile Nav Toggle ──────────────────────────── */
(function initBurger() {
  const btn   = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}());

/* ── Back-to-top Button ─────────────────────────── */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  function update() {
    btn.classList.toggle('visible', window.scrollY > 300);
  }
  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}());
