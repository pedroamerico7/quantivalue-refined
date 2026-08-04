# Sprint 63 — Mobile Menu Viewport Fix

Only the opened top-bar mobile menu was adjusted.

## Fixed
- Menu is anchored directly to the viewport.
- Width is exactly the mobile viewport width.
- Removed transforms and offsets that could push part of the panel off-screen.
- Added safe-area support for Android/iOS browser insets.
- Added internal vertical scrolling for short screens.
- Menu links and the final discussion button always fit within the panel.
- Preserved the current top bar, original splash screen and all page functionality.

## Files
- `src/styles.css`
