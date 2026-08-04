const highlights = [
  {
    number: "01",
    title: "Premium global .COM",
    copy: "A concise, memorable digital asset designed for international credibility and long-term brand ownership.",
  },
  {
    number: "02",
    title: "AI + finance positioning",
    copy: "The name naturally connects quantitative intelligence, valuation and enterprise financial decision-making.",
  },
  {
    number: "03",
    title: "Strategic flexibility",
    copy: "Suitable for a product company, research platform, institutional software business or a new global category.",
  },
  {
    number: "04",
    title: "Direct owner process",
    copy: "A confidential acquisition path with direct communication, due diligence and secure transfer options.",
  },
];

const applications = [
  ["AI valuation platform", "Explainable enterprise and asset valuation workflows."],
  ["Quantitative research", "Institutional research, signals and evidence systems."],
  ["Financial intelligence SaaS", "Decision infrastructure for finance and strategy teams."],
  ["Enterprise analytics", "AI-assisted reporting, scenarios and executive insight."],
  ["Investment intelligence", "Tools for funds, private markets and capital allocation."],
  ["Fintech infrastructure", "A credible parent brand for data, APIs and workflow products."],
];

const validationSignals = [
  "Existing international organic traffic",
  "Audience signals from North America",
  "Audience signals from European markets",
  "Direct navigation and brand discovery",
  "Detailed analytics available in due diligence",
];

export default function StrategicBuyerAcquisition({ onOpenDiscussion }) {
  return (
    <section className="strategic-buyer-suite" id="strategic-opportunity">
      <div className="strategic-thesis" data-reveal>
        <div className="strategic-thesis-copy">
          <p className="section-tag light">Strategic investment thesis</p>
          <h2>A category-defining brand for the next generation of financial intelligence.</h2>
          <p>
            QuantiValue.com is positioned at the intersection of artificial intelligence,
            quantitative finance and enterprise analytics. It gives an acquiring company
            an immediate global identity without the delay, ambiguity or compromise of
            building around a weaker name.
          </p>

          <div className="strategic-thesis-actions">
            <button type="button" onClick={onOpenDiscussion}>
              Begin Strategic Acquisition <span aria-hidden="true">↗</span>
            </button>
            <a href="#diligence">Review acquisition readiness <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="strategic-thesis-panel" aria-label="Strategic acquisition summary">
          <span className="strategic-panel-kicker">QUANTIVALUE.COM</span>
          <strong>AI · Finance · Valuation</strong>
          <p>
            A premium digital asset for founders, scale-ups and established organizations
            seeking a credible international brand.
          </p>
          <div>
            <span>Private process</span>
            <span>Global rights</span>
            <span>Direct owner</span>
          </div>
        </div>
      </div>

      <div className="strategic-highlights" data-reveal>
        {highlights.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="strategic-applications" data-reveal>
        <div className="strategic-section-heading">
          <div>
            <p className="section-tag">Potential applications</p>
            <h2>One name. Multiple high-value directions.</h2>
          </div>
          <p>
            The brand is broad enough for a category leader, yet precise enough to
            communicate quantitative value from the first interaction.
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

      <div className="strategic-validation" data-reveal>
        <div>
          <p className="section-tag light">Market validation</p>
          <h2>International attention already exists.</h2>
          <p>
            QuantiValue receives organic interest from the United States and European
            markets. Detailed traffic evidence is reserved for qualified buyers during
            due diligence.
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

      <div className="strategic-why-now" data-reveal>
        <div>
          <p className="section-tag">Why strategic buyers act early</p>
          <h2>Premium positioning becomes harder to secure after the category matures.</h2>
        </div>
        <p>
          A strong .COM can shorten the path to credibility, support international
          expansion and give a new product or division a name that already sounds
          established. QuantiValue is being offered through a confidential process,
          directly to qualified strategic buyers.
        </p>
      </div>

      <div className="strategic-final-cta" data-reveal>
        <div>
          <span>CONFIDENTIAL ACQUISITION PROCESS</span>
          <h2>Secure the brand before your market defines it for you.</h2>
          <p>
            Direct owner communication, analytics during due diligence and a structured
            transfer path for qualified buyers.
          </p>
        </div>
        <button type="button" onClick={onOpenDiscussion}>
          Begin Confidential Acquisition <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}
