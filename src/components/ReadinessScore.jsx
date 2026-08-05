export default function ReadinessScore() {
  return (
    <div className="command-readiness">
      <div
        className="command-readiness-ring"
        style={{ "--readiness": "100%" }}
        role="img"
        aria-label="Acquisition package prepared"
      >
        <span>✓</span>
      </div>

      <div>
        <small>Acquisition package</small>
        <h3>Prepared for buyer review</h3>
        <p>
          Core brand, product, technical and transaction materials are assembled
          for qualified buyer review.
        </p>
      </div>
    </div>
  );
}
