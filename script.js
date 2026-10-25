document.addEventListener('DOMContentLoaded', () => {

  // 1. FLOWER COVER: CLICK / TAP / ENTER / SPACE TO REVEAL THE SITE
  const cover = document.getElementById('cover');

  if (cover) {
    let coverActive = true;

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const toTop = () => { window.scrollTo(0, 0); document.body.scrollTop = 0; };
    toTop();
    const blockScroll = (e) => { if (coverActive) e.preventDefault(); };
    cover.addEventListener('wheel', blockScroll, { passive: false });
    cover.addEventListener('touchmove', blockScroll, { passive: false });
    const keepTop = () => { if (coverActive) toTop(); };
    window.addEventListener('scroll', keepTop);
    document.body.addEventListener('scroll', keepTop); // this page scrolls on <body>

    const openCover = () => {
      if (!coverActive) return;
      coverActive = false;
      document.body.classList.remove('cover-active');
      document.body.classList.add('is-revealing'); // homepage rises in
      cover.classList.add('is-open');              // cover dissolves out

      const done = () => cover.classList.add('is-gone');
      cover.addEventListener('transitionend', (e) => {
        if (e.target === cover && e.propertyName === 'opacity') done();
      });
      setTimeout(done, 1200); // fallback (e.g. reduced motion)
      setTimeout(() => document.body.classList.remove('is-revealing'), 2000);
    };

    cover.addEventListener('click', openCover);
    cover.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCover();
      }
    });
    cover.focus({ preventScroll: true }); // so Enter / Space work immediately
  }

  // 2. SCROLL STORYTELLING FALLBACK
  const hasViewTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!hasViewTimeline && !reduceMotion && 'IntersectionObserver' in window) {
    const groups = {
      left:  '#about .header-bar, #about .info-box1, #about .card-organizations, #interests .header-script, #interests .pastime-card:nth-child(1), .header-script-box, .header-script-contact',
      right: '#about .info-box2, #about .info-box3, #about .card-education, #interests .pastime-card:nth-child(2)',
      up:    '#interests .header-main, .header-main-projects, .header-main-contact, .socials-box, .contact-nav-bar, .contact-footer',
      pop:   '.pastime-tile, .project-card, .card-item, .social-item',
      tiltL: '.photo-tilt-left',
      tiltR: '.photo-tilt-right',
      bloom: '.about-deco'
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sd-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px' });

    Object.entries(groups).forEach(([type, selector]) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.dataset.sd = type;
        el.classList.add('sd-fb');
        io.observe(el);
      });
    });
  }

  // 3. DYNAMIC RADIAL SPOTLIGHT (DESKTOP MOUSE FOLLOW)
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // 4. MOBILE DRAWER NAVIGATION AUTO-CLOSE
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.portfolio-bar .bar-item, .contact-nav-bar .contact-bar-item');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  });

});