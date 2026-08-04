QUANTIVALUE REFINED — SPRINT 33
UI HOTFIX: PROJECT ATLAS + STICKY TOP BAR + FAVICON

Atualize:
- src/styles.css
- index.html
- todos os arquivos incluídos em public/

Correções:
1. Project Atlas não cobre mais a logo do rodapé.
   Desktop: fica no canto inferior direito, ao lado do botão voltar ao topo.
   Mobile: fica compacto, acima da barra de conversão.

2. Top bar permanece visível durante a rolagem.
   O problema era o overflow:hidden no wrapper, que interferia no sticky header.

3. Favicon redesenhado e padronizado:
   - favicon.ico
   - favicon.svg
   - PNGs 16, 32, 48 e 96
   - Apple Touch Icon
   - ícones 192 e 512
   - manifest atualizado

Commit sugerido:
fix: prevent Atlas overlap and restore sticky header favicon
