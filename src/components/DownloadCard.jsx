export default function DownloadCard({ type, title, meta, href, download = true }) {
  return (
    <a
      className="command-download-card"
      href={href}
      download={download || undefined}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
    >
      <div>
        <span>{type}</span>
        <small>{meta}</small>
      </div>
      <h3>{title}</h3>
      <b>{download ? "Download" : "Open"} ↗</b>
    </a>
  );
}
