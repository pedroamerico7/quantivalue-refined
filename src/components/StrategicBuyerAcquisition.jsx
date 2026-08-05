const applications = [
  ["AI valuation platform", "Explainable enterprise and asset valuation workflows."],
  ["Quantitative research", "Institutional research, signals and evidence systems."],
  ["Financial intelligence SaaS", "Decision infrastructure for finance and strategy teams."],
  ["Enterprise analytics", "AI-assisted reporting, scenarios and executive insight."],
  ["Investment intelligence", "Tools for funds, private markets and capital allocation."],
  ["Fintech infrastructure", "A credible parent brand for data, APIs and workflow products."],
];

const validationSignals = [
  "Clear quantitative-finance association",
  "Natural fit across AI and valuation",
  "Memorable two-word construction",
  "Transferable brand and product assets",
];

export default function StrategicBuyerAcquisition({ onOpenDiscussion }) {
  return (
    <section className="strategic-buyer-suite strategic-buyer-suite-compact" id="strategic-opportunity">
      <div className="strategic-thesis" data-reveal>
        <div className="strategic-thesis-copy">
          <p className="section-tag light">Strategic rationale</p>
          <h2>A category-ready name for financial intelligence.</h2>
          <p>
            QuantiValue.com combines quantitative intelligence and commercial value
            in a concise global brand for AI, finance, valuation and enterprise analytics.
          </p>

          <div className="strategic-thesis-actions">
            <a className="strategic-rationale-link" href="#why-acquire">
              Explore strategic value <span aria-hidden="true">→</span>
            </a>
            <a href="#platform">View the AI platform <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="strategic-thesis-panel" aria-label="Strategic brand summary">
          <span className="strategic-panel-kicker">QUANTIVALUE.COM</span>
          <strong>AI · Finance · Valuation</strong>
          <p>
            A focused digital asset for organizations seeking a credible international
            identity and a direct owner relationship.
          </p>
          <div>
            <span>Private process</span>
            <span>Transferable assets</span>
            <span>Direct owner</span>
          </div>
        </div>
      </div>

      <div className="strategic-applications strategic-applications-compact" data-reveal>
        <div className="strategic-section-heading">
          <div>
            <p className="section-tag">Enterprise applications</p>
            <h2>Six credible paths to market.</h2>
          </div>
          <p>
            Broad enough for a category leader and precise enough to communicate
            quantitative value from the first interaction.
          </p>
        </div>

        <div className="strategic-application-grid">
          {applications.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="strategic-validation strategic-validation-compact" data-reveal>
        <div>
          <p className="section-tag light">Brand validation</p>
          <h2>The name communicates its category.</h2>
          <p>
            QuantiValue connects quantitative intelligence with value in a form that
            can extend across financial software, AI and enterprise analytics.
          </p>
        </div>

        <ul>
          {validationSignals.map((signal) => (
            <li key={signal}>
              <span aria-hidden="true">✓</span>
              {signal}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
