import { useEffect, useMemo, useState } from "react";
import AcquisitionCenter from "./components/AcquisitionCenter";
import StrategicBuyerAcquisition from "./components/StrategicBuyerAcquisition";
import InstitutionalTrust from "./components/InstitutionalTrust";
import CorporateOverview from "./components/CorporateOverview";
import InstitutionalPolish from "./components/InstitutionalPolish";
import { attributionPayload, captureAttribution } from "./utils/attribution";

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
    copy: "A distinctive .COM domain with direct owner transfer and broad commercial flexibility.",
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

export default function App() {
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerStatus, setOfferStatus] = useState({ state: "idle", message: "" });
  const [offerReference, setOfferReference] = useState("");
  const [offerErrors, setOfferErrors] = useState({});
  const [demoInputs, setDemoInputs] = useState({
    revenue: 28,
    margin: 24,
    growth: 18,
    industry: "Software",
  });
  const [demoRunning, setDemoRunning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);

  const valuationDemo = useMemo(() => {
    const revenue = Math.min(100, Math.max(1, Number(demoInputs.revenue) || 1));
    const margin = Math.max(1, Number(demoInputs.margin) || 1);
    const growth = Math.max(0, Number(demoInputs.growth) || 0);
    const baseMultiple = industryMultiples[demoInputs.industry] || 6;
    const qualityAdjustment = 1 + margin / 100 * 0.8 + growth / 100 * 1.15;
    const enterpriseValue = revenue * baseMultiple * qualityAdjustment;
    return {
      enterpriseValue,
      low: enterpriseValue * 0.88,
      high: enterpriseValue * 1.12,
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
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.04, rootMargin: "0px 0px 120px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
    function updateHeaderCompact() {
      setHeaderCompact(window.scrollY > 56);
    }

    updateHeaderCompact();
    window.addEventListener("scroll", updateHeaderCompact, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderCompact);
  }, []);



  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 720);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    captureAttribution();
  }, []);

  function openAcquisitionModal() {
    setOfferStatus({ state: "idle", message: "" });
    setOfferReference("");
    setOfferErrors({});
    setOfferOpen(true);
  }

  async function submitOffer(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    const nextErrors = {};
    const email = String(payload.email || "").trim();
    const amount = Number(String(payload.amount || "").replace(/[^0-9]/g, ""));

    if (String(payload.name || "").trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (String(payload.company || "").trim().length < 2) {
      nextErrors.company = "Please enter your company.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!Number.isFinite(amount) || amount < 1) {
      nextErrors.amount = "Enter your offer amount in USD.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setOfferErrors(nextErrors);
      setOfferStatus({ state: "idle", message: "" });
      form.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }

    payload.email = email;
    payload.amount = String(amount);
    payload.message = String(payload.message || "").trim();
    payload.attribution = attributionPayload();

    setOfferErrors({});
    setOfferReference("");
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
      setOfferReference(result.reference || "QV-RECEIVED");
      setOfferStatus({
        state: "success",
        message: "Your private offer has been received.",
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

      <header className={`site-header ${headerCompact ? "is-compact" : ""}`}>
        <a className="logo" href="#top" aria-label="QuantiValue home" onClick={() => setMobileMenuOpen(false)}>
          <img className="logo-symbol" src="/quantum-ring.svg" alt="" aria-hidden="true" width="64" height="64" decoding="async" />
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
          <a href="#overview" onClick={() => setMobileMenuOpen(false)}>Overview</a>
          <a href="#strategic-opportunity" onClick={() => setMobileMenuOpen(false)}>Applications</a>
          <a href="#platform" onClick={() => setMobileMenuOpen(false)}>AI Platform</a>
          <a href="#institutional-trust" onClick={() => setMobileMenuOpen(false)}>Process</a>
          <a href="#diligence" onClick={() => setMobileMenuOpen(false)}>Diligence</a>
          <a href="#transaction-faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <a
            className="mobile-nav-offer"
            href="#acquire"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact <Arrow />
          </a>
        </nav>

        <a className="header-offer header-offer-link" href="#acquire">
          Contact <Arrow />
        </a>
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
              Strategic .COM available
            </div>

            <h1>
              <span className="hero-title-main">A strategic global brand.</span>
              <span className="hero-title-signature">For AI and financial intelligence.</span>
            </h1>

            <p className="hero-description">
              A strategic .COM identity for AI, quantitative finance, valuation technology
              and enterprise analytics — presented directly by its owner.
            </p>

            <div className="hero-actions">
              <button className="primary-cta" type="button" onClick={openAcquisitionModal}>
                Request Private Discussion <Arrow />
              </button>
              <a className="secondary-cta" href="#strategic-opportunity">
                Explore the strategic thesis <span>↓</span>
              </a>
            </div>

            <p className="hero-trust">
              Single owner <span>•</span> Verified communication <span>•</span> Escrow compatible
            </p>

            <div className="hero-proof">
              <div>
                <strong>Memorable</strong>
                <span>clear two-word construction</span>
              </div>
              <div>
                <strong>Global .COM</strong>
                <span>global digital asset</span>
              </div>
              <div>
                <strong>Category-ready</strong>
                <span>AI · finance · valuation</span>
              </div>
              <div>
                <strong>Private</strong>
                <span>direct owner process</span>
              </div>
            </div>
          </div>

          <div className="dashboard-showcase" data-reveal aria-label="Conceptual QuantiValue dashboard preview">
            <div className="dashboard-chrome">
              <div className="dashboard-brand">
                <img src="/quantum-ring.svg" alt="" aria-hidden="true" width="48" height="48" decoding="async" />
                <span>QuantiValue Intelligence</span>
              </div>
              <div className="dashboard-status"><i /> Concept preview</div>
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
                  <span>Illustrative scenario</span>
                </div>

                <div className="dashboard-kpis">
                  <article><small>Enterprise value</small><strong>$243M</strong><span>+4.2%</span></article>
                  <article><small>Model mode</small><strong>AI</strong><span>Illustrative</span></article>
                  <article><small>Risk view</small><strong>Low</strong><span>Scenario</span></article>
                </div>

                <div className="dashboard-chart">
                  <div className="chart-meta"><span>Valuation range</span><strong>$218M — $267M</strong></div>
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
                  <strong>Traceable</strong>
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


        <CorporateOverview onOpenDiscussion={openAcquisitionModal} />

        <StrategicBuyerAcquisition onOpenDiscussion={openAcquisitionModal} />
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
                  <input name="revenue" type="number" min="1" max="100" step="1" value={demoInputs.revenue} onChange={updateDemoInput} />
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
                  <strong>${Math.round(valuationDemo.enterpriseValue)}M</strong>
                </div>
                <div>
                  <span>Model mode</span>
                  <strong>Illustrative</strong>
                </div>
              </div>
              <div className="demo-range-card">
                <div>
                  <span>Comparable range</span>
                  <strong>${Math.round(valuationDemo.low)}M — ${Math.round(valuationDemo.high)}M</strong>
                </div>
                <div className="demo-range-track" aria-hidden="true">
                  <i style={{ width: "68%" }} />
                  <b style={{ left: "58%" }} />
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
        <InstitutionalPolish onOpenDiscussion={openAcquisitionModal} />

        <InstitutionalTrust onOpenDiscussion={openAcquisitionModal} />

        <AcquisitionCenter onOpenDiscussion={openAcquisitionModal} />

        <section className="transaction-faq" id="transaction-faq">
          <div className="transaction-faq-heading" data-reveal>
            <div>
              <p className="section-tag">Buyer FAQ</p>
              <h2>A clear path from initial interest to ownership.</h2>
            </div>
            <p>
              The process is designed to reduce uncertainty for qualified buyers while
              preserving privacy, transaction security and direct access to the owner.
            </p>
          </div>

          <div className="transaction-faq-grid">
            <details open data-reveal>
              <summary>What is included?</summary>
              <p>
                The QuantiValue.com domain, the live website source, the visual identity
                system, positioning materials, product concepts, technical SEO assets
                and the downloadable materials listed in the diligence room.
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
              <summary>Is the discussion private?</summary>
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
              <summary>Why QuantiValue instead of another financial brand?</summary>
              <p>
                The name combines quantitative intelligence and value creation in a
                concise global .COM. It can support multiple product categories without
                limiting the buyer to a single financial workflow or technology.
              </p>
            </details>

            <details data-reveal>
              <summary>Why is the process private?</summary>
              <p>
                Privacy protects the buyer’s strategic intent, internal planning and
                negotiating position while allowing ownership, transfer and included assets
                to be reviewed through a controlled diligence process.
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
            <p className="section-tag light">Owner review</p>
            <h2>Acquire the name behind intelligent valuation.</h2>
            <p>
              QuantiValue.com is available through a direct, confidential owner
              transaction. Serious strategic inquiries are welcome.
            </p>
            <div className="acquire-details">
              <span>Global .COM</span>
              <span>Secure transfer</span>
              <span>Transferable assets</span>
            </div>
          </div>

          <button className="acquire-button" type="button" onClick={openAcquisitionModal}>
            <span>Private offer</span>
            <strong>Submit Private Offer</strong>
            <Arrow />
          </button>
        </section>
      </main>

      <footer>
        <a className="logo footer-logo" href="#top">
          <img className="logo-symbol" src="/quantum-ring.svg" alt="" aria-hidden="true" width="64" height="64" decoding="async" />
          <span className="logo-name">QuantiValue</span>
        </a>
        <span className="footer-signature">
          <b>Global .COM Asset</b>
          <i>·</i>
          Buyer-ready brand package
          <i>·</i>
          Acquisitions worldwide
        </span>
        <div className="footer-acquisition-contact">
          <small>Direct contact</small>
          <button
            className="footer-email"
            type="button"
            onClick={openAcquisitionModal}
            aria-label="Open the private contact form"
          >
            acquisition@quantivalue.com
          </button>
        </div>
      </footer>

      <div className="mobile-conversion-bar">
        <div>
          <span>QuantiValue.com</span>
          <strong>Direct owner process</strong>
        </div>
        <button type="button" onClick={openAcquisitionModal}>
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
              <p className="section-tag light">Private offer</p>
              <h2 id="offer-title">Private Offer</h2>
              <p className="modal-owner-note">
                Your proposal is reviewed by the owner. A secure marketplace or
                escrow-supported process can be used to complete the transaction.
              </p>
              <p>
                Submit a confidential proposal for QuantiValue.com. Your information
                is reviewed privately by the owner.
              </p>
              <div className="modal-stat">
                <span className="live-dot" />
                <strong>Secure acquisition process</strong>
              </div>
            </div>

            {offerStatus.state === "success" ? (
              <div className="offer-success" role="status" aria-live="polite">
                <span className="offer-success-mark" aria-hidden="true">✓</span>
                <p className="section-tag">Offer received</p>
                <h3>Thank you for your proposal.</h3>
                <p>
                  Your submission is now in private owner review. Qualified buyers
                  receive a response within 48 hours.
                </p>

                <div className="offer-reference">
                  <small>Private reference</small>
                  <strong>{offerReference || "QV-RECEIVED"}</strong>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(offerReference || "QV-RECEIVED")}
                  >
                    Copy reference
                  </button>
                </div>

                <div className="offer-success-actions">
                  <button type="button" onClick={() => setOfferOpen(false)}>
                    Return to QuantiValue
                  </button>
                  <a
                    href={`mailto:acquisition@quantivalue.com?subject=${encodeURIComponent(
                      `QuantiValue follow-up — ${offerReference || "QV-RECEIVED"}`
                    )}`}
                  >
                    Email owner
                  </a>
                </div>
              </div>
            ) : (
            <form className="offer-form" onSubmit={submitOffer} noValidate>
              <div className="form-row">
                <label>
                  Your Name
                  <input
                    name="name"
                    maxLength="100"
                    placeholder="Your Name"
                    autoComplete="name"
                    aria-invalid={Boolean(offerErrors.name)}
                    onInput={() => setOfferErrors((current) => ({ ...current, name: "" }))}
                  />
                  {offerErrors.name && <span className="field-error">{offerErrors.name}</span>}
                </label>
                <label>
                  Company
                  <input
                    name="company"
                    maxLength="120"
                    placeholder="Organization"
                    autoComplete="organization"
                    aria-invalid={Boolean(offerErrors.company)}
                    onInput={() => setOfferErrors((current) => ({ ...current, company: "" }))}
                  />
                  {offerErrors.company && <span className="field-error">{offerErrors.company}</span>}
                </label>
              </div>
              <label>
                Business Email
                <input
                  name="email"
                  type="text"
                  inputMode="email"
                  maxLength="160"
                  placeholder="name@company.com"
                  autoComplete="email"
                  aria-invalid={Boolean(offerErrors.email)}
                  onInput={() => setOfferErrors((current) => ({ ...current, email: "" }))}
                />
                {offerErrors.email && <span className="field-error">{offerErrors.email}</span>}
              </label>
              <label>
                Enter your offer (USD)
                <input
                  name="amount"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Enter your offer (USD)"
                  aria-invalid={Boolean(offerErrors.amount)}
                  onInput={(event) => {
                    event.currentTarget.value = event.currentTarget.value.replace(/[^0-9]/g, "");
                    setOfferErrors((current) => ({ ...current, amount: "" }));
                  }}
                />
                {offerErrors.amount && <span className="field-error">{offerErrors.amount}</span>}
              </label>
              <label>
  Strategic Notes
  <textarea
    name="message"
    rows="4"
    maxLength="2000"
    placeholder="Strategic Notes (optional)"
  />
</label>
              <label className="honeypot" aria-hidden="true">
                Website
                <input name="website" tabIndex="-1" autoComplete="off" />
              </label>

              <button type="submit" disabled={offerStatus.state === "sending"}>
                {offerStatus.state === "sending" ? "Submitting securely…" : "Submit Private Offer"}
                <Arrow />
              </button>

              <p className="privacy-note">
                All inquiries are handled confidentially. Qualified buyers receive a response within 48 hours.
              </p>

              {offerStatus.state !== "idle" && (
                <div className={`status ${offerStatus.state}`} role="status">
                  <span>{offerStatus.message}</span>
                  {offerStatus.state === "error" && (
                    <a href="mailto:acquisition@quantivalue.com">
                      Submit directly by email
                    </a>
                  )}
                </div>
              )}
            </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
