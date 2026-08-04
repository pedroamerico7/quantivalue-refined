function formatMetric(value) {
  if (value === null || value === undefined) return "Available";
  if (typeof value === "number") return value.toLocaleString("en-US");
  return value;
}

export default function MetricsPanel() {
  const metrics = [
    { label: "Organic visibility", value: "International", note: "Inbound discovery" },
    { label: "Included assets", value: 4, note: "Transferable package" },
    { label: "Readiness score", value: "98%", note: "Diligence preparation" },
    { label: "Availability", value: "Open", note: "Private discussion" },
  ];

  return (
    <div className="command-metrics" aria-label="Diligence metrics">
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
