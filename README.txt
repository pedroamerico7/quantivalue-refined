QUANTIVALUE REFINED — SPRINT 50
STABLE MOBILE RECOVERY

Atualize juntos:
- src/App.jsx
- src/styles.css

Esta correção volta para a última estrutura estável da Sprint 46 e aplica
somente mudanças seguras:

1. Project Atlas removido visualmente.
2. Top bar realmente fixa em desktop e mobile.
3. Barra de progresso fixa acima da top bar.
4. Removidas regras de overflow/containment que podiam deixar a página branca.
5. Painel de IA, dashboard, cards e formulários forçados a renderizar normalmente.
6. Página moderadamente encurtada por espaçamento, sem apagar seções inteiras.

Importante:
Substitua App.jsx e styles.css juntos. Não aplique somente o CSS sobre a Sprint 49,
porque o App.jsx da Sprint 49 já havia removido blocos estruturais.

Commit:
fix: restore stable mobile rendering and persistent header
