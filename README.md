# QuantiValue — Cloudflare Pages + Public Counter

## Build settings

- Framework preset: None or Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank

## Public counter

The site contains a Cloudflare Pages Function at:

`functions/api/views.js`

It uses a Workers KV binding named:

`VISITS`

The counter is initialized at **1,070 visits** if the KV key does not exist yet.

To reduce repeated counting, the browser increments the public number at most once every 24 hours using `localStorage`. The public label says **visits**, not unique visitors.

## Create and connect the KV namespace

1. In Cloudflare, open **Storage & Databases → KV**.
2. Create a namespace named `quantivalue-visits`.
3. Open **Workers & Pages → quantivalue-refined → Settings → Functions**.
4. Find **KV namespace bindings**.
5. Add a binding:
   - Variable name: `VISITS`
   - KV namespace: `quantivalue-visits`
6. Add the same binding to both **Production** and **Preview**, if Cloudflare shows separate environments.
7. Save.
8. Go to **Deployments** and retry the latest deployment, or make a new GitHub commit.

## Test

Open:

`https://YOUR-PROJECT.pages.dev/api/views`

Expected response:

`{"views":1070}`

After loading the homepage from a browser that has not been counted in the last 24 hours, the number should increase.
