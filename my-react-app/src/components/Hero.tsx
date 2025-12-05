
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <span className="glow g1" />
        <span className="glow g2" />
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Analytics & reporting partner</p>
          <h1 className="hero-title">Turn Your Data Into Actionable Insights</h1>
          <p className="hero-sub">TrendSpotter Labs helps businesses, agencies, brands, and individuals make sharper decisions with marketing analytics, custom dashboards, and reporting that stays up to date.</p>
          <div className="hero-ctas">
            <a className="btn primary" id="cta-consult" href="#contact" data-target="contact">Request a Free Consultation</a>
            <div className="hero-note">Custom dashboards, automated reporting, and performance analytics for Meta ads and social media.</div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="chart">
            <div className="bar b1" />
            <div className="bar b2" />
            <div className="bar b3" />
            <div className="line" />
            <div className="dot d1" />
            <div className="dot d2" />
            <div className="dot d3" />
          </div>
          <div className="floating-card">
            <p className="tiny">Weekly performance</p>
            <div className="badge">↑ 18%</div>
            <div className="sparkline">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
