import { useEffect, useState } from "react";

const sectors = [
  "AI Valuation",
  "Fintech Infrastructure",
  "Quantitative Finance",
  "Investment Intelligence",
  "M&A Technology",
  "Enterprise Analytics",
];
const advantages = [
  {
    icon: "🌍",
    title: "Global .COM",
    text: "Recognized worldwide and built for international expansion.",
  },
  {
    icon: "🤖",
    title: "AI Native",
    text: "Naturally positioned for artificial intelligence and quantitative systems.",
  },
  {
    icon: "🏢",
    title: "Enterprise Ready",
    text: "Professional enough for fintechs, research platforms and institutional products.",
  },
  {
    icon: "💎",
    title: "Long-Term Brand",
    text: "Timeless, memorable and independent of short-term technology trends.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Immediate category signal",
    copy: "QuantiValue naturally connects quantitative intelligence with valuation, capital allocation and financial decision-making.",
  },
  {
    number: "02",
    title: "Institutional character",
    copy: "The name feels credible for enterprise software, investment platforms, research systems and global financial products.",
  },
  {
    number: "03",
    title: "Global brand architecture",
    copy: "Concise, pronounceable and commercially clear across international English-language markets.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function formatViews(value) {
  return value === null ? "—" : value.toLocaleString("en-US");
}

export default function App() {
  const [views, setViews] = useState(null);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerStatus, setOfferStatus] = useState({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }),
      { threshold: 0.12 }
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const storageKey = "quantivalue-view-counted-at";
    const last = Number(localStorage.getItem(storageKey) || 0);
    const shouldIncrement = Date.now() - last > 24 * 60 * 60 * 1000;

    fetch("/api/views", {
      method: shouldIncrement ? "POST" : "GET",
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setViews(Number(data.views) || 0);

        if (shouldIncrement) {
          localStorage.setItem(storageKey, String(Date.now()));
        }
      })
      .catch(() => setViews(null));
  }, []);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setOfferOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function submitOffer(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setOfferStatus({
      state: "sending",
      message: "Encrypting and submitting your inquiry…",
    });

    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to submit the acquisition inquiry."
        );
      }

      form.reset();

      setOfferStatus({
        state: "success",
        message: `Inquiry successfully received.

Reference: ${result.reference}

The owner will review your proposal privately.
Typical response time: one business day.`,
      });
    } catch (error) {
      setOfferStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit the acquisition inquiry.",
      });
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="logo" href="#top" aria-label="QuantiValue home">
          <span className="logo-symbol">Q</span>
          <span className="logo-name">QuantiValue</span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#thesis">Thesis</a>
          <a href="#markets">Markets</a>
          <a href="#acquire">Acquire</a>
        </nav>

        <button
          className="header-offer"
          type="button"
          onClick={() => setOfferOpen(true)}
        >
          Private acquisition <Arrow />
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-aura aura-one" aria-hidden="true" />
          <div className="hero-aura aura-two" aria-hidden="true" />

          <div className="hero-content" data-reveal>
            <div className="availability">
              <span className="live-dot" />
              Premium .COM available for acquisition
            </div>

            <h1>
              The brand for
              <span>intelligent value.</span>
            </h1>

            <p className="hero-description">
              QuantiValue.com is a premium global identity for AI-powered
              valuation, quantitative finance and financial intelligence.
            </p>

            <div className="hero-actions">
              <button
                className="primary-cta"
                type="button"
                onClick={() => setOfferOpen(true)}
              >
                Make an Offer <Arrow />
              </button>

              <a className="secondary-cta" href="#thesis">
                Explore the opportunity <span>↓</span>
              </a>
            </div>

            <div className="hero-proof">
              <div>
                <strong>{formatViews(views)}+</strong>
                <span>recorded visits</span>
              </div>

              <div>
                <strong>.COM</strong>
                <span>global standard</span>
              </div>

              <div>
                <strong>Direct</strong>
                <span>owner acquisition</span>
              </div>
            </div>
          </div>

          <div className="hero-system" aria-hidden="true">
            <div className="system-grid" />
            <div className="system-ring ring-a" />
            <div className="system-ring ring-b" />
            <div className="system-ring ring-c" />

            <div className="system-core">
              <small>QUANTITATIVE</small>
              <strong>Q</strong>
              <small>VALUE</small>
            </div>

            <span className="system-node node-a" />
            <span className="system-node node-b" />
            <span className="system-node node-c" />

            <span className="system-label label-a">SIGNAL_01</span>
            <span className="system-label label-b">VALUE_∞</span>
            <span className="system-label label-c">AI / FINANCE</span>
          </div>
        </section>

        <section className="sector-rail" aria-label="Target markets">
          <div className="sector-track">
            {[...sectors, ...sectors].map((sector, index) => (
              <span key={`${sector}-${index}`}>
                {sector}
                <i />
              </span>
            ))}
          </div>
        </section>

        <section className="thesis" id="thesis">
          <div className="section-intro" data-reveal>
            <p className="section-tag">Brand thesis</p>

            <h2>
              Quantitative intelligence.
              <br />
              Commercial value.
            </h2>

            <p>
              A category-ready name that makes the product promise legible before
              the first demo, model or transaction.
            </p>
          </div>

          <div className="equation" data-reveal>
            <article>
              <small>QUANTI</small>
              <strong>Models</strong>
              <span>
                Data, forecasting, precision and machine intelligence.
              </span>
            </article>

            <div className="equation-mark">×</div>

            <article>
              <small>VALUE</small>
              <strong>Outcomes</strong>
              <span>
                Valuation, investment insight and strategic decisions.
              </span>
            </article>

            <div className="equation-result">
              <small>RESULT</small>
              <strong>QuantiValue</strong>
            </div>
          </div>
        </section>

        <section className="markets" id="markets">
          <div className="markets-title" data-reveal>
            <p className="section-tag">Built for valuable markets</p>

            <h2>
              One name.
              <br />
              Multiple billion-dollar categories.
            </h2>
          </div>

          <div className="market-grid">
            {sectors.map((sector, index) => (
              <article key={sector} data-reveal>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <h3>{sector}</h3>
                <span className="market-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="brand-film">
          <div className="film-light film-light-a" aria-hidden="true" />
          <div className="film-light film-light-b" aria-hidden="true" />

          <div className="film-copy" data-reveal>
            <p className="section-tag light">Positioning</p>

            <blockquote>
              “A name that sounds established before the company is built.”
            </blockquote>
          </div>

          <div className="film-word" aria-hidden="true">
            QV
          </div>
        </section>

        <section className="pillars">
          <div className="pillars-heading" data-reveal>
            <p className="section-tag">Why it works</p>
            <h2>Designed for institutional ambition.</h2>
          </div>

          <div className="pillar-list">
            {pillars.map((pillar) => (
              <article key={pillar.number} data-reveal>
                <small>{pillar.number}</small>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="acquire" id="acquire">
          <div className="acquire-grid" aria-hidden="true" />

          <div className="acquire-copy" data-reveal>
            <p className="section-tag light">Private acquisition</p>

            <h2>Acquire the name behind intelligent valuation.</h2>

            <p>
              QuantiValue.com is available through a direct, confidential owner
              transaction. Serious strategic inquiries are welcome.
            </p>

            <div className="acquire-details">
              <span>Premium .COM</span>
              <span>Secure transfer</span>
              <span>Global rights</span>
            </div>
          </div>

          <button
            className="acquire-button"
            type="button"
            onClick={() => setOfferOpen(true)}
          >
            <span>Start a confidential conversation</span>
            <strong>Make an Offer</strong>
            <Arrow />
          </button>
        </section>
      </main>

      <footer>
        <a className="logo footer-logo" href="#top">
          <span className="logo-symbol">Q</span>
          <span className="logo-name">QuantiValue</span>
        </a>

        <span>Premium brand available for acquisition</span>

        <a href="mailto:sales@quantivalue.com">
          sales@quantivalue.com
        </a>
      </footer>

      {offerOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setOfferOpen(false)}
        >
          <section
            className="offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setOfferOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-brand">
              <p className="section-tag light">Confidential acquisition</p>

              <h2 id="offer-title">Private Acquisition Inquiry</h2>

              <p>
                Submit a confidential acquisition proposal directly to the owner
                of QuantiValue.com. All inquiries remain private and are reviewed
                individually.
              </p>

              <div className="modal-stat">
                <span className="live-dot" />
                <strong>{formatViews(views)}+ recorded visits</strong>
              </div>
            </div>

            <div className="offer-form-column">
              <div className="offer-premium-box">
                <strong>Private Acquisition</strong>

                <p>
                  QuantiValue.com is available for strategic acquisition by
                  companies, investment groups and founders.
                </p>
              </div>

              <form className="offer-form" onSubmit={submitOffer}>
                <div className="form-row">
                  <label>
                    Full name
                    <input
                      name="name"
                      required
                      minLength="2"
                      maxLength="100"
                      placeholder="Your name"
                    />
                  </label>

                  <label>
                    Company
                    <input
                      name="company"
                      required
                      minLength="2"
                      maxLength="120"
                      placeholder="Organization"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Position / Title
                    <input
                      name="position"
                      type="text"
                      maxLength="120"
                      placeholder="Founder / CEO / Director"
                    />
                  </label>

                  <label>
                    Country
                    <input
                      name="country"
                      type="text"
                      maxLength="100"
                      placeholder="United States"
                    />
                  </label>
                </div>

                <label>
                  Business email
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength="160"
                    placeholder="name@company.com"
                  />
                </label>

                <label>
                  Offer amount (USD)
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    step="1"
                    required
                    placeholder="100000"
                  />
                </label>

                <label>
                  Message
                  <textarea
                    name="message"
                    rows="6"
                    required
                    minLength="10"
                    maxLength="2000"
                    placeholder="Tell us about your acquisition plans, intended use of the brand, or any questions regarding QuantiValue.com."
                  />
                </label>

                <label className="honeypot" aria-hidden="true">
                  Website
                  <input
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </label>

                <button
                  type="submit"
                  disabled={offerStatus.state === "sending"}
                >
                  {offerStatus.state === "sending"
                    ? "Submitting securely…"
                    : "Submit Confidential Inquiry"}
                  <Arrow />
                </button>

                <div className="offer-trust">
                  <span>✓ Confidential negotiation</span>
                  <span>✓ Direct communication with the owner</span>
                  <span>✓ Secure third-party escrow available</span>
                </div>

                <p className="privacy-note">
                  Private owner review • No public disclosure
                </p>

                {offerStatus.state !== "idle" && (
                  <p
                    className={`status ${offerStatus.state}`}
                    role="status"
                  >
                    {offerStatus.message}
                  </p>
                )}
              </form>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
