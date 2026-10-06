/* Scale Xpert site interactions. Runs only inside .sxa-site. */
(() => {
  'use strict';
  document.querySelectorAll('.sxa-site').forEach(root => {

  let closeMenu = () => {};
  const header = root.querySelector('[data-sxa-header]');
  if (header) {
    let scrollFrame = 0;
    const updateHeader = () => {
      const compact = window.scrollY > 110;
      if (header.classList.contains('is-compact') !== compact) closeMenu();
      header.classList.toggle('is-compact', compact);
      scrollFrame = 0;
    };
    updateHeader();
    window.addEventListener('scroll', () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeader);
    }, { passive: true });
  }

  const toggle = root.querySelector('[data-sxa-menu-toggle]');
  const nav = root.querySelector('[data-sxa-nav]');
  closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.textContent = '☰';
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      toggle.textContent = isOpen ? '×' : '☰';
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.sxa-header')) closeMenu();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeMenu(); toggle.focus(); }
    });
    window.matchMedia('(min-width: 821px)').addEventListener('change', closeMenu);
  }

  const year = root.querySelector('[data-sxa-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  root.querySelectorAll('[data-sxa-results-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-sxa-results-track]');
    const slides = [...track.children];
    const counter = carousel.querySelector('[data-sxa-results-count]');
    const pauseButton = carousel.querySelector('[data-sxa-results-pause]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, paused = motion.matches, timer;
    const go = next => {
      index = (next + slides.length) % slides.length;
      track.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: motion.matches ? 'instant' : 'smooth' });
    };
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => {
      stop();
      if (!paused && !document.hidden && !carousel.matches(':hover') && !carousel.contains(document.activeElement)) {
        timer = setInterval(() => go(index + 1), 1000);
      }
    };
    const updatePause = () => {
      pauseButton.setAttribute('aria-label', paused ? 'Play automatic slideshow' : 'Pause automatic slideshow');
      pauseButton.innerHTML = paused
        ? '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>'
        : '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>';
    };
    carousel.querySelector('[data-sxa-results-prev]').addEventListener('click', () => go(index - 1));
    carousel.querySelector('[data-sxa-results-next]').addEventListener('click', () => go(index + 1));
    pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); start(); });
    track.addEventListener('scroll', () => {
      const left = track.scrollLeft;
      index = slides.reduce((best, slide, i) => Math.abs(slide.offsetLeft - slides[0].offsetLeft - left) < Math.abs(slides[best].offsetLeft - slides[0].offsetLeft - left) ? i : best, 0);
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }, { passive: true });
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(index + (e.key === 'ArrowRight' ? 1 : -1)); }
    });
    carousel.addEventListener('pointerenter', stop);
    carousel.addEventListener('pointerleave', start);
    carousel.addEventListener('pointerdown', stop);
    carousel.addEventListener('pointerup', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', () => setTimeout(start, 0));
    document.addEventListener('visibilitychange', start);
    motion.addEventListener('change', () => { paused = motion.matches; updatePause(); start(); });
    updatePause();
    start();
  });

  const dialog = root.querySelector('[data-sxa-lightbox]');
  const image = dialog?.querySelector('img');
  root.querySelectorAll('[data-sxa-open-image]').forEach(button => {
    button.addEventListener('click', () => {
      if (!dialog || !image || typeof dialog.showModal !== 'function') return;
      image.src = button.dataset.sxaOpenImage;
      image.alt = button.dataset.sxaImageAlt || 'SEO performance image';
      dialog.showModal();
    });
  });
  dialog?.querySelector('[data-sxa-close-lightbox]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

  const form = root.querySelector('[data-sxa-contact-form]');
  if (form) {
    const allowedPlans = ['Access', 'Growth', 'Authority'];
    const selectedPlan = new URLSearchParams(window.location.search).get('plan');
    const planControl = form.elements.namedItem('plan');
    if (planControl && allowedPlans.includes(selectedPlan)) planControl.value = selectedPlan;
    const selectedGoal = new URLSearchParams(window.location.search).get('goal');
    const goalControl = form.elements.namedItem('goal');
    if (goalControl && ['audit', 'content', 'authority', 'reddit', 'other'].includes(selectedGoal)) goalControl.value = selectedGoal;

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const fields = new FormData(form);
      const subject = `Scale Xpert SEO enquiry${fields.get('plan') ? ` - ${fields.get('plan')}` : ''}`;
      const body = [
        `Name: ${fields.get('name') || ''}`,
        `Email: ${fields.get('email') || ''}`,
        `Website: ${fields.get('website') || ''}`,
        `Plan: ${fields.get('plan') || 'Not selected'}`,
        `What you need help with: ${fields.get('goal') || ''}`,
        '',
        `${fields.get('message') || ''}`
      ].join('\n');
      const status = form.querySelector('[data-sxa-form-status]');
      if (status) status.textContent = 'Your email application should open now. Send the message there to contact us.';
      window.location.href = `mailto:contact@scale-xpert.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Reveal editorial sections as they enter view. Pages stay visible if JS is unavailable.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealNodes = root.querySelectorAll('.sxa-section-head, .sxa-benefit-card, .sxa-service-card, .sxa-step, .sxa-evidence-feature, .sxa-story-card, .sxa-story-proof, .sxa-review, .sxa-plan, .sxa-community-feature, .sxa-community-heading, .sxa-channel-card, .sxa-community-how, .sxa-feature-panel');
    if (revealNodes.length) {
      const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      revealNodes.forEach(element => {
        element.dataset.sxaReveal = '';
        if (element.getBoundingClientRect().top <= window.innerHeight + 24) element.classList.add('is-visible');
        else observer.observe(element);
      });
      document.documentElement.classList.add('sxa-motion');
    }
  }
  });
})();
