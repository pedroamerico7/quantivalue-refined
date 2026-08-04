# Sprint 32 — Acquisition Command Center

## Added
- Modular `AcquisitionCenter` section.
- Acquisition readiness score.
- Live recorded-visit metric.
- Due diligence checklist.
- Buyer download center.
- Transaction timeline.
- Private discussion CTA.

## Technical structure
- `src/components/AcquisitionCenter.jsx`
- `src/components/ReadinessScore.jsx`
- `src/components/MetricsPanel.jsx`
- `src/components/DownloadCard.jsx`
- `src/components/TransactionTimeline.jsx`

## Integration
The previous monolithic Due Diligence section in `App.jsx` was replaced by the
new modular command center while preserving its `#diligence` anchor.

## Cleanup
Removed duplicate root-level `App.jsx` and `styles.css` files when present.
