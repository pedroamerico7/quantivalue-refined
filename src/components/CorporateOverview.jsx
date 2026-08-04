const corporateFacts = [
  ["Asset", "QuantiValue.com"],
  ["Category", "AI · Finance · Valuation"],
  ["Transaction", "Private acquisition"],
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
            QuantiValue.com provides an acquiring organization with a credible,
            international identity for AI, quantitative finance, valuation technology
            and enterprise analytics.
          </p>
          <div className="corporate-overview-actions">
            <button type="button" onClick={onOpenDiscussion}>
              Request Confidential Discussion <span aria-hidden="true">↗</span>
            </button>
            <a href="/enterprise.html">
              Review Acquisition Overview <span aria-hidden="true">→</span>
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
