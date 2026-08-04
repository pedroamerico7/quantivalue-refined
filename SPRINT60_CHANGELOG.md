# Sprint 60 — Premium Splash Screen

## Added
- Institutional blue loading screen before the React page becomes visible.
- White QuantiValue mark and wordmark.
- “Institutional Intelligence” supporting line.
- Discreet animated progress line.
- Smooth 420 ms fade transition into the page.

## Safety
- The splash does not depend on React.
- It closes after the page load event with a short minimum display time.
- A 1.6-second absolute timeout guarantees it can never block the website.
- Reduced-motion users receive a static version.
- No application components, API integrations, mobile layout or offer flow were changed.
