QUANTIVALUE REFINED — HOTFIX BUILD

Problema corrigido:
O styles.css continha caracteres literais "\n" no início do bloco da Sprint 23.
O PostCSS interpretava isso como CSS inválido e falhava na linha 1975 com:
Unknown word position

Atualize somente:
- src/styles.css

Commit sugerido:
fix: remove escaped line breaks from motion css
