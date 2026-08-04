QUANTIVALUE REFINED — SPRINT 41
URGENT OFFER EMAIL NOTIFICATIONS

PROBLEMA ENCONTRADO
O formulário salvava as propostas no banco D1, mas não existia nenhum código
para enviar e-mail. Por isso a tela mostrava sucesso, porém nenhuma notificação
chegava à caixa de entrada.

ATUALIZE
- functions/api/offer.js

CONFIGURAÇÃO OBRIGATÓRIA NO CLOUDFLARE PAGES
Adicione estas variáveis em Production:

1. RESEND_API_KEY
   Tipo: Secret
   Valor: sua chave da Resend, começando com re_

2. OFFER_NOTIFICATION_TO
   Tipo: Variable
   Exemplo: seuemail@gmail.com
   Use um endereço que você realmente acompanha.

3. OFFER_FROM_EMAIL
   Tipo: Variable
   Recomendado depois de verificar quantivalue.com na Resend:
   QuantiValue Offers <offers@quantivalue.com>

IMPORTANTE
- acquisition@quantivalue.com pode continuar sendo o endereço público.
- Para garantir o recebimento imediato, OFFER_NOTIFICATION_TO pode ser seu Gmail.
- O campo Reply-To usa o e-mail informado pelo comprador, então basta clicar em
  responder para responder diretamente a ele.
- A oferta continua salva no D1 mesmo se o serviço de e-mail falhar.

COMO VER OFERTAS JÁ RECEBIDAS
No Cloudflare:
Workers & Pages > D1 > seu banco OFFERS_DB > Console

Execute:
SELECT id, name, company, email, amount_usd, message, created_at
FROM offers
ORDER BY id DESC;

COMMIT
fix: send email notifications for confidential offers
