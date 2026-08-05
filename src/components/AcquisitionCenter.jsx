import DownloadCard from "./DownloadCard";
import MetricsPanel from "./MetricsPanel";
import ReadinessScore from "./ReadinessScore";
import TransactionTimeline from "./TransactionTimeline";

const checklist = [
  ["Domain", "QuantiValue.com under direct owner control"],
  ["Brand", "Quantum Ring, wordmark, palette and positioning"],
  ["Product", "Interactive valuation demonstration"],
  ["Technical", "React, Vite and Cloudflare deployment"],
  ["Documentation", "Acquisition brief and asset manifest"],
  ["Transaction", "Buyer-specific terms agreed privately"],
];

export default function AcquisitionCenter({ onOpenDiscussion }) {
  return (
    <section className="acquisition-command-center" id="diligence">
      <div className="command-heading" data-reveal>
        <div>
          <p className="section-tag light">Diligence center</p>
          <h2>One executive view of the entire opportunity.</h2>
        </div>
        <p>
          Review readiness, transferable assets, buyer materials and the
          proposed path from first inquiry to secure ownership.
        </p>
      </div>

      <div className="command-overview">
        <ReadinessScore />
        <MetricsPanel />
      </div>

      <div className="command-body">
        <div className="command-checklist" data-reveal>
          <div className="command-block-heading">
            <span>Due diligence status</span>
            <small>5 ready · 1 buyer-specific</small>
          </div>

          {checklist.map(([title, copy], index) => (
            <article key={title}>
              <span className={index === checklist.length - 1 ? "pending" : ""}>
                {index === checklist.length - 1 ? "→" : "✓"}
              </span>
              <div>
                <small>{title}</small>
                <p>{copy}</p>
              </div>
              <b>{index === checklist.length - 1 ? "DISCUSSION" : "READY"}</b>
            </article>
          ))}
        </div>

        <div className="command-downloads" data-reveal>
          <div className="command-block-heading">
            <span>Download center</span>
            <small>Buyer review materials</small>
          </div>

          <div className="command-download-grid">
            <DownloadCard
              type="PDF"
              title="Acquisition Brief"
              meta="Executive overview"
              href="/QuantiValue-Acquisition-Brief.pdf"
            />
            <DownloadCard
              type="CSV"
              title="Asset Manifest"
              meta="Transferable assets"
              href="/QuantiValue-Asset-Manifest.csv"
            />
            <DownloadCard
              type="HTML"
              title="Process Guide"
              meta="Process and terms"
              href="/acquisition.html"
              download={false}
            />
            <DownloadCard
              type="LIVE"
              title="Interactive Platform"
              meta="Product concept"
              href="#platform"
              download={false}
            />
          </div>
        </div>
      </div>

      <div className="command-transaction" data-reveal>
        <div className="command-block-heading">
          <span>Transaction path</span>
          <small>Direct · private · escrow-compatible</small>
        </div>
        <TransactionTimeline />
      </div>

      <div className="command-cta" data-reveal>
        <div>
          <small>Qualified buyer access</small>
          <h3>Move from review to a private owner discussion.</h3>
        </div>
        <button type="button" onClick={onOpenDiscussion}>
          Request private discussion <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}
