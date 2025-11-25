// Script for TrendSpotter Labs site
document.addEventListener('DOMContentLoaded', () => {
  // Utilities
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  // Mobile nav toggle
  const navToggle = qs('#nav-toggle');
  const navLinks = qs('#nav-links');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

  // Smooth scrolling for nav links and CTAs
  const scrollLinks = qsa('a[data-target]');
  scrollLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
        // hide mobile menu if open
        navLinks.classList.remove('show');
      }
    })
  });

  // Set current year
  qs('#current-year').textContent = new Date().getFullYear();

  // Hero entrance animation
  anime.timeline({
    easing: 'easeOutExpo',
    duration: 700
  })
  .add({
    targets: '.hero-title',
    translateY: [30,0],
    opacity: [0,1],
    delay: 200
  })
  .add({
    targets: '.hero-sub',
    translateY: [20,0],
    opacity: [0,1],
    offset: '-=350'
  })
  .add({
    targets: '.hero-ctas .btn, .hero-note',
    translateY: [10,0],
    opacity: [0,1],
    delay: anime.stagger(80),
    offset: '-=300'
  });

  // Floating shapes in hero (loop)
  anime({
    targets: '.chart .dot',
    translateY: [0, -12],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    delay: anime.stagger(200),
    duration: 2500
  });

  // Nav background animate when scrolling past hero
  const nav = qs('#site-nav');
  const hero = qs('#home');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        nav.classList.add('scrolled');
        // subtle anime for entrance
        anime({targets: nav, opacity: [0.9,1], translateY: [-8,0], duration: 420, easing: 'easeOutQuad'});
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }, {root:null, threshold: 0, rootMargin: '-80px 0px 0px 0px'});
  if (hero) navObserver.observe(hero);

  // Scroll reveal helper using IntersectionObserver
  function revealOnScroll(selector, animeProps){
    const elems = qsa(selector);
    const io = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          // perform anime
          anime(Object.assign({targets: entry.target}, animeProps));
          o.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    elems.forEach(el => io.observe(el));
  }

  // Services cards reveal
  revealOnScroll('#service-cards .card', {
    translateY: [20,0], opacity: [0,1], duration: 700, delay: anime.stagger(120), easing: 'easeOutQuart'
  });

  // Tools grid reveal
  revealOnScroll('#tools-grid .tool', {
    scale: [0.92,1], opacity: [0,1], duration: 650, delay: anime.stagger(80), easing: 'easeOutBack'
  });

  // Outcomes reveal
  revealOnScroll('#outcomes-grid .outcome', {
    translateX: [-20,0], opacity: [0,1], duration: 700, delay: anime.stagger(120), easing: 'easeOutQuad'
  });

  // Process steps sequence
  revealOnScroll('#process-steps li', {
    translateY: [30,0], opacity: [0,1], duration: 700, delay: anime.stagger(180), easing: 'easeOutExpo'
  });

  // Contact header reveal
  revealOnScroll('#contact .section-title', {
    translateY: [20,0], opacity: [0,1], duration: 600, easing: 'easeOutCubic'
  });

  // Form validation and submission simulation
  const form = qs('#contact-form');
  const errName = qs('#err-name');
  const errEmail = qs('#err-email');
  const errMessage = qs('#err-message');
  const feedback = qs('#form-feedback');

  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // reset errors
    errName.textContent = '';
    errEmail.textContent = '';
    errMessage.textContent = '';
    feedback.textContent = '';

    const name = qs('#name').value.trim();
    const email = qs('#email').value.trim();
    const message = qs('#message').value.trim();
    let valid = true;
    if (!name){ errName.textContent = 'Please enter your name.'; valid = false; }
    if (!email || !validateEmail(email)){ errEmail.textContent = 'Please enter a valid email.'; valid = false; }
    if (!message){ errMessage.textContent = 'Please add a short message describing your needs.'; valid = false; }

    if (!valid) {
      // small shake animation for form
      anime({targets: '#contact-form', translateX: [-6,6,-4,4,0], duration: 420, easing:'easeInOutSine'});
      return;
    }

    // simulate submission
    feedback.textContent = 'Sending…';
    const submitValues = {name, email, message, service: qs('#service').value};
    // fake network latency
    setTimeout(() => {
      feedback.textContent = "Thank you! We'll review your requirements and get back to you soon to discuss a tailored plan and pricing.";
      anime({targets: '#form-feedback', opacity: [0,1], translateY: [-6,0], duration: 500, easing: 'easeOutCubic'});
      form.reset();
    }, 900);
    console.log('Simulated form submission:', submitValues);
  });

});
