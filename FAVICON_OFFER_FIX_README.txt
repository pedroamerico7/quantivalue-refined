QUANTIVALUE REFINED — FAVICON + OFFER FIELD HOTFIX

Correções:
1. Favicon recriado para corresponder exatamente ao ícone quadrado escuro com anel cinza e ponto azul.
2. Todos os formatos foram gerados a partir do mesmo arquivo mestre.
3. Referências receberam ?v=5 para forçar o Chrome a abandonar o favicon antigo em cache.
4. Link do webmanifest removido para não oferecer instalação como aplicativo.
5. Campo de oferta corrigido: step passou de 1000 para 1.
   Antes, min=1 + step=1000 tornava 1.000.000 inválido.

Arquivos alterados:
- index.html
- src/App.jsx
- public/favicon.ico
- public/favicon.svg
- public/favicon-16x16.png
- public/favicon-32x32.png
- public/favicon-48x48.png
- public/favicon-96x96.png
- public/apple-touch-icon.png
- public/icon-192.png
- public/icon-512.png

Depois do deploy, abra uma aba anônima ou feche e reabra o Chrome.
Commit sugerido:
fix: standardize favicon and correct offer amount validation
