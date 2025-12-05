
export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section-title">Services tailored to your goals</h2>
        <p className="section-sub">Comprehensive analytics, reporting, dashboards, and automation tuned to your marketing and growth metrics.</p>
        <div className="cards" id="service-cards">
          <article className="card">
            <div className="pill">Meta Ads</div>
            <h3>Meta Ads Reporting</h3>
            <p>In-depth Meta (Facebook/Instagram) ads reporting at campaign and ad level: impressions, reach, CTR, conversions, CPC, ROAS, plus optimization insights for better ad performance.</p>
          </article>
          <article className="card">
            <div className="pill">Social</div>
            <h3>Social Media Analytics</h3>
            <p>Analytics for Facebook and Instagram (organic): follower growth, engagement, reach, clicks, best-performing content, and recommended posting times to increase impact.</p>
          </article>
          <article className="card">
            <div className="pill">Dashboards</div>
            <h3>Custom Reports & Dashboards</h3>
            <p>Custom dashboards in Looker Studio and Metabase with charts, filters, and KPIs designed for marketing funnels, sales, and web analytics—built for clarity and action.</p>
          </article>
          <article className="card">
            <div className="pill">Automation</div>
            <h3>Automation of Reports & Data Collection</h3>
            <p>Automated pipelines and reporting using Google Sheets, Apps Script, and AppSheet so your reports stay up-to-date with minimal manual effort and cleaner data.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
