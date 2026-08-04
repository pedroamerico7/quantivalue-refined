QUANTIVALUE REFINED — SPRINT 34
STYLE RESTORE + COMPACT STICKY HEADER

Atualize todos estes arquivos:
- src/App.jsx
- src/styles.css
- src/components/AcquisitionCenter.jsx
- src/components/ReadinessScore.jsx
- src/components/MetricsPanel.jsx
- src/components/DownloadCard.jsx
- src/components/TransactionTimeline.jsx

Correções:
1. O Acquisition Command Center volta a receber todos os estilos.
   A tela sem formatação ocorreu porque um styles.css antigo substituiu o CSS
   completo da Sprint 32.

2. A top bar continua fixa, porém fica mais compacta e transparente depois
   de 56 px de rolagem:
   - altura reduzida;
   - logo menor;
   - menu menor;
   - botão Private Discussion mais baixo;
   - sombra e fundo mais sutis.

3. O Project Atlas permanece afastado da logo do rodapé.

Importante:
Substitua App.jsx, styles.css e a pasta components juntos. Não envie somente
o styles.css de uma sprint antiga, pois isso remove os estilos dos componentes.

Commit sugerido:
fix: restore command center styles and compact sticky header
