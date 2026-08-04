const corporateFacts = [
  ["Asset", "QuantiValue.com"],
  ["Category", "AI · Finance · Valuation"],
  ["Process", "Direct owner review"],
  ["Ownership", "Direct owner"],
  ["Transfer", "International · Escrow compatible"],
  ["Response", "Qualified inquiries within 48 hours"],
];

export default function CorporateOverview({ onOpenDiscussion }) {
  return (
    <section className="corporate-overview" id="overview">
      <div className="corporate-overview-inner">
        <div className="corporate-overview-copy" data-reveal>
          <p className="section-tag">Executive overview</p>
          <h2>A strategic digital asset for global financial intelligence.</h2>
          <p>
            QuantiValue.com gives an organization a credible,
            international identity for AI, quantitative finance, valuation technology
            and enterprise analytics.
          </p>
          <div className="corporate-overview-actions">
            <a className="corporate-overview-primary-link" href="#institutional-trust">
              Review ownership process <span aria-hidden="true">→</span>
            </a>
            <a href="/enterprise.html">
              Review Brand Overview <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <dl className="corporate-facts" data-reveal>
          {corporateFacts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
