(function () {
  const openBtn = document.querySelector('.js-open-modal');
  const modal = document.querySelector('.js-modal');
  const closeEls = document.querySelectorAll('.js-modal-close');

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-visible');
    const focusable = modal.querySelector('a, button, textarea, input, select');
    if (focusable) focusable.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-visible');
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);

  closeEls.forEach(el => {
    el.addEventListener('click', closeModal);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModal();
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Toggle background for sensitive eyes
  const toggleBgBtn = document.getElementById('toggle-bg-btn');
  const footerMsg = document.getElementById('footer-msg');
  let bgToggled = false;

  if (toggleBgBtn) {
    toggleBgBtn.addEventListener('click', function() {
      const body = document.body;
      if (!bgToggled) {
        body.style.backgroundImage = 'none';
        body.style.backgroundColor = '#31045f';
        footerMsg.textContent = 'Background set to fallback color.';
        bgToggled = true;
      } else {
        body.style.backgroundImage = "url('https://i.pinimg.com/originals/45/93/e9/4593e9f8d2f3a50755be9e358974e53b.gif')";
        body.style.backgroundColor = '#31045f';
        footerMsg.textContent = 'Background GIF restored.';
        bgToggled = false;
      }
    });
  }

  // Hide header toggle on scroll down, show on scroll up
  (function() {
    const headerToggle = document.querySelector('.site-header-toggle');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (!headerToggle) return;
      if (window.scrollY > lastScrollY && window.scrollY > 10) {
        // Scrolling down
        headerToggle.classList.add('hide-header-toggle');
      } else {
        // Scrolling up
        headerToggle.classList.remove('hide-header-toggle');
      }
      lastScrollY = window.scrollY;
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);
  })();

  // Show footer only when mouse is at the bottom of the screen
  (function() {
    const footer = document.querySelector('.site-footer');
    let footerVisible = false;
    let hideTimeout;

    function maybeShowFooter(e) {
      const threshold = 30; // px from bottom
      if (window.innerHeight - e.clientY <= threshold) {
        if (!footerVisible) {
          footer.classList.add('show-footer');
          footerVisible = true;
        }
        if (hideTimeout) clearTimeout(hideTimeout);
      } else if (footerVisible) {
        // Hide after a short delay to allow interaction
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          footer.classList.remove('show-footer');
          footerVisible = false;
        }, 500);
      }
    }

    if (footer) {
      document.addEventListener('mousemove', maybeShowFooter);
      // Hide on page load
      footer.classList.remove('show-footer');
    }
  })();

  // Show footer for 2s on page load
  (function() {
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.classList.add('initial-show');
      setTimeout(() => {
        footer.classList.remove('initial-show');
      }, 2000);
    }
  })();
})();
