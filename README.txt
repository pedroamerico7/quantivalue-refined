QUANTIVALUE — SPRINT 51
HARD FIX PARA MOBILE EM BRANCO

Substitua juntos:
- src/App.jsx
- src/styles.css

Correções:
1. Loader removido completamente.
2. localStorage protegido contra falhas no Safari e navegação privada.
3. IntersectionObserver possui fallback e não pode ocultar o conteúdo.
4. Todas as seções principais são forçadas a ficar visíveis no mobile.
5. Regras de contain/content-visibility desativadas.
6. Top bar fixa com z-index alto e independente dos containers.
7. Project Atlas removido do React e do CSS.

Commit:
fix: eliminate blank mobile rendering and harden fixed header

