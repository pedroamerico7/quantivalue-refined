QUANTIVALUE REFINED — SPRINT 27
GOOGLE SEARCH FAVICON FIX

Replace/add:
- index.html
- public/favicon.ico
- public/favicon.svg
- public/favicon-16x16.png
- public/favicon-32x32.png
- public/favicon-48x48.png
- public/favicon-96x96.png
- public/apple-touch-icon.png
- public/icon-192.png
- public/icon-512.png
- public/site.webmanifest

What changed:
- Replaced the unrelated blue-square favicon with the QuantiValue orbital mark.
- Added a stable /favicon.ico URL.
- Added a 48x48 PNG specifically suitable for Google Search.
- Increased contrast and stroke thickness so the mark remains recognizable at tiny sizes.
- Added Organization structured data pointing to a 512x512 logo.

After deployment, confirm these URLs return HTTP 200:
https://quantivalue.com/favicon.ico
https://quantivalue.com/favicon.svg
https://quantivalue.com/favicon-48x48.png
https://quantivalue.com/icon-512.png

Then use Google Search Console:
URL Inspection → https://quantivalue.com/ → Request indexing.

Google controls when the favicon is refreshed. It may take several days or longer.
Commit:
fix: publish search-compatible QuantiValue favicon
