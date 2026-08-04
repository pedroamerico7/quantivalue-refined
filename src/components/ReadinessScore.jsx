export default function ReadinessScore({ score = 98 }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <div className="command-readiness">
      <div
        className="command-readiness-ring"
        style={{ "--readiness": `${safeScore}%` }}
        role="img"
        aria-label={`Diligence readiness: ${safeScore} percent`}
      >
        <span>{safeScore}%</span>
      </div>

      <div>
        <small>Diligence readiness</small>
        <h3>Launch-ready foundation</h3>
        <p>
          Core brand, product, technical and transaction materials are assembled
          for qualified buyer review.
        </p>
      </div>
    </div>
  );
}
