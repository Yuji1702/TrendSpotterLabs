
export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav" id="site-nav">
        <div className="nav-inner container">
          <div className="logo">TrendSpotter Labs</div>
          <button id="nav-toggle" aria-label="Toggle navigation">Menu</button>
          <ul className="nav-links" id="nav-links">
            <li><a href="#home" data-target="home">Home</a></li>
            <li><a href="#services" data-target="services">Services</a></li>
            <li><a href="#tools" data-target="tools">Tools</a></li>
            <li><a href="#outcomes" data-target="outcomes">Outcomes</a></li>
            <li><a href="#process" data-target="process">Process</a></li>
            <li><a href="#contact" data-target="contact">Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
