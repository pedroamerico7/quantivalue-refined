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

const industryMultiples = {
  Software: 8.4,
  Fintech: 7.2,
  Healthcare: 6.5,
  Industrial: 5.1,
  Consumer: 4.6,
};

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
    revenue: 420,
    margin: 24,
    growth: 18,
    industry: "Software",
  });
  const [demoRunning, setDemoRunning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("platform");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const valuationDemo = useMemo(() => {
    const revenue = Math.max(10, Number(demoInputs.revenue) || 10);
    const margin = Math.max(1, Number(demoInputs.margin) || 1);
    const growth = Math.max(0, Number(demoInputs.growth) || 0);
    const baseMultiple = industryMultiples[demoInputs.industry] || 6;
    const qualityAdjustment = 1 + margin / 100 * 0.8 + growth / 100 * 1.15;
    const enterpriseValue = revenue * baseMultiple * qualityAdjustment;
    const confidence = Math.min(98, Math.round(78 + margin * 0.35 + growth * 0.25));
    return {
      enterpriseValue,
      low: enterpriseValue * 0.88,
      high: enterpriseValue * 1.12,
      confidence,
      multiple: baseMultiple * qualityAdjustment,
    };
  }, [demoInputs]);

  function updateDemoInput(event) {
    const { name, value } = event.target;
    setDemoInputs((current) => ({ ...current, [name]: value }));
  }

  function runValuationDemo() {
    setDemoRunning(true);
    window.setTimeout(() => setDemoRunning(false), 850);
  }

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
      if (event.key === "Escape") {
        setOfferOpen(false);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let frameId = null;

    function updateScrollProgress() {
      const documentElement = document.documentElement;
      const scrollableHeight = documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0;
      setScrollProgress(progress);
      frameId = null;
    }

    function onScroll() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrollProgress);
      }
    }

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);


  useEffect(() => {
    const sectionIds = [
      "platform",
      "technology",
      "asset-package",
      "investor-room",
      "diligence",
      "transaction-faq",
      "acquire",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.08, 0.2, 0.45] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dashboard = document.querySelector(".dashboard-showcase");
    if (!dashboard || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    function onPointerMove(event) {
      const rect = dashboard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      dashboard.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      dashboard.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
      dashboard.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      dashboard.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    }

    function resetTilt() {
      dashboard.style.setProperty("--tilt-x", "0deg");
      dashboard.style.setProperty("--tilt-y", "0deg");
      dashboard.style.setProperty("--glow-x", "68%");
      dashboard.style.setProperty("--glow-y", "34%");
    }

    dashboard.addEventListener("pointermove", onPointerMove);
    dashboard.addEventListener("pointerleave", resetTilt);
    return () => {
      dashboard.removeEventListener("pointermove", onPointerMove);
      dashboard.removeEventListener("pointerleave", resetTilt);
    };
  }, []);

  useEffect(() => {
    function updateBackToTop() {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.85);
    }
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    return () => window.removeEventListener("scroll", updateBackToTop);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 720);
    return () => window.clearTimeout(timer);
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

  return (
    <div className="app-shell">
      {isLoading && (
        <div className="brand-loader" role="status" aria-label="Loading QuantiValue">
          <div className="brand-loader-mark" aria-hidden="true">
            <img src="/quantum-ring.svg" alt="" />
            <span />
          </div>
          <strong>QuantiValue</strong>
          <small>Financial intelligence · Built on explainability</small>
        </div>
      )}
      <div
        className="scroll-progress"
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(scrollProgress * 100)}
      >
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <aside className="story-rail" aria-label="Page story progress">
        <span className={activeSection === "platform" ? "active" : ""}>01</span>
        <span className={activeSection === "technology" ? "active" : ""}>02</span>
        <span className={activeSection === "asset-package" ? "active" : ""}>03</span>
        <span className={activeSection === "investor-room" || activeSection === "diligence" ? "active" : ""}>04</span>
        <span className={activeSection === "transaction-faq" || activeSection === "acquire" ? "active" : ""}>05</span>
      </aside>

      <header className="site-header">
        <a className="logo" href="#top" aria-label="QuantiValue home" onClick={() => setMobileMenuOpen(false)}>
          <img className="logo-symbol" src="/quantum-ring.svg" alt="" aria-hidden="true" />
          <span className="logo-name">QuantiValue</span>
        </a>

        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={mobileMenuOpen ? "mobile-open" : ""}
          aria-label="Primary navigation"
        >
          <a className={activeSection === "platform" ? "active" : ""} href="#platform" onClick={() => setMobileMenuOpen(false)}>Platform</a>
          <a className={activeSection === "technology" ? "active" : ""} href="#technology" onClick={() => setMobileMenuOpen(false)}>Technology</a>
          <a className={activeSection === "asset-package" ? "active" : ""} href="#asset-package" onClick={() => setMobileMenuOpen(false)}>Assets</a>
          <a className={activeSection === "investor-room" ? "active" : ""} href="#investor-room" onClick={() => setMobileMenuOpen(false)}>Brief</a>
          <a className={activeSection === "diligence" ? "active" : ""} href="#diligence" onClick={() => setMobileMenuOpen(false)}>Diligence</a>
          <a className={activeSection === "transaction-faq" ? "active" : ""} href="#transaction-faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <a className={activeSection === "acquire" ? "active" : ""} href="#acquire" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button
            className="mobile-nav-offer"
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setOfferOpen(true);
            }}
          >
            Request private discussion <Arrow />
          </button>
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


        <section className="product-demo" id="platform">
          <div className="product-demo-heading" data-reveal>
            <div>
              <p className="section-tag light">Interactive product demo</p>
              <h2>Model value. Trace the reasoning.</h2>
            </div>
            <p>
              Adjust the operating assumptions to preview how an explainable valuation
              system can translate financial inputs into a reviewable enterprise value range.
            </p>
          </div>

          <div className={`product-demo-shell ${demoRunning ? "is-running" : ""}`} data-reveal>
            <form className="demo-controls" onSubmit={(event) => { event.preventDefault(); runValuationDemo(); }}>
              <div className="demo-panel-label">Model inputs</div>
              <label>
                Annual revenue
                <span className="demo-input-wrap">
                  <i>$</i>
                  <input name="revenue" type="number" min="10" step="10" value={demoInputs.revenue} onChange={updateDemoInput} />
                  <b>M</b>
                </span>
              </label>
              <label>
                EBITDA margin
                <span className="demo-input-wrap">
                  <input name="margin" type="number" min="1" max="70" step="1" value={demoInputs.margin} onChange={updateDemoInput} />
                  <b>%</b>
                </span>
              </label>
              <label>
                Revenue growth
                <span className="demo-input-wrap">
                  <input name="growth" type="number" min="0" max="100" step="1" value={demoInputs.growth} onChange={updateDemoInput} />
                  <b>%</b>
                </span>
              </label>
              <label>
                Industry
                <select name="industry" value={demoInputs.industry} onChange={updateDemoInput}>
                  {Object.keys(industryMultiples).map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </label>
              <button type="submit">
                {demoRunning ? "Running explainable model…" : "Run AI valuation"}
                <Arrow />
              </button>
              <small>Illustrative demo only — not investment advice.</small>
            </form>

            <div className="demo-results" aria-live="polite">
              <div className="demo-results-top">
                <div>
                  <span>Enterprise value</span>
                  <strong>${(valuationDemo.enterpriseValue / 1000).toFixed(2)}B</strong>
                </div>
                <div>
                  <span>AI confidence</span>
                  <strong>{valuationDemo.confidence}%</strong>
                </div>
              </div>
              <div className="demo-range-card">
                <div>
                  <span>Comparable range</span>
                  <strong>${(valuationDemo.low / 1000).toFixed(2)}B — ${(valuationDemo.high / 1000).toFixed(2)}B</strong>
                </div>
                <div className="demo-range-track" aria-hidden="true">
                  <i style={{ width: `${Math.min(92, valuationDemo.confidence)}%` }} />
                  <b style={{ left: `${Math.min(90, Math.max(18, valuationDemo.confidence - 8))}%` }} />
                </div>
              </div>
              <div className="demo-explainability">
                <div className="demo-panel-label">Explainability trace</div>
                <ul>
                  <li><span>01</span><p><strong>Industry multiple</strong>{valuationDemo.multiple.toFixed(1)}× adjusted revenue basis</p></li>
                  <li><span>02</span><p><strong>Profitability premium</strong>{demoInputs.margin}% EBITDA margin improves model quality</p></li>
                  <li><span>03</span><p><strong>Growth adjustment</strong>{demoInputs.growth}% growth expands the valuation range</p></li>
                  <li><span>04</span><p><strong>Reviewable output</strong>Assumptions remain visible and auditable</p></li>
                </ul>
              </div>
              <div className="demo-timeline" aria-label="Valuation process">
                {['Input','Normalize','Model','Explain','Decide'].map((step, index) => (
                  <span key={step}><i>{String(index + 1).padStart(2, '0')}</i>{step}</span>
                ))}
              </div>
            </div>
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


        <section className="investor-room" id="investor-room">
          <div className="investor-room-heading" data-reveal>
            <div>
              <p className="section-tag light">Investor brief</p>
              <h2>A concise acquisition case, ready for review.</h2>
            </div>
            <p>
              Review the strategic rationale, included assets, transfer process and
              commercial positioning in a focused one-page acquisition brief.
            </p>
          </div>

          <div className="investor-room-grid">
            <article data-reveal>
              <span>01</span>
              <small>POSITIONING</small>
              <h3>Category-defining name</h3>
              <p>QuantiValue combines quantitative intelligence with commercial value in one globally legible brand.</p>
            </article>
            <article data-reveal>
              <span>02</span>
              <small>ASSET PACKAGE</small>
              <h3>Launch-ready foundation</h3>
              <p>Premium .COM, identity system, working website, product vision and acquisition infrastructure.</p>
            </article>
            <article data-reveal>
              <span>03</span>
              <small>TRANSFER</small>
              <h3>Direct owner transaction</h3>
              <p>Private discussion, secure payment, registrar transfer and delivery of the included digital assets.</p>
            </article>
          </div>

          <div className="investor-room-actions" data-reveal>
            <a className="investor-brief-button" href="/investor-brief.html" target="_blank" rel="noreferrer">
              Open investor brief <Arrow />
            </a>
            <a className="investor-brief-download" href="/QuantiValue-Investor-Brief.pdf" download>
              Download PDF
            </a>
            <button className="investor-discussion-button" type="button" onClick={() => setOfferOpen(true)}>
              Request private discussion
            </button>
          </div>
        </section>

        <section className="diligence-room" id="diligence">
          <div className="diligence-heading" data-reveal>
            <div>
              <p className="section-tag">Due diligence room</p>
              <h2>Everything a serious buyer needs to verify.</h2>
            </div>
            <p>
              A structured acquisition checklist makes the opportunity easier to review,
              compare and move toward a secure transaction.
            </p>
          </div>

          <div className="diligence-status" data-reveal>
            <div className="diligence-score">
              <strong>92%</strong>
              <span>Acquisition readiness</span>
            </div>
            <div className="diligence-meter" aria-label="Acquisition readiness: 92 percent">
              <span />
            </div>
          </div>

          <div className="diligence-grid">
            <article data-reveal>
              <span className="diligence-check">✓</span>
              <div><small>DOMAIN</small><h3>QuantiValue.com</h3><p>Exact-match premium .COM under direct owner control.</p></div>
              <b>READY</b>
            </article>
            <article data-reveal>
              <span className="diligence-check">✓</span>
              <div><small>BRAND</small><h3>Identity system</h3><p>Quantum Ring, wordmark, palette, typography and brand direction.</p></div>
              <b>READY</b>
            </article>
            <article data-reveal>
              <span className="diligence-check">✓</span>
              <div><small>PRODUCT</small><h3>Interactive concept</h3><p>Live valuation demonstration and enterprise product narrative.</p></div>
              <b>READY</b>
            </article>
            <article data-reveal>
              <span className="diligence-check">✓</span>
              <div><small>TECHNICAL</small><h3>Production codebase</h3><p>React, Vite, Cloudflare Pages and serverless acquisition endpoints.</p></div>
              <b>READY</b>
            </article>
            <article data-reveal>
              <span className="diligence-check">✓</span>
              <div><small>DOCUMENTATION</small><h3>Investor materials</h3><p>Investor brief, asset manifest and acquisition process documentation.</p></div>
              <b>READY</b>
            </article>
            <article data-reveal>
              <span className="diligence-pending">→</span>
              <div><small>TRANSACTION</small><h3>Buyer-specific terms</h3><p>Final price, escrow route and transfer schedule are agreed privately.</p></div>
              <b className="pending">DISCUSSION</b>
            </article>
          </div>

          <div className="diligence-actions" data-reveal>
            <a href="/QuantiValue-Asset-Manifest.csv" download>Download asset manifest</a>
            <a href="/QuantiValue-Investor-Brief.pdf" download>Download investor brief</a>
            <button type="button" onClick={() => setOfferOpen(true)}>Open a private discussion</button>
          </div>
        </section>


        <section className="transaction-faq" id="transaction-faq">
          <div className="transaction-faq-heading" data-reveal>
            <div>
              <p className="section-tag">Transaction FAQ</p>
              <h2>A clear, confidential path from interest to ownership.</h2>
            </div>
            <p>
              The acquisition process is designed to reduce uncertainty for qualified
              buyers while preserving privacy, transaction security and direct access
              to the domain owner.
            </p>
          </div>

          <div className="transaction-faq-grid">
            <details open data-reveal>
              <summary>What is included in the acquisition?</summary>
              <p>
                The QuantiValue.com domain, the live website source, the visual identity
                system, positioning materials, product concepts, technical SEO assets
                and the downloadable acquisition documents listed in the diligence room.
              </p>
            </details>

            <details data-reveal>
              <summary>How is the domain transferred?</summary>
              <p>
                After cleared funds or escrow confirmation, the domain can be transferred
                through the current registrar or moved to the buyer’s preferred registrar,
                subject to standard transfer eligibility and security checks.
              </p>
            </details>

            <details data-reveal>
              <summary>Can the transaction use escrow?</summary>
              <p>
                Yes. A reputable escrow provider may be used so payment and transfer are
                coordinated through a neutral third party. Provider fees and the exact
                workflow are agreed before closing.
              </p>
            </details>

            <details data-reveal>
              <summary>Is the discussion confidential?</summary>
              <p>
                Yes. Inquiries are reviewed privately. Additional diligence materials
                and transaction details can be shared after buyer identity and serious
                intent are established.
              </p>
            </details>

            <details data-reveal>
              <summary>Is the displayed valuation demo a financial opinion?</summary>
              <p>
                No. The interactive valuation module is an illustrative product concept.
                It demonstrates positioning and explainability, but it is not investment,
                accounting, legal or valuation advice.
              </p>
            </details>

            <details data-reveal>
              <summary>What is the expected next step?</summary>
              <p>
                Submit a private inquiry with your company details and indicative offer.
                Qualified buyers will receive a direct response to confirm fit, diligence
                scope, transaction structure and timing.
              </p>
            </details>
          </div>

          <div className="transaction-trust-strip" data-reveal>
            <span><b>01</b> Direct owner contact</span>
            <span><b>02</b> Escrow compatible</span>
            <span><b>03</b> Secure registrar transfer</span>
            <span><b>04</b> Digital asset handoff</span>
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
        <span className="footer-signature">Built for <b>AI</b> <i>·</i> <b>Finance</b> <i>·</i> <b>Valuation</b></span>
        <a href="mailto:sales@quantivalue.com">sales@quantivalue.com</a>
      </footer>

      <div className="mobile-conversion-bar">
        <div>
          <span>QuantiValue.com</span>
          <strong>Private acquisition</strong>
        </div>
        <button type="button" onClick={() => setOfferOpen(true)}>
          Discuss <Arrow />
        </button>
      </div>

      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

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
                <input name="amount" type="number" min="50000" step="1000" required defaultValue="75000" />
                <span className="field-hint">Suggested opening proposal: US$75,000. Minimum: US$50,000.</span>
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
