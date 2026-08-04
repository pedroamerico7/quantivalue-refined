const institutionalSignals = [
  ["Single owner", "Direct ownership and direct communication throughout the process."],
  ["Verified communication", "All acquisition correspondence uses the official QuantiValue domain."],
  ["Escrow compatible", "A recognized third-party escrow provider can be used for closing."],
  ["International transfer", "Corporate and international buyers are supported."],
  ["Confidential process", "Buyer identity, terms and diligence remain private."],
  ["Counsel welcome", "Legal, finance and corporate-development teams may participate."],
];

const acquisitionSteps = [
  ["01", "Private inquiry", "Buyer identity, intended use and indicative terms."],
  ["02", "Owner review", "Strategic fit and transaction readiness are assessed."],
  ["03", "Confidential discussion", "Commercial structure, timing and scope are aligned."],
  ["04", "Due diligence", "Ownership, analytics, assets and transfer details are reviewed."],
  ["05", "Agreement and escrow", "Definitive terms and protected settlement are completed."],
  ["06", "Transfer", "Domain and included digital assets are delivered."],
];

export default function InstitutionalTrust({ onOpenDiscussion }) {
  return (
    <section className="institutional-trust" id="institutional-trust">
      <div className="institutional-trust-inner">
        <div className="institutional-trust-heading" data-reveal>
          <div>
            <p className="section-tag">Institutional acquisition</p>
            <h2>A professional process for strategic buyers.</h2>
          </div>
          <p>
            QuantiValue.com is offered directly by its owner through a confidential,
            structured and internationally accessible acquisition process.
          </p>
        </div>

        <div className="institutional-signal-grid" data-reveal>
          {institutionalSignals.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="institutional-timeline" data-reveal>
          <div className="institutional-timeline-heading">
            <p className="section-tag light">Acquisition timeline</p>
            <h2>Clear from first inquiry to secure transfer.</h2>
          </div>

          <div className="institutional-timeline-grid">
            {acquisitionSteps.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="institutional-cta" data-reveal>
          <div>
            <span>PRIVATE OWNER REVIEW</span>
            <h2>Request a confidential discussion.</h2>
            <p>
              No broker, no public negotiation and no automated response. Qualified
              inquiries are reviewed directly and answered within 48 hours.
            </p>
          </div>
          <a className="institutional-process-link" href="#diligence">
            Review diligence overview <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
