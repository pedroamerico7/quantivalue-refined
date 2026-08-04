import { useEffect, useMemo, useState } from "react";

const sectors = [
  "AI Valuation",
  "Fintech Infrastructure",
  "Quantitative Finance",
  "Investment Intelligence",
  "M&A Technology",
  "Enterprise Analytics",
];


const opportunitySignals = [
  {
    label: "AI-native finance",
    title: "Explainability becomes a buying criterion",
    copy: "As financial teams adopt AI, transparent reasoning and reviewable evidence become part of the product promise.",
    index: "01",
  },
  {
    label: "Valuation infrastructure",
    title: "Decision workflows are moving beyond spreadsheets",
    copy: "The category is expanding from isolated models toward connected systems for valuation, scenarios and institutional review.",
    index: "02",
  },
  {
    label: "Strategic brand value",
    title: "A precise name compresses time to market",
    copy: "QuantiValue signals quantitative intelligence and commercial value before the first sales call, demo or transaction.",
    index: "03",
  },
];


const includedAssets = [
  {
    number: "01",
    title: "QuantiValue.com",
    copy: "The exact-match premium .COM domain with direct owner transfer and global commercial flexibility.",
    meta: "DOMAIN · DIGITAL IDENTITY",
  },
  {
    number: "02",
    title: "Brand identity system",
    copy: "Quantum Ring symbol, wordmark direction, color system, typography and a consistent visual language.",
    meta: "LOGO · WORDMARK · GUIDELINES",
  },
  {
    number: "03",
    title: "Live website platform",
    copy: "Responsive React and Vite source, Cloudflare deployment configuration, acquisition flow and technical SEO assets.",
    meta: "SOURCE · DEPLOYMENT · SEO",
  },
  {
    number: "04",
    title: "Product and market vision",
    copy: "Dashboard concept, technology narrative, category architecture and positioning for explainable financial intelligence.",
    meta: "PRODUCT UI · STRATEGY · POSITIONING",
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

const FALLBACK_VIEWS = 1070;

function formatViews(value) {
  const safeValue = Number.isFinite(Number(value)) ? Number(value) : FALLBACK_VIEWS;
  return safeValue.toLocaleString("en-US");
}

export default function App() {
  const [views, setViews] = useState(FALLBACK_VIEWS);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerStatus, setOfferStatus] = useState({ state: "idle", message: "" });
  const [demoInputs, setDemoInputs] = useState({
    revenue: 500,
    margin: 28,
    growth: 22,
    industry: "Software",
  });
  const [demoRunning, setDemoRunning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
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
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        const reportedViews = Number(data?.views);
        setViews(Number.isFinite(reportedViews) ? Math.max(FALLBACK_VIEWS, reportedViews) : FALLBACK_VIEWS);
        if (shouldIncrement) localStorage.setItem(storageKey, String(Date.now()));
      })
      .catch(() => setViews(FALLBACK_VIEWS));
  }, []);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setOfferOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function submitOffer(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setOfferStatus({ state: "sending", message: "Encrypting and submitting your offer…" });

    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: { "content-type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit the offer.");

      form.reset();
      setOfferStatus({
        state: "success",
        message: `Offer received. Confidential reference: ${result.reference}`,
      });
    } catch (error) {
      setOfferStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Unable to submit the offer.",
      });
    }
  }

  const demoResult = useMemo(() => {
    const industryMultiples = {
      Software: 8.4,
      Fintech: 7.6,
      "Professional Services": 5.2,
      Industrial: 4.7,
    };
    const revenue = Number(demoInputs.revenue) || 0;
    const margin = Number(demoInputs.margin) || 0;
    const growth = Number(demoInputs.growth) || 0;
    const baseMultiple = industryMultiples[demoInputs.industry] || 6;
    const qualityAdjustment = 1 + Math.max(-0.2, Math.min(0.45, (margin - 20) / 100 + (growth - 12) / 120));
    const enterpriseValue = revenue * baseMultiple * qualityAdjustment;
    const confidence = Math.max(72, Math.min(98, Math.round(82 + margin / 5 + growth / 7)));
    const low = enterpriseValue * 0.91;
    const high = enterpriseValue * 1.09;
    const formatBillions = (value) => `$${(value / 1000).toFixed(2)}B`;

    return {
      value: formatBillions(enterpriseValue),
      range: `${formatBillions(low)} — ${formatBillions(high)}`,
      confidence,
      multiple: `${(enterpriseValue / Math.max(revenue, 1)).toFixed(1)}x`,
    };
  }, [demoInputs]);

  function updateDemoInput(event) {
    const { name, value } = event.target;
    setDemoInputs((current) => ({ ...current, [name]: value }));
  }

  function runDemo() {
    setDemoRunning(true);
    window.setTimeout(() => setDemoRunning(false), 850);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="logo" href="#top" aria-label="QuantiValue home">
          <img className="logo-symbol" src="/quantum-ring.svg" alt="" aria-hidden="true" />
          <span className="logo-name">QuantiValue</span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#interactive-demo">Platform</a>
          <a href="#technology">Technology</a>
          <a href="#asset-package">Assets</a>
          <a href="#acquire">Contact</a>
        </nav>

        <button className="header-offer" type="button" onClick={() => setOfferOpen(true)}>
          Private discussion <Arrow />
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-aura aura-one" aria-hidden="true" />
          <div className="hero-aura aura-two" aria-hidden="true" />

          <div className="hero-orbital" aria-hidden="true">
            <span className="orbital-ring orbital-ring-one" />
            <span className="orbital-ring orbital-ring-two" />
            <span className="orbital-ring orbital-ring-three" />
            <span className="orbital-node orbital-node-one" />
            <span className="orbital-node orbital-node-two" />
            <span className="orbital-node orbital-node-three" />
            <span className="orbital-node orbital-node-four" />
          </div>

          <div className="hero-content" data-reveal>
            <div className="availability">
              <span className="live-dot" />
              Premium .COM available for acquisition
            </div>

            <h1>
              <span className="hero-title-main">Financial Intelligence.</span>
              <span className="hero-title-signature">Built on Explainability.</span>
            </h1>

            <p className="hero-description">
              Enterprise-grade brand for explainable AI, valuation technology and
              institutional financial intelligence. Built for investors, M&amp;A advisors,
              private equity and financial institutions.
            </p>

            <div className="hero-actions">
              <button className="primary-cta" type="button" onClick={() => setOfferOpen(true)}>
                Request private discussion <Arrow />
              </button>
              <a className="secondary-cta" href="#thesis">
                Read the brand thesis <span>↓</span>
              </a>
            </div>

            <p className="hero-trust">
              Acquisition <span>•</span> Licensing <span>•</span> Strategic partnership
            </p>

            <div className="hero-proof">
              <div className="visitor-proof" aria-label={`${formatViews(views)} recorded site visits`}>
                <strong><span className="counter-live-dot" aria-hidden="true" />{formatViews(views)}+</strong>
                <span>recorded site visits</span>
              </div>
              <div>
                <strong>Premium .COM</strong>
                <span>global digital asset</span>
              </div>
              <div>
                <strong>Category-ready</strong>
                <span>AI · finance · valuation</span>
              </div>
              <div>
                <strong>Private</strong>
                <span>direct owner acquisition</span>
              </div>
            </div>
          </div>

          <div className="dashboard-showcase" data-reveal aria-label="Conceptual QuantiValue dashboard preview">
            <div className="dashboard-chrome">
              <div className="dashboard-brand">
                <img src="/quantum-ring.svg" alt="" aria-hidden="true" />
                <span>QuantiValue Intelligence</span>
              </div>
              <div className="dashboard-status"><i /> Live model</div>
            </div>

            <div className="dashboard-body">
              <aside className="dashboard-sidebar" aria-hidden="true">
                <span className="active">Overview</span>
                <span>Valuation</span>
                <span>Scenarios</span>
                <span>Evidence</span>
              </aside>

              <div className="dashboard-main">
                <div className="dashboard-heading">
                  <div>
                    <small>ENTERPRISE OVERVIEW</small>
                    <strong>Northstar Analytics</strong>
                  </div>
                  <span>Updated now</span>
                </div>

                <div className="dashboard-kpis">
                  <article><small>Enterprise value</small><strong>$2.43B</strong><span>+4.2%</span></article>
                  <article><small>AI confidence</small><strong>98%</strong><span>High</span></article>
                  <article><small>Risk score</small><strong>18</strong><span>Low</span></article>
                </div>

                <div className="dashboard-chart">
                  <div className="chart-meta"><span>Valuation range</span><strong>$2.18B — $2.67B</strong></div>
                  <svg viewBox="0 0 520 180" role="img" aria-label="Conceptual valuation trend chart">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B63FF" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#3B63FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-area" d="M0 150 C65 140 92 118 138 126 S220 96 270 103 S350 55 405 72 S472 34 520 22 L520 180 L0 180 Z" />
                    <path className="chart-line" d="M0 150 C65 140 92 118 138 126 S220 96 270 103 S350 55 405 72 S472 34 520 22" />
                    <circle cx="520" cy="22" r="5" />
                  </svg>
                </div>

                <div className="dashboard-insight">
                  <div className="insight-mark">AI</div>
                  <div><small>EXPLAINABLE INSIGHT</small><p>Value increased as recurring revenue improved and the discount rate declined.</p></div>
                  <strong>94%</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sector-rail" aria-label="Target markets">
          <div className="sector-track">
            {[...sectors, ...sectors].map((sector, index) => (
              <span key={`${sector}-${index}`}>{sector}<i /></span>
            ))}
          </div>
        </section>


        <section className="technology" id="technology">
          <div className="technology-heading" data-reveal>
            <p className="section-tag">Technology vision</p>
            <h2>Three systems.<br />One verifiable decision.</h2>
            <p>
              QuantiValue is positioned around the infrastructure required to turn
              complex financial information into decisions that can be reviewed,
              challenged and trusted.
            </p>
          </div>

          <div className="technology-grid">
            <article className="technology-card" data-reveal>
              <div className="technology-visual explainable-visual" aria-hidden="true">
                <span className="tech-core">AI</span>
                <span className="tech-node tech-node-a">Data</span>
                <span className="tech-node tech-node-b">Logic</span>
                <span className="tech-node tech-node-c">Evidence</span>
                <i className="tech-line tech-line-a" />
                <i className="tech-line tech-line-b" />
                <i className="tech-line tech-line-c" />
              </div>
              <small>01 · EXPLAINABILITY</small>
              <h3>Explainable AI Engine</h3>
              <p>
                Models designed to reveal assumptions, evidence and reasoning — not
                just produce an opaque output.
              </p>
              <span className="technology-link">Trace every conclusion <Arrow /></span>
            </article>

            <article className="technology-card" data-reveal>
              <div className="technology-visual valuation-visual" aria-hidden="true">
                <span className="valuation-axis axis-y" />
                <span className="valuation-axis axis-x" />
                <span className="valuation-bar bar-one" />
                <span className="valuation-bar bar-two" />
                <span className="valuation-bar bar-three" />
                <span className="valuation-range">$2.18B — $2.67B</span>
              </div>
              <small>02 · VALUATION</small>
              <h3>Institutional Valuation</h3>
              <p>
                A brand architecture built for DCF, comparables, scenario analysis
                and enterprise-grade financial modeling.
              </p>
              <span className="technology-link">Model with discipline <Arrow /></span>
            </article>

            <article className="technology-card" data-reveal>
              <div className="technology-visual decision-visual" aria-hidden="true">
                <span className="decision-ring ring-one" />
                <span className="decision-ring ring-two" />
                <span className="decision-dot dot-one" />
                <span className="decision-dot dot-two" />
                <span className="decision-dot dot-three" />
                <span className="decision-center">QV</span>
              </div>
              <small>03 · DECISIONS</small>
              <h3>Decision Intelligence</h3>
              <p>
                A system positioned to connect valuation outputs with risk,
                confidence and strategic action.
              </p>
              <span className="technology-link">Move from model to action <Arrow /></span>
            </article>
          </div>
        </section>

        <section className="thesis" id="thesis">
          <div className="section-intro" data-reveal>
            <p className="section-tag">Brand thesis</p>
            <h2>Quantitative intelligence.<br />Commercial value.</h2>
            <p>
              A category-ready name that makes the product promise legible before
              the first demo, model or transaction.
            </p>
          </div>

          <div className="equation" data-reveal>
            <article>
              <small>QUANTI</small>
              <strong>Models</strong>
              <span>Data, forecasting, precision and machine intelligence.</span>
            </article>
            <div className="equation-mark">×</div>
            <article>
              <small>VALUE</small>
              <strong>Outcomes</strong>
              <span>Valuation, investment insight and strategic decisions.</span>
            </article>
            <div className="equation-result">
              <small>RESULT</small>
              <strong>QuantiValue</strong>
            </div>
          </div>
        </section>

        <section className="market-opportunity" id="markets">
          <div className="opportunity-heading" data-reveal>
            <p className="section-tag">Market opportunity</p>
            <h2>Positioned where finance, AI and strategic value converge.</h2>
            <p>
              QuantiValue is designed to sit at the intersection of categories that
              increasingly depend on trust, explainability and institutional-grade decision systems.
            </p>
          </div>

          <div className="opportunity-signals">
            {opportunitySignals.map((signal) => (
              <article key={signal.index} data-reveal>
                <small>{signal.index}</small>
                <div>
                  <span>{signal.label}</span>
                  <h3>{signal.title}</h3>
                  <p>{signal.copy}</p>
                </div>
                <Arrow />
              </article>
            ))}
          </div>

          <div className="opportunity-categories" data-reveal>
            <div className="opportunity-orbit" aria-hidden="true">
              <span className="opportunity-core">QV</span>
              <i className="opportunity-ring ring-a" />
              <i className="opportunity-ring ring-b" />
              <b className="opportunity-dot dot-a" />
              <b className="opportunity-dot dot-b" />
              <b className="opportunity-dot dot-c" />
            </div>
            <div className="category-list">
              <p>Category architecture</p>
              {sectors.map((sector, index) => (
                <div key={sector}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{sector}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="brand-film" id="brand">
          <div className="film-light film-light-a" aria-hidden="true" />
          <div className="film-light film-light-b" aria-hidden="true" />
          <div className="film-copy" data-reveal>
            <p className="section-tag light">Positioning</p>
            <blockquote>
              “A name that sounds established before the company is built.”
            </blockquote>
          </div>
          <div className="film-word" aria-hidden="true">QV</div>
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

        <section className="interactive-demo" id="interactive-demo">
          <div className="interactive-demo-heading" data-reveal>
            <div>
              <p className="section-tag light">Interactive product demo</p>
              <h2>Test the logic behind an explainable valuation.</h2>
            </div>
            <p>
              Adjust the operating assumptions and watch the illustrative valuation,
              range and confidence score respond in real time.
            </p>
          </div>

          <div className="interactive-demo-shell" data-reveal>
            <div className="demo-controls">
              <div className="demo-controls-heading">
                <span>INPUT MODEL</span>
                <strong>Operating assumptions</strong>
              </div>

              <label>
                Annual revenue
                <div className="demo-input-wrap"><span>$</span><input name="revenue" type="number" min="10" max="10000" step="10" value={demoInputs.revenue} onChange={updateDemoInput} /><small>M</small></div>
              </label>
              <label>
                EBITDA margin
                <div className="demo-range-row"><input name="margin" type="range" min="5" max="60" value={demoInputs.margin} onChange={updateDemoInput} /><strong>{demoInputs.margin}%</strong></div>
              </label>
              <label>
                Annual growth
                <div className="demo-range-row"><input name="growth" type="range" min="0" max="70" value={demoInputs.growth} onChange={updateDemoInput} /><strong>{demoInputs.growth}%</strong></div>
              </label>
              <label>
                Industry
                <select name="industry" value={demoInputs.industry} onChange={updateDemoInput}>
                  <option>Software</option>
                  <option>Fintech</option>
                  <option>Professional Services</option>
                  <option>Industrial</option>
                </select>
              </label>

              <button className="demo-run-button" type="button" onClick={runDemo} disabled={demoRunning}>
                {demoRunning ? "Running valuation…" : "Run AI valuation"} <Arrow />
              </button>
              <p className="demo-disclaimer">Illustrative product experience. Not investment advice or a formal valuation.</p>
            </div>

            <div className={`demo-output ${demoRunning ? "is-running" : ""}`}>
              <div className="demo-output-top">
                <div><span>ILLUSTRATIVE ENTERPRISE VALUE</span><strong>{demoResult.value}</strong></div>
                <div className="demo-confidence"><span>AI confidence</span><strong>{demoResult.confidence}%</strong></div>
              </div>

              <div className="demo-range-card">
                <span>Comparable range</span>
                <strong>{demoResult.range}</strong>
                <div className="demo-range-track"><i style={{ width: `${demoResult.confidence}%` }} /></div>
                <small>Implied revenue multiple: {demoResult.multiple}</small>
              </div>

              <div className="demo-explainability">
                <div className="demo-explainability-title"><span>AI</span><div><small>WHY THIS VALUATION?</small><strong>Evidence behind the output</strong></div></div>
                <ul>
                  <li><i />Growth profile supports a premium to the sector baseline.</li>
                  <li><i />EBITDA margin improves operating quality and cash conversion.</li>
                  <li><i />Industry multiple is adjusted by growth and profitability.</li>
                  <li><i />The confidence range expands when assumptions weaken.</li>
                </ul>
              </div>

              <div className="demo-timeline" aria-label="Valuation process">
                {['Input','Normalize','Model','Explain','Decide'].map((step, index) => (
                  <div key={step} className={demoRunning && index > 1 ? 'pending' : ''}><span>{String(index + 1).padStart(2,'0')}</span><strong>{step}</strong></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="asset-package" id="asset-package">
          <div className="asset-package-heading" data-reveal>
            <div>
              <p className="section-tag">Included asset package</p>
              <h2>More than a domain. A launch-ready brand foundation.</h2>
            </div>
            <p>
              The acquisition is structured to transfer a coherent digital identity,
              a working commercial website and the strategic system behind the name.
            </p>
          </div>

          <div className="asset-package-grid">
            {includedAssets.map((asset) => (
              <article key={asset.number} data-reveal>
                <div className="asset-card-top">
                  <small>{asset.number}</small>
                  <span>{asset.meta}</span>
                </div>
                <h3>{asset.title}</h3>
                <p>{asset.copy}</p>
                <div className="asset-card-line" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="asset-package-summary" data-reveal>
            <div>
              <span>01</span>
              <strong>Premium .COM</strong>
              <small>Direct owner transfer</small>
            </div>
            <div>
              <span>02</span>
              <strong>Identity system</strong>
              <small>Brand-ready assets</small>
            </div>
            <div>
              <span>03</span>
              <strong>Live codebase</strong>
              <small>React + Cloudflare</small>
            </div>
            <div>
              <span>04</span>
              <strong>Strategic vision</strong>
              <small>AI + finance positioning</small>
            </div>
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

          <button className="acquire-button" type="button" onClick={() => setOfferOpen(true)}>
            <span>Start a confidential conversation</span>
            <strong>Make an Offer</strong>
            <Arrow />
          </button>
        </section>
      </main>

      <footer>
        <a className="logo footer-logo" href="#top">
          <img className="logo-symbol" src="/quantum-ring.svg" alt="" aria-hidden="true" />
          <span className="logo-name">QuantiValue</span>
        </a>
        <span>Premium brand available for acquisition</span>
        <a href="mailto:sales@quantivalue.com">sales@quantivalue.com</a>
      </footer>

      {offerOpen && (
        <div className="modal-backdrop" onMouseDown={() => setOfferOpen(false)}>
          <section
            className="offer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={() => setOfferOpen(false)} aria-label="Close">
              ×
            </button>

            <div className="modal-brand">
              <p className="section-tag light">Confidential acquisition</p>
              <h2 id="offer-title">Make an Offer</h2>
              <p>
                Submit a serious proposal for QuantiValue.com. Details are encrypted
                in transit and stored privately for owner review.
              </p>
              <div className="modal-stat">
                <span className="live-dot" />
                <strong>{formatViews(views)}+ recorded site visits</strong>
              </div>
            </div>

            <form className="offer-form" onSubmit={submitOffer}>
              <div className="form-row">
                <label>
                  Name
                  <input name="name" required minLength="2" maxLength="100" placeholder="Your name" />
                </label>
                <label>
                  Company
                  <input name="company" required minLength="2" maxLength="120" placeholder="Organization" />
                </label>
              </div>
              <label>
                Business email
                <input name="email" type="email" required maxLength="160" placeholder="name@company.com" />
              </label>
              <label>
                Offer amount (USD)
                <input name="amount" type="number" min="50000" step="5000" required defaultValue="75000" />
                <span className="field-hint">Suggested opening proposal: US$75,000. Minimum accepted field value: US$50,000.</span>
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="4"
                  required
                  minLength="10"
                  maxLength="2000"
                  defaultValue="I would like to discuss an acquisition of QuantiValue.com."
                />
              </label>
              <label className="honeypot" aria-hidden="true">
                Website
                <input name="website" tabIndex="-1" autoComplete="off" />
              </label>

              <button type="submit" disabled={offerStatus.state === "sending"}>
                {offerStatus.state === "sending" ? "Submitting securely…" : "Submit confidential offer"}
                <Arrow />
              </button>

              <p className="privacy-note">Private owner review • No public disclosure</p>

              {offerStatus.state !== "idle" && (
                <p className={`status ${offerStatus.state}`} role="status">
                  {offerStatus.message}
                </p>
              )}
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
