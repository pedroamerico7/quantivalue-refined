QUANTIVALUE REFINED — SPRINT 39
FORM + FAVICON STABILIZATION

Correções:
- Regex da API corrigida: e-mails contendo a letra "s" eram rejeitados por
  causa de barras invertidas duplicadas.
- Gmail, Outlook e e-mails corporativos válidos agora são aceitos.
- Strategic Notes permanece opcional também no backend.
- Validação nativa do navegador substituída por mensagens abaixo dos campos.
- Campo de oferta aceita somente dígitos, sem setas/step conflitantes.
- Novo favicon v6, com arquivos únicos e sem duplicatas antigas.
- index.html usa PNG 32px como favicon principal e ICO como fallback.

Após o deploy:
1. Feche todas as abas antigas do site.
2. Abra uma aba anônima.
3. Teste /favicon-32x32-v6.png diretamente.
4. Abra novamente https://quantivalue.com.

Commit sugerido:
fix: stabilize offer validation and replace cached favicon
