const strategicReasons = [
  {
    index: "01",
    title: "Global .COM",
    copy: "A concise, globally recognized extension suited to a category-level financial technology brand.",
  },
  {
    index: "02",
    title: "Clear strategic meaning",
    copy: "QuantiValue communicates quantitative intelligence and commercial value in a single name.",
  },
  {
    index: "03",
    title: "Enterprise ready",
    copy: "Positioned for institutional software, data products, analytics and decision infrastructure.",
  },
  {
    index: "04",
    title: "AI and finance alignment",
    copy: "A natural fit for valuation, financial intelligence, investment technology and explainable AI.",
  },
];

const buyerProfiles = [
  "AI Platforms",
  "Fintech",
  "Enterprise Software",
  "Financial Data",
  "Investment Technology",
  "Private Markets",
];

export default function InstitutionalPolish({ onOpenDiscussion }) {
  return (
    <section className="institutional-polish" id="why-acquire">
      <div className="institutional-polish-inner">
        <div className="institutional-polish-heading" data-reveal>
          <div>
            <p className="section-tag">Strategic value</p>
            <h2>Why QuantiValue?</h2>
          </div>
          <p>
            A focused brand asset for organizations building the next generation of
            financial intelligence, valuation and enterprise decision technology.
          </p>
        </div>

        <div className="institutional-polish-grid" data-reveal>
          {strategicReasons.map((reason) => (
            <article key={reason.index}>
              <span>{reason.index}</span>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </article>
          ))}
        </div>

        <div className="buyer-profile-panel" data-reveal>
          <div>
            <p className="section-tag light">Strategic buyer profile</p>
            <h3>Designed for ambitious financial technology organizations.</h3>
          </div>

          <div className="buyer-profile-tags" aria-label="Strategic buyer categories">
            {buyerProfiles.map((profile) => (
              <span key={profile}>{profile}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
