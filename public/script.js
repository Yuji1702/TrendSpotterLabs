/**
 * TrendSpotter Labs Frontend JavaScript
 * 
 * This script handles all frontend interactions for the TrendSpotter Labs website.
 * It manages navigation, animations, scroll effects, and contact form submissions.
 * 
 * Key Features:
 * - Responsive mobile navigation
 * - Smooth scrolling between sections
 * - Entrance animations using anime.js
 * - Scroll-triggered reveal animations
 * - Contact form validation and API submission
 * 
 * Dependencies:
 * - anime.js (animation library)
 */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
  // Helper functions for DOM queries
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  // ===========================
  // Mobile Navigation Toggle
  // ===========================
  /**
   * Handles the mobile hamburger menu toggle
   * Opens/closes the navigation menu on mobile devices
   */
  const navToggle = qs('#nav-toggle');
  const navLinks = qs('#nav-links');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // ===========================
  // Smooth Scrolling Navigation
  // ===========================
  /**
   * Implements smooth scrolling for navigation links
   * - Scrolls to the target section smoothly
   * - Closes mobile menu after navigation
   * - Prevents default anchor behavior
   */
  const scrollLinks = qsa('a[data-target]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu after clicking a link
        navLinks.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ===========================
  // Dynamic Copyright Year
  // ===========================
  /**
   * Automatically updates the copyright year in the footer
   */
  const yearEl = qs('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===========================
  // Hero Section Entrance Animation
  // ===========================
  /**
   * Animates hero section elements on page load
   * Creates a staggered fade-in and slide-up effect
   * Uses anime.js timeline for coordinated animations
   */
  anime.timeline({ easing: 'easeOutExpo', duration: 700 })
    .add({ targets: '.eyebrow', translateY: [20, 0], opacity: [0, 1], delay: 120 })
    .add({ targets: '.hero-title', translateY: [30, 0], opacity: [0, 1], offset: '-=350' })
    .add({ targets: '.hero-sub', translateY: [24, 0], opacity: [0, 1], offset: '-=280' })
    .add({ targets: '.hero-ctas .btn, .hero-note', translateY: [12, 0], opacity: [0, 1], delay: anime.stagger(80), offset: '-=250' });

  // ===========================
  // Continuous Hero Animations
  // ===========================
  /**
   * Creates looping animations for decorative elements in the hero section
   * - Dots float up and down
   * - Bars scale vertically
   * - Cards pulse and float
   */
  anime({
    targets: '.chart .dot',
    translateY: [0, -12],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    delay: anime.stagger(180),
    duration: 2400
  });
  anime({
    targets: '.chart .bar',
    scaleY: [0.92, 1],
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    duration: 2600,
    delay: anime.stagger(180)
  });
  anime({
    targets: '.floating-card',
    translateY: [0, -8],
    opacity: [0.7, 1],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutQuad',
    duration: 3200
  });

  // ===========================
  // Navigation Scroll Effect
  // ===========================
  /**
   * Changes navigation bar appearance when scrolling past the hero section
   * - Adds background and shadow to the nav bar
   * - Animates the transition smoothly
   * Uses IntersectionObserver for performance
   */
  const nav = qs('#site-nav');
  const hero = qs('#home');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Hero is scrolled out of view
        nav.classList.add('scrolled');
        anime({ targets: nav, opacity: [0.92, 1], translateY: [-10, 0], duration: 420, easing: 'easeOutQuad' });
      } else {
        // Hero is in view
        nav.classList.remove('scrolled');
      }
    });
  }, { root: null, threshold: 0, rootMargin: '-80px 0px 0px 0px' });
  if (hero) navObserver.observe(hero);

  // ===========================
  // Scroll Reveal Animation System
  // ===========================
  /**
   * Generic function to reveal elements as they scroll into view
   * 
   * @param {string} selector - CSS selector for elements to animate
   * @param {object} animeProps - Animation properties for anime.js
   * 
   * Uses IntersectionObserver to trigger animations when elements
   * become visible in the viewport
   */
  function revealOnScroll(selector, animeProps) {
    const elems = qsa(selector);
    const io = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible, animate it
          anime(Object.assign({ targets: entry.target }, animeProps));
          // Stop observing this element after animation
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 }); // Trigger when 12% of element is visible
    elems.forEach(el => io.observe(el));
  }

  // Apply scroll reveal animations to different sections
  // Service cards - fade in and slide up with stagger
  revealOnScroll('#service-cards .card', {
    translateY: [20, 0], opacity: [0, 1], duration: 700, delay: anime.stagger(120), easing: 'easeOutQuart'
  });

  // Tools grid - scale up and fade in with stagger
  revealOnScroll('#tools-grid .tool', {
    scale: [0.92, 1], opacity: [0, 1], duration: 650, delay: anime.stagger(80), easing: 'easeOutBack'
  });

  // Outcomes grid - slide in from left with stagger
  revealOnScroll('#outcomes-grid .outcome', {
    translateX: [-24, 0], opacity: [0, 1], duration: 700, delay: anime.stagger(140), easing: 'easeOutQuad'
  });

  // Process steps - fade in and slide up with stagger
  revealOnScroll('#process-steps li', {
    translateY: [26, 0], opacity: [0, 1], duration: 700, delay: anime.stagger(180), easing: 'easeOutExpo'
  });

  // Contact section - fade in and slide up with stagger
  revealOnScroll('#contact .section-title, #contact .section-sub, #contact form', {
    translateY: [20, 0], opacity: [0, 1], duration: 650, delay: anime.stagger(120), easing: 'easeOutCubic'
  });

  // ===========================
  // Contact Form Handling
  // ===========================
  /**
   * Handles contact form validation and submission
   * 
   * Functionality:
   * - Client-side validation for name, email, and message
   * - Email format validation using regex
   * - Submits form data to the backend API
   * - Displays success/error feedback to the user
   * - Provides visual feedback (shake animation on error)
   */
  const form = qs('#contact-form');
  const errName = qs('#err-name');
  const errEmail = qs('#err-email');
  const errMessage = qs('#err-message');
  const feedback = qs('#form-feedback');

  /**
   * Validates email format using regex
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if email is valid
   */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Form submit handler
   * - Prevents default form submission
   * - Validates all required fields
   * - Sends data to backend API
   * - Handles success/error responses
   */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous error messages
    errName.textContent = '';
    errEmail.textContent = '';
    errMessage.textContent = '';
    feedback.textContent = '';

    // Get form field values
    const name = qs('#name').value.trim();
    const email = qs('#email').value.trim();
    const message = qs('#message').value.trim();
    const phone = qs('#phone').value.trim(); 
    const company = qs('#company').value.trim();
    let valid = true;

    // Validate required fields
    if (!name) { errName.textContent = 'Please enter your name.'; valid = false; }
    if (!email || !validateEmail(email)) { errEmail.textContent = 'Please enter a valid email.'; valid = false; }
    if (!message) { errMessage.textContent = 'Please add a short message describing your needs.'; valid = false; }

    // If validation fails, shake the form and stop submission
    if (!valid) {
        anime({ targets: '#contact-form', translateX: [-6, 6, -4, 4, 0], duration: 420, easing: 'easeInOutSine' });
        return;
    }

    // Show loading state
    feedback.textContent = 'Sending…';
    const submitValues = { name, email, message, phone, company };

    // Submit form data to the backend API
    fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitValues)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Success - show confirmation message and reset form
            feedback.textContent = "Thank you! We'll review your requirements and get back to you soon.";
            form.reset();
            anime({ targets: '#form-feedback', opacity: [0, 1], translateY: [-6, 0], duration: 500, easing: 'easeOutCubic' });
        } else {
            // Server returned error
            feedback.textContent = "Error: " + (data.error || "Something went wrong.");
        }
    })
    .catch(err => {
        // Network or other error occurred
        feedback.textContent = "Error: Could not submit form.";
        console.error(err);
    });
});

});
