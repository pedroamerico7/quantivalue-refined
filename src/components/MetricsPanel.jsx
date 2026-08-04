function formatMetric(value) {
  if (value === null || value === undefined) return "Syncing";
  if (typeof value === "number") return value.toLocaleString("en-US");
  return value;
}

export default function MetricsPanel({ views }) {
  const metrics = [
    { label: "Recorded visits", value: views, note: "Live site metric" },
    { label: "Included assets", value: 4, note: "Transferable package" },
    { label: "Readiness score", value: "98%", note: "Acquisition preparation" },
    { label: "Availability", value: "Open", note: "Private discussion" },
  ];

  return (
    <div className="command-metrics" aria-label="Acquisition metrics">
      {metrics.map((metric) => (
        <article key={metric.label}>
          <small>{metric.label}</small>
          <strong>{formatMetric(metric.value)}</strong>
          <span>{metric.note}</span>
        </article>
      ))}
    </div>
  );
}
