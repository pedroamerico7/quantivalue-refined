function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

function clean(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function validEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function referenceFromId(id) {
  return `QV-${String(id).padStart(6, "0")}`;
}

export async function onRequestPost({ request, env }) {
  if (!env.OFFERS_DB) {
    return json({ error: "D1 binding OFFERS_DB is not configured." }, 500);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  if (clean(input.website, 200)) {
    return json({ ok: true, reference: "QV-RECEIVED" }, 200);
  }

  const name = clean(input.name, 100);
  const company = clean(input.company, 120);
  const email = clean(input.email, 160).toLowerCase();
  const message = clean(input.message, 2000);
  const amount = Number.parseInt(String(input.amount ?? ""), 10);

  if (name.length < 2) return json({ error: "Please enter your name." }, 400);
  if (company.length < 2) return json({ error: "Please enter your company." }, 400);
  if (!validEmail(email)) return json({ error: "Please enter a valid business email." }, 400);
  if (!Number.isFinite(amount) || amount < 1 || amount > 1000000000) {
    return json({ error: "Please enter a valid offer amount in USD." }, 400);
  }
  if (message.length < 10) return json({ error: "Please include a brief message." }, 400);

  const ip = request.headers.get("cf-connecting-ip") || "";
  const country = request.headers.get("cf-ipcountry") || "";
  const userAgent = clean(request.headers.get("user-agent"), 500);

  try {
    const result = await env.OFFERS_DB.prepare(
      `INSERT INTO offers
        (name, company, email, amount_usd, message, ip_address, country, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(name, company, email, amount, message, ip, country, userAgent)
      .run();

    const id = result.meta?.last_row_id;
    return json({
      ok: true,
      reference: id ? referenceFromId(id) : "QV-RECEIVED",
    });
  } catch (error) {
    console.error("Offer insert failed", error);
    return json({ error: "Your offer could not be saved. Please try again." }, 500);
  }
}

export async function onRequestGet() {
  return json({ error: "Method not allowed." }, 405);
}
