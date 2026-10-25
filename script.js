document.addEventListener('DOMContentLoaded', () => {

  // 1. DYNAMIC RADIAL SPOTLIGHT (DESKTOP MOUSE FOLLOW)
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // 2. MOBILE DRAWER NAVIGATION AUTO-CLOSE
  // Automatically unchecks the hamburger toggle when a navigation link is clicked
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