(function () {
  // Header: auto-hide on scroll down, show on scroll up
  const header = document.getElementById('site-header');
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (y > 40) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        if (y > lastY && y > 200) header.classList.add('hidden');
        else header.classList.remove('hidden');
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  // Reveal on scroll — reversible
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
      else e.target.classList.remove('in');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Technician click to expand
  document.querySelectorAll('[data-tech]').forEach(card => {
    card.addEventListener('click', () => {
      const wasOpen = card.classList.contains('open');
      document.querySelectorAll('[data-tech]').forEach(c => c.classList.remove('open'));
      if (!wasOpen) card.classList.add('open');
    });
  });
})();
