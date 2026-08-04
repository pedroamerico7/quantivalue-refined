QUANTIVALUE REFINED — SPRINT 35
SCROLL UI FIX

Atualize:
- src/App.jsx
- src/styles.css

Correções:
1. Project Atlas não cobre mais o e-mail do rodapé.
   Quando o footer entra na tela, o botão sobe automaticamente.

2. A top bar fica mais desvanecida durante a rolagem:
   - mais transparente;
   - menos sombra;
   - elementos com opacidade reduzida;
   - recupera contraste ao passar o mouse ou focar.

3. A barra superior de progresso recebeu uma base própria opaca e estável,
   evitando conflito visual com as cores das seções que passam por trás.

Commit sugerido:
fix: prevent footer overlap and soften sticky scroll UI
