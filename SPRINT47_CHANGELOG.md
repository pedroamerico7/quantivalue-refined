# Sprint 47 — Mobile Sticky Header + Conversion Consolidation

## Fixed
- Mobile top bar now remains fixed during the complete page scroll.
- Reading-progress bar is fixed above the mobile top bar.
- Header becomes smaller and more translucent after scrolling.

## Consolidated
- Removed the duplicated Buyer Confidence section from the main page flow.
- Preserved the interactive AI panel and its functionality.
- Shortened strategic, technology, asset and acquisition spacing.
- Hid redundant legacy sections on mobile.
- Kept the strongest conversion flow:
  1. Hero
  2. Strategic thesis
  3. Interactive AI panel
  4. Market validation
  5. Acquisition readiness and process
  6. FAQ
  7. Final acquisition CTA

## Files
- `src/App.jsx`
- `src/styles.css`

## Important
`BuyerConfidence.jsx` remains in the repository for future reuse, but it is no
longer rendered in the main page because its content repeated the Acquisition
Command Center and FAQ.
