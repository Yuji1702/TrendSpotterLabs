
export default function Process() {
  return (
    <section id="process" className="section process">
      <div className="container">
        <h2 className="section-title">How to Get Started</h2>
        <p className="section-sub">A clear, collaborative process to deliver value quickly.</p>
        <ol className="timeline" id="process-steps">
          <li>
            <div className="step-num">1</div>
            <div className="step-body">
              <h3>Initial Consultation</h3>
              <p>Understand goals, data sources, and KPIs to define scope and deliverables.</p>
            </div>
          </li>
          <li>
            <div className="step-num">2</div>
            <div className="step-body">
              <h3>Strategy & Plan</h3>
              <p>Define dashboards, reports, metrics, and integration/automation approach.</p>
            </div>
          </li>
          <li>
            <div className="step-num">3</div>
            <div className="step-body">
              <h3>Implementation & Delivery</h3>
              <p>Set up data connections, build dashboards, create automations, and test thoroughly.</p>
            </div>
          </li>
          <li>
            <div className="step-num">4</div>
            <div className="step-body">
              <h3>Ongoing Support</h3>
              <p>Optional support, tweaks, and maintenance as needs evolve.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
