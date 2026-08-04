QUANTIVALUE REFINED — SPRINT 16
Product Demo Recovery & Stabilization

Replace these files in the quantivalue-refined repository:
- src/App.jsx
- src/styles.css
- functions/api/views.js (same verified counter implementation; replace to keep environments synchronized)

What changed:
- Added a functional Interactive Product Demo section.
- Revenue, EBITDA margin, growth and industry controls update the valuation in real time.
- Added enterprise value, comparable range, AI confidence and explainability trace.
- Added Input → Normalize → Model → Explain → Decide workflow.
- Platform navigation now links directly to the demo.
- Offer field now opens prefilled with USD 75,000.
- Minimum accepted input remains USD 50,000.
- Removed duplicated message field attribute.
- Preserved Hero, orbital, dashboard, Technology, Brand Thesis, Market Opportunity,
  Asset Package, acquisition flow and visitor counter.

Suggested commit:
feat: restore interactive valuation demo and stabilize offer flow

Cloudflare Pages settings:
Build command: npm run build
Build output directory: dist
Root directory: leave blank
