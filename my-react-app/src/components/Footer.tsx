
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© <span id="current-year"></span> TrendSpotter Labs. All rights reserved.</div>
        <nav className="footer-nav">
          <a href="#home" data-target="home">Home</a>
          <a href="#services" data-target="services">Services</a>
          <a href="#contact" data-target="contact">Contact</a>
        </nav>
        <div className="muted">Pricing is customized based on your requirements.</div>
      </div>
    </footer>
  );
}
