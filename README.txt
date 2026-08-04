QUANTIVALUE REFINED - SPRINT 20.1

CORRECTION: investor brief visibility + real PDF download.

Place files exactly as follows:
- src/App.jsx
- src/styles.css
- index.html
- public/investor-brief.html
- public/QuantiValue-Investor-Brief.pdf
- all favicon/manifest files inside public/

WHERE THE CHANGES APPEAR:
1. Top navigation: item "Brief".
2. Near the bottom of the homepage, before the acquisition section:
   section title "A concise acquisition case, ready for review."
3. That section contains:
   - Open investor brief
   - Download PDF
   - Request private discussion
4. Direct URLs:
   /investor-brief.html
   /QuantiValue-Investor-Brief.pdf

Important:
The previous ZIP had flat file paths. If those files were uploaded to the repository root,
Vite ignored App.jsx/styles.css and the brief HTML was not published from public/.
This package now preserves the correct folder structure.
