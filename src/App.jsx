import { useEffect, useState } from "react";

const applications = [
  ["01", "AI Valuation", "Business, asset and portfolio valuation powered by intelligent models."],
  ["02", "Investment Intelligence", "Research, screening and decision support for modern investors."],
  ["03", "Quantitative Finance", "Analytics, risk systems and data-driven financial infrastructure."],
  ["04", "Enterprise Analytics", "Financial copilots and intelligence platforms for global organizations."],
  ["05", "M&A Intelligence", "Due diligence, transaction analysis and strategic valuation software."],
  ["06", "Private Markets", "Technology for venture capital, private equity and institutional finance."],
];

const reasons = [
  ["01", "Category clarity", "The name immediately evokes quantitative analysis, valuation and financial intelligence."],
  ["02", "Global authority", "A professional English-language brand designed for international enterprise markets."],
  ["03", "Strategic flexibility", "Natural across fintech, SaaS, enterprise AI, investing, M&A and research."],
  ["04", "Premium ownership", "A concise .com asset with the institutional character to become a category leader."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const key = "quantivalue-view-counted-at";
    const lastCounted = Number(localStorage.getItem(key) || 0);
    const oneDay = 24 * 60 * 60 * 1000;
    const shouldIncrement = Date.now() - lastCounted > oneDay;

    async function loadViews() {
      try {
        const response = await fetch("/api/views", {
          method: shouldIncrement ? "POST" : "GET",
          headers: { "Accept": "application/json" },
        });
        if (!response.ok) throw new Error("Unable to load view count");
        const data = await response.json();
        setViewCount(Number(data.views) || 0);
        if (shouldIncrement) localStorage.setItem(key, String(Date.now()));
      } catch {
        setViewCount(null);
      }
    }

    loadViews();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Confidential QuantiValue.com acquisition inquiry");
    const body = encodeURIComponent(
      `Name: ${data.get("name") || ""}\nCompany: ${data.get("company") || ""}\nBusiness email: ${data.get("email") || ""}\n\nMessage:\n${data.get("message") || ""}`
    );
    setSubmitted(true);
    window.location.href = `mailto:sales@quantivalue.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="QuantiValue home">
          <span className="brand-mark"><i />Q</span>
          <span>QuantiValue</span>
        </a>
        <nav className={menuOpen ? "desktop-nav open" : "desktop-nav"} aria-label="Primary navigation">
          <a href="#rationale" onClick={() => setMenuOpen(false)}>Rationale</a>
          <a href="#applications" onClick={() => setMenuOpen(false)}>Applications</a>
          <a href="#acquisition" onClick={() => setMenuOpen(false)}>Acquisition</a>
        </nav>
        <a className="nav-cta" href="#acquisition">Private inquiry <Arrow /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? "×" : "☰"}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span /> Premium .com brand available for acquisition</div>
            <h1>Intelligence<br />behind every<br /><em>valuation.</em></h1>
            <p className="lede">A distinctive global brand for AI-powered valuation, financial intelligence and quantitative decision systems.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#acquisition">Make an offer <Arrow /></a>
              <a className="text-link" href="#rationale">Explore the brand <span>↓</span></a>
            </div>
            <div className="public-counter" aria-live="polite">
              <span className="counter-pulse" aria-hidden="true" />
              <strong>{viewCount === null ? "—" : viewCount.toLocaleString("en-US") + "+"}</strong>
              <span>visits to QuantiValue.com</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="visual-core"><small>Quantitative</small><strong>Q</strong><small>Value</small></div>
            <span className="data-chip chip-a">SIGNAL / 01</span>
            <span className="data-chip chip-b">VALUE / ∞</span>
            <span className="data-chip chip-c">AI × FINANCE</span>
          </div>
        </section>

        <section className="trust-strip" data-reveal aria-label="Brand qualities">
          <div><small>01</small><strong>Premium .COM</strong><span>Global commercial standard</span></div>
          <div><small>02</small><strong>Enterprise Ready</strong><span>Institutional brand character</span></div>
          <div><small>03</small><strong>Category Native</strong><span>AI, valuation and finance</span></div>
          <div><small>04</small><strong>Privately Held</strong><span>Direct owner transaction</span></div>
        </section>

        <section className="rationale section-dark" id="rationale">
          <div className="section-head" data-reveal>
            <p className="section-label">Brand rationale</p>
            <h2>Two powerful ideas.<br /><span>One ownable name.</span></h2>
          </div>
          <div className="rationale-stage" data-reveal>
            <article>
              <small>QUANTI</small>
              <h3>Quantitative Intelligence</h3>
              <p>Models, data, forecasting, analytical precision and machine intelligence.</p>
            </article>
            <div className="rationale-symbol">×</div>
            <article>
              <small>VALUE</small>
              <h3>Value Creation</h3>
              <p>Valuation, investment insight, strategic decisions and financial outcomes.</p>
            </article>
          </div>
          <div className="wordmark-line" data-reveal><span>QUANTI</span><i /><span>VALUE</span></div>
        </section>

        <section className="applications" id="applications">
          <div className="applications-intro" data-reveal>
            <div>
              <p className="section-label">Potential applications</p>
              <h2>Built for AI, Fintech & Quantitative Finance.</h2>
            </div>
            <p>QuantiValue gives its buyer room to build across high-value markets without sacrificing clarity, authority or international appeal.</p>
          </div>
          <div className="application-grid">
            {applications.map(([n, title, text]) => (
              <article key={n} data-reveal>
                <div className="card-top"><small>{n}</small><Arrow /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-copy" data-reveal>
            <p className="section-label">Positioning</p>
            <blockquote>“A name that sounds established before the company is built.”</blockquote>
          </div>
          <div className="manifesto-metric" data-reveal>
            <span>AI</span><i />
            <span>FINANCE</span><i />
            <span>VALUE</span>
          </div>
        </section>

        <section className="reasons">
          <div className="reasons-heading" data-reveal>
            <p className="section-label">Why QuantiValue</p>
            <h2>Designed to scale from product to institution.</h2>
            <p>Concise enough for software. Credible enough for enterprise. Broad enough for a category-defining platform.</p>
          </div>
          <div className="reason-list">
            {reasons.map(([n, title, text]) => (
              <article key={n} data-reveal>
                <small>{n}</small>
                <div><h3>{title}</h3><p>{text}</p></div>
                <span className="reason-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="asset-profile">
          <div className="asset-copy" data-reveal>
            <p className="section-label">Private acquisition opportunity</p>
            <h2>A strategic name, ready for its category leader.</h2>
            <p>QuantiValue is an independently conceived digital brand created to unite quantitative intelligence with value creation.</p>
          </div>
          <div className="asset-panel" data-reveal>
            <div><small>Digital asset</small><strong>QuantiValue.com</strong><span>Premium global brand</span></div>
            <div><small>Extension</small><strong>.COM</strong><span>Commercial gold standard</span></div>
            <div><small>Positioning</small><strong>AI × FINANCE</strong><span>Immediate category relevance</span></div>
            <div><small>Transaction</small><strong>CONFIDENTIAL</strong><span>Direct owner acquisition</span></div>
          </div>
        </section>

        <section className="acquisition" id="acquisition">
          <div className="acquisition-glow" aria-hidden="true" />
          <div className="acquisition-copy" data-reveal>
            <p className="section-label">Confidential acquisition</p>
            <h2>Own the name behind the next financial intelligence platform.</h2>
            <p>QuantiValue.com is privately held and available for acquisition by a qualified organization.</p>
            <a className="direct-email" href="mailto:sales@quantivalue.com">sales@quantivalue.com <Arrow /></a>
          </div>
          <form className="inquiry-form" onSubmit={handleSubmit} data-reveal>
            <div className="form-head"><span>MAKE AN OFFER</span><small>01 / 01</small></div>
            <label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
            <label>Company<input name="company" required autoComplete="organization" placeholder="Organization" /></label>
            <label>Business email<input name="email" type="email" required autoComplete="email" placeholder="name@company.com" /></label>
            <label>Offer or message<textarea name="message" rows={4} required defaultValue="I would like to discuss an offer for QuantiValue.com." /></label>
            <button type="submit">Submit acquisition offer <Arrow /></button>
            <p className="form-note">This prepares a private email addressed to sales@quantivalue.com.</p>
            {submitted && <p className="form-status">Your email application should open now.</p>}
          </form>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark"><i />Q</span><span>QuantiValue</span></a>
        <p>Premium AI & Financial Intelligence Brand</p>
        <span>© 2026 QuantiValue</span>
      </footer>
    </div>
  );
}
