const trustItems = [
  ["Verified ownership", "Direct control of QuantiValue.com and its transferable digital assets."],
  ["Private negotiation", "All discussions are handled confidentially with qualified buyers."],
  ["Global transfer", "International acquisition and registrar transfer are supported."],
  ["Escrow compatible", "The transaction can be structured through a recognized escrow provider."],
  ["Direct owner", "No unnecessary layers between the buyer and the current owner."],
];

const processSteps = [
  ["01", "Confidential discussion", "Initial fit, intended use and acquisition parameters."],
  ["02", "Strategic evaluation", "Buyer review of brand, product concept and market potential."],
  ["03", "Due diligence", "Ownership, traffic evidence, assets and transfer details."],
  ["04", "Secure transfer", "Agreement, escrow and coordinated domain handoff."],
];

const faqs = [
  [
    "Is the acquisition process exclusive?",
    "QuantiValue.com is offered through a private process. The owner may speak with more than one qualified party until definitive terms are agreed.",
  ],
  [
    "Is due diligence available?",
    "Yes. Qualified buyers can review ownership evidence, traffic analytics, included assets and technical documentation.",
  ],
  [
    "Can the acquisition be completed internationally?",
    "Yes. The process is designed for international buyers and can be completed with a recognized escrow provider.",
  ],
  [
    "Is escrow supported?",
    "Yes. A reputable third-party escrow service may be used to protect both buyer and seller.",
  ],
  [
    "Who owns the domain?",
    "The domain is offered directly by its current owner. Ownership evidence is available during due diligence.",
  ],
  [
    "How long does transfer take?",
    "Timing depends on registrar requirements, escrow and buyer readiness, but the operational handoff can be coordinated promptly after closing.",
  ],
];

export default function BuyerConfidence({ onOpenDiscussion }) {
  return (
    <section className="buyer-confidence" id="buyer-confidence">
      <div className="buyer-confidence-inner">
        <div className="buyer-executive-summary" data-reveal>
          <div>
            <p className="section-tag light">Executive summary</p>
            <h2>A structured acquisition process for a strategic digital asset.</h2>
          </div>
          <p>
            QuantiValue.com is positioned for artificial intelligence, quantitative
            finance and enterprise software. The process is designed for founders,
            scale-ups and established organizations seeking a credible global brand.
          </p>
        </div>

        <div className="buyer-trust-grid" data-reveal>
          {trustItems.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <div className="buyer-process" data-reveal>
          <div className="buyer-section-heading">
            <div>
              <p className="section-tag light">Acquisition process</p>
              <h2>Clear from first conversation to secure transfer.</h2>
            </div>
            <p>
              Each stage is designed to reduce uncertainty, protect confidentiality and
              give qualified buyers the information needed to proceed.
            </p>
          </div>

          <div className="buyer-process-grid">
            {processSteps.map(([number, title, copy], index) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                {index < processSteps.length - 1 && <i aria-hidden="true" />}
              </article>
            ))}
          </div>
        </div>

        <div className="buyer-secure-transaction" data-reveal>
          <div>
            <span className="buyer-security-icon" aria-hidden="true">◆</span>
            <div>
              <small>Secure transaction framework</small>
              <h3>Escrow-compatible and internationally transferable.</h3>
            </div>
          </div>
          <ul>
            <li>Recognized escrow provider</li>
            <li>Registrar transfer support</li>
            <li>Documented asset handoff</li>
          </ul>
        </div>

        <div className="buyer-faq" data-reveal>
          <div className="buyer-section-heading">
            <div>
              <p className="section-tag light">Buyer FAQ</p>
              <h2>Answers for strategic acquirers.</h2>
            </div>
            <p>
              Additional legal, technical and traffic information is available privately
              during due diligence.
            </p>
          </div>

          <div className="buyer-faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="buyer-enterprise-cta" data-reveal>
          <div>
            <span>QUALIFIED BUYER ACCESS</span>
            <h2>Schedule a confidential discussion.</h2>
            <p>
              Speak directly with the owner and request the executive brief, traffic
              evidence and acquisition documentation.
            </p>
          </div>
          <div>
            <button type="button" onClick={onOpenDiscussion}>
              Schedule Confidential Discussion <span aria-hidden="true">↗</span>
            </button>
            <a href="/enterprise.html">
              Enterprise Overview <span aria-hidden="true">↗</span>
            </a>
            <a href="/acquisition-brief.html">
              Open Acquisition Brief <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
