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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createPublicReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  return `QV-${token.slice(0, 5)}-${token.slice(5)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

async function sendOfferNotification(env, offer) {
  if (!env.RESEND_API_KEY) {
    console.warn("Offer saved, but RESEND_API_KEY is not configured.");
    return { sent: false, reason: "missing_api_key" };
  }

  const to = env.OFFER_NOTIFICATION_TO || "acquisition@quantivalue.com";
  const from =
    env.OFFER_FROM_EMAIL ||
    "QuantiValue Offers <offers@quantivalue.com>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `quantivalue-offer-${offer.reference}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: offer.email,
      subject: `New QuantiValue offer — ${formatUsd(offer.amount)}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#07101f">
          <h1 style="font-size:28px;margin-bottom:8px">New confidential offer</h1>
          <p style="color:#697386;margin-top:0">
            A new acquisition proposal was submitted through QuantiValue.com.
          </p>

          <table style="width:100%;border-collapse:collapse;margin:24px 0">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2"><strong>Reference</strong></td>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2">${escapeHtml(offer.reference)}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2"><strong>Name</strong></td>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2">${escapeHtml(offer.name)}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2"><strong>Company</strong></td>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2">${escapeHtml(offer.company)}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2"><strong>Email</strong></td>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2">${escapeHtml(offer.email)}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2"><strong>Offer</strong></td>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2">${escapeHtml(formatUsd(offer.amount))}</td>
            </tr>
            <tr>
              <td style="padding:12px;vertical-align:top"><strong>Strategic notes</strong></td>
              <td style="padding:12px;white-space:pre-wrap">${escapeHtml(offer.message || "No notes provided.")}</td>
            </tr>
          </table>

          <p style="font-size:12px;color:#8a95a8">
            Country: ${escapeHtml(offer.country || "Unknown")} ·
            Received: ${escapeHtml(offer.receivedAt)}
          </p>
        </div>
      `,
      text: [
        "New confidential QuantiValue offer",
        `Reference: ${offer.reference}`,
        `Name: ${offer.name}`,
        `Company: ${offer.company}`,
        `Email: ${offer.email}`,
        `Offer: ${formatUsd(offer.amount)}`,
        `Strategic notes: ${offer.message || "No notes provided."}`,
        `Country: ${offer.country || "Unknown"}`,
        `Received: ${offer.receivedAt}`,
      ].join("\n"),
      tags: [
        { name: "source", value: "quantivalue_offer" },
        { name: "reference", value: offer.reference.replaceAll("-", "_") },
      ],
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Offer email notification failed", response.status, result);
    return {
      sent: false,
      reason: result.message || result.name || `http_${response.status}`,
    };
  }

  return { sent: true, id: result.id };
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
    const reference = id ? createPublicReference() : "QV-RECEIVED";
    const receivedAt = new Date().toISOString();

    let notification = { sent: false, reason: "not_attempted" };
    try {
      notification = await sendOfferNotification(env, {
        reference,
        receivedAt,
        name,
        company,
        email,
        amount,
        message,
        country,
      });
    } catch (error) {
      console.error("Unexpected offer notification error", error);
      notification = { sent: false, reason: "unexpected_error" };
    }

    return json({
      ok: true,
      reference,
      receivedAt,
      notificationSent: notification.sent,
    });
  } catch (error) {
    console.error("Offer insert failed", error);
    return json({ error: "Your offer could not be saved. Please try again." }, 500);
  }
}

export async function onRequestGet() {
  return json({ error: "Method not allowed." }, 405);
}
