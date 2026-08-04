QUANTIVALUE REFINED — SPRINT 24
MOBILE NAVIGATION & CONVERSION POLISH

Atualize somente:
- src/App.jsx
- src/styles.css

Alterações:
- menu hamburger para tablet e celular;
- menu móvel com todos os links da página;
- fechamento por Escape e ao clicar em qualquer link;
- bloqueio do scroll enquanto o menu estiver aberto;
- CTA de discussão privada dentro do menu;
- barra fixa de conversão no rodapé do celular;
- botão voltar ao topo reposicionado acima da barra;
- correção dos caracteres literais \\n que quebraram o CSS da Sprint 23.

Commit sugerido:
feat: add mobile navigation and conversion bar

Validação:
O CSS foi saneado e não contém mais os caracteres literais \\n.
Não foi possível executar npm install neste ambiente porque o registry interno
não possui @vitejs/plugin-react. O projeto deve usar o build do Cloudflare,
que já instalou essa dependência corretamente nas publicações anteriores.
