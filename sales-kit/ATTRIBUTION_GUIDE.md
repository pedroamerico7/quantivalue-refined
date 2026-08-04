# Campaign Attribution Guide

## Purpose
Know which outbound message, prospect and company generated an acquisition inquiry.

## How to create a link
Open `CAMPAIGN_LINK_BUILDER.html` locally and complete:
- source: outbound
- medium: email or linkedin
- campaign: campaign name
- prospect
- company
- content: message variant

Example:
`https://quantivalue.com/enterprise.html?utm_source=outbound&utm_medium=email&utm_campaign=strategic-buyers-2026&utm_content=ceo-v1&prospect=Jane&company=Example`

## What happens
1. The visitor opens the personalized link.
2. Attribution is stored in the browser.
3. If an offer is submitted later, the campaign information is sent with it.
4. The data is saved in the D1 table `offer_attribution`.
5. The notification email includes the attribution details.

## D1 query
```sql
SELECT
  o.id,
  o.name,
  o.company,
  o.email,
  o.amount_usd,
  o.created_at,
  a.source,
  a.medium,
  a.campaign,
  a.content,
  a.prospect,
  a.target_company,
  a.landing_page,
  a.referrer
FROM offers o
LEFT JOIN offer_attribution a ON a.offer_id = o.id
ORDER BY o.id DESC;
```

## Privacy
Do not place confidential information in campaign URLs. Use only public business names and internal campaign labels.
