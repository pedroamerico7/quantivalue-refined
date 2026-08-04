# Sprint 48 — Mobile Recovery + Apple-like Clean Consolidation

## Mobile recovery
- Replaced the risky fixed mobile header with a stable sticky header.
- Removed root-level overflow clipping that could cause blank or locked pages on mobile browsers.
- Mobile navigation remains functional in a fixed dropdown below the sticky bar.
- Reading-progress bar remains fixed at the top.

## Page reduction
Removed the full legacy block containing:
- Technology
- Brand thesis
- Market opportunity
- Brand film
- Pillars
- Asset package
- Investor room

These messages were already represented more clearly in the Strategic Buyer section,
interactive AI panel and Acquisition Command Center.

## Final page structure
1. Hero
2. Strategic thesis and applications
3. Interactive AI panel
4. Market validation
5. Acquisition Command Center
6. Compact FAQ
7. Final contact CTA

## Visual direction
- Cleaner white and soft-gray surfaces.
- Fewer borders and shadows.
- More restrained gradients.
- Larger editorial headings.
- Shorter cards and tighter mobile rhythm.
- Interactive AI panel preserved as a core feature.

## Files
- `src/App.jsx`
- `src/styles.css`
