const steps = [
  ["01", "Inquiry"],
  ["02", "Private discussion"],
  ["03", "Due diligence"],
  ["04", "Agreement"],
  ["05", "Secure transfer"],
  ["06", "Asset handoff"],
];

export default function TransactionTimeline() {
  return (
    <div className="command-timeline" aria-label="Transaction timeline">
      {steps.map(([number, label], index) => (
        <div className="command-timeline-step" key={label}>
          <span>{number}</span>
          <strong>{label}</strong>
          {index < steps.length - 1 && <i aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
