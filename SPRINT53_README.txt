QUANTIVALUE — SPRINT 53
CORREÇÃO DEFINITIVA DO MOBILE SEM CSS

PROBLEMA IDENTIFICADO
A captura mostra que o React e o HTML carregaram, mas a folha de estilos não.
Isso costuma acontecer quando o navegador móvel mantém em cache um index.html
antigo apontando para um arquivo CSS com hash que já não existe após novo deploy.

CORREÇÕES
1. CSS crítico foi incluído diretamente no index.html.
   Assim, o site mantém layout, cores, cards, header e mobile mesmo se o bundle
   CSS externo estiver temporariamente indisponível.

2. index.html e arquivos HTML agora usam Cache-Control no-store.
   Isso impede que o celular reutilize HTML antigo com links de assets vencidos.

3. Top bar restaurada no estilo anterior:
   - quadrada;
   - ponta a ponta;
   - glass escuro;
   - fixa durante a rolagem;
   - logo branco, sólido e sempre legível.

4. Removidas dependências visuais do estilo Apple.

ATUALIZE JUNTOS
- index.html
- src/styles.css
- public/_headers

Depois do deploy:
- feche a aba antiga no celular;
- limpe os dados do site ou abra em aba anônima;
- carregue https://quantivalue.com/?v=53

Commit:
fix: add critical mobile css and prevent stale html asset cache
