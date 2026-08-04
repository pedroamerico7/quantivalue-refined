QUANTIVALUE REFINED — SPRINT 42
FINAL RESEND PATCH

Atualize:
- functions/api/offer.js

Este patch:
- exige RESEND_API_KEY, OFFER_FROM_EMAIL e OFFER_NOTIFICATION_TO;
- aceita mais de um destinatário separado por vírgula;
- usa Reply-To com o e-mail do comprador;
- tenta novamente uma vez em erros temporários 429/5xx;
- registra no Cloudflare Logs o ID da mensagem enviada pela Resend;
- retorna notificationSent, notificationId e notificationError na resposta da API;
- mantém a oferta salva no D1 mesmo se a notificação falhar.

Variáveis esperadas no Cloudflare Pages — Production:
RESEND_API_KEY = re_...
OFFER_NOTIFICATION_TO = seuemail@gmail.com
OFFER_FROM_EMAIL = QuantiValue Offers <offers@send.quantivalue.com>

Depois de subir:
1. Faça novo deploy.
2. Envie uma oferta de teste.
3. Abra Resend > Emails.
4. Abra Cloudflare > Deployments > Functions > Logs.
5. Procure por "Offer notification sent".

Commit sugerido:
fix: finalize reliable Resend offer notifications





