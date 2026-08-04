# Sprint 49 — Mobile Restore + No Project Atlas

## Removed
- Project Atlas floating button.
- Project Atlas progress modal.
- Atlas footer collision observer and related React state.

## Mobile fixed header
- Restored a fixed top bar during scrolling.
- Header becomes smaller and more translucent after scroll.
- Reading-progress bar remains above the header.
- Root page containers remain normally scrollable to avoid the blank-page bug.

## Mobile rendering
- Disabled content-visibility and containment optimizations on important mobile sections.
- Forced reveal content to remain visible on mobile.
- Restored dashboard, interactive AI panel, cards and acquisition surfaces.
- Added safer responsive dashboard grid behavior.

## Balanced content restoration
- Reintroduced the Buyer Confidence section in a compact format.
- Kept trust pillars, acquisition timeline, secure transaction block and enterprise CTA.
- Kept the duplicate Buyer FAQ hidden because the main Transaction FAQ already exists.

## Files
- `src/App.jsx`
- `src/styles.css`
