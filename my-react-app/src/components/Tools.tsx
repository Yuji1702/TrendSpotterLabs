
export default function Tools() {
  return (
    <section id="tools" className="section tools">
      <div className="container">
        <h2 className="section-title">Tools & Platforms</h2>
        <p className="section-sub">We work across a versatile stack to keep data flowing smoothly.</p>
        <ul className="tools-grid" id="tools-grid">
          <li className="tool"><span className="icon">📊</span> Looker Studio <span className="muted">(Google Data Studio)</span></li>
          <li className="tool"><span className="icon">📈</span> Metabase</li>
          <li className="tool"><span className="icon">🗄️</span> SQL Databases <span className="muted">(MySQL/Postgres)</span></li>
          <li className="tool"><span className="icon">🍃</span> MongoDB</li>
          <li className="tool"><span className="icon">🔗</span> Facebook Graph API</li>
          <li className="tool"><span className="icon">📑</span> Google Sheets</li>
          <li className="tool"><span className="icon">☁️</span> BigQuery</li>
          <li className="tool"><span className="icon">📱</span> AppSheet</li>
          <li className="tool"><span className="icon">⚙️</span> Google Apps Script</li>
        </ul>
      </div>
    </section>
  );
}
