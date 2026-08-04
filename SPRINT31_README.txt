QUANTIVALUE REFINED — SPRINT 31
PERFORMANCE & RENDERING HARDENING

Atualize:
- src/App.jsx
- src/styles.css
- index.html
- public/_headers

Mudanças visíveis:
- nenhuma alteração estrutural importante;
- carregamento mais estável;
- menos trabalho de renderização nas seções fora da tela;
- animações e efeitos mais leves em celulares;
- logo com dimensões reservadas, reduzindo layout shift.

Mudanças técnicas:
- content-visibility nas seções abaixo da primeira dobra;
- containment em cards e painéis;
- preload do símbolo principal;
- dimensões explícitas nas imagens da marca;
- cache longo para assets versionados;
- cache controlado para SVG, PNG, ICO e PDF;
- headers básicos de segurança;
- APIs continuam sem cache.

Commit sugerido:
perf: harden rendering, caching and mobile motion
