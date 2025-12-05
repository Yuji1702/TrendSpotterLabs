import { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Tools from './Tools';
import Outcomes from './Outcomes';
import Process from './Process';
import ContactForm from './ContactForm';
import Footer from './Footer';

// Keep animations isolated — I didn't include anime.js here to avoid module errors.
// If you want animations, tell me and I'll add robust dynamic import code per-component.
export default function LandingPage() {
  useEffect(() => {
    const qs = (s: string) => document.querySelector(s);
    const qsa = (s: string) => Array.from(document.querySelectorAll(s));

    // Mobile nav toggle
    const navToggle = qs('#nav-toggle');
    const navLinks = qs('#nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', String(open));
      });
    }

    // Smooth scrolling for nav links and CTAs
    const scrollLinks = qsa('a[data-target]') as HTMLAnchorElement[];
    const onClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const targetId = link.getAttribute('data-target');
      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks?.classList.remove('show');
        (navToggle as HTMLElement | null)?.setAttribute('aria-expanded', 'false');
      }
    };
    scrollLinks.forEach(l => l.addEventListener('click', onClick));

    // Set current year
    const yearEl = qs('#current-year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Nav background on scroll (hero intersection)
    const nav = qs('#site-nav');
    const hero = qs('#home');
    if (nav && hero) {
      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) nav.classList.add('scrolled');
          else nav.classList.remove('scrolled');
        });
      }, { root: null, threshold: 0, rootMargin: '-80px 0px 0px 0px' });
      navObserver.observe(hero);
    }

    return () => {
      scrollLinks.forEach(l => l.removeEventListener('click', onClick));
    };
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Services />
        <Tools />
        <Outcomes />
        <Process />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
