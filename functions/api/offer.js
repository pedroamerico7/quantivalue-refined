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

async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function parseRecipients(value) {
  return String(value || "")
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

function cleanAttribution(input) {
  const data = input && typeof input === "object" ? input : {};

  return {
    source: clean(data.source, 120),
    medium: clean(data.medium, 120),
    campaign: clean(data.campaign, 160),
    content: clean(data.content, 160),
    term: clean(data.term, 160),
    prospect: clean(data.prospect, 160),
    targetCompany: clean(data.targetCompany, 160),
    landingPage: clean(data.landingPage, 240),
    referrer: clean(data.referrer, 500),
    firstSeenAt: clean(data.firstSeenAt, 40),
    lastSeenAt: clean(data.lastSeenAt, 40),
  };
}

function attributionSummary(attribution) {
  const rows = [
    ["Source", attribution.source],
    ["Medium", attribution.medium],
    ["Campaign", attribution.campaign],
    ["Content", attribution.content],
    ["Prospect", attribution.prospect],
    ["Target company", attribution.targetCompany],
    ["Landing page", attribution.landingPage],
    ["Referrer", attribution.referrer],
  ].filter(([, value]) => value);

  return rows;
}

async function sendOfferNotification(env, offer) {
  const apiKey = String(env.RESEND_API_KEY || "").trim();
  const from = String(env.OFFER_FROM_EMAIL || "").trim();
  const recipients = parseRecipients(env.OFFER_NOTIFICATION_TO);

  if (!apiKey) {
    console.error("Offer saved but notification was not sent: RESEND_API_KEY missing.");
    return { sent: false, reason: "missing_resend_api_key" };
  }

  if (!from) {
    console.error("Offer saved but notification was not sent: OFFER_FROM_EMAIL missing.");
    return { sent: false, reason: "missing_offer_from_email" };
  }

  if (recipients.length === 0) {
    console.error("Offer saved but notification was not sent: OFFER_NOTIFICATION_TO missing.");
    return { sent: false, reason: "missing_notification_recipient" };
  }

  const payload = {
    from,
    to: recipients,
    reply_to: offer.email,
    subject: `New QuantiValue offer — ${formatUsd(offer.amount)}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#07101f">
        <div style="padding:26px 28px;background:#07101f;border-radius:18px 18px 0 0;color:#fff">
          <div style="font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:#7f98ff">
            Private acquisition
          </div>
          <h1 style="font-size:28px;margin:10px 0 0">New confidential offer</h1>
        </div>

        <div style="padding:28px;border:1px solid #e4e9f2;border-top:0;border-radius:0 0 18px 18px">
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
              <td style="padding:12px;border-bottom:1px solid #e5e9f2">
                <a href="mailto:${escapeHtml(offer.email)}">${escapeHtml(offer.email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2"><strong>Offer</strong></td>
              <td style="padding:12px;border-bottom:1px solid #e5e9f2;font-size:20px">
                <strong>${escapeHtml(formatUsd(offer.amount))}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding:12px;vertical-align:top"><strong>Strategic notes</strong></td>
              <td style="padding:12px;white-space:pre-wrap">${escapeHtml(offer.message || "No notes provided.")}</td>
            </tr>
          </table>

          ${
            attributionSummary(offer.attribution).length
              ? `
                <h2 style="font-size:16px;margin:28px 0 10px">Campaign attribution</h2>
                <table style="width:100%;border-collapse:collapse">
                  ${attributionSummary(offer.attribution)
                    .map(
                      ([label, value]) => `
                        <tr>
                          <td style="padding:8px 12px;border-bottom:1px solid #edf0f6"><strong>${escapeHtml(label)}</strong></td>
                          <td style="padding:8px 12px;border-bottom:1px solid #edf0f6">${escapeHtml(value)}</td>
                        </tr>
                      `
                    )
                    .join("")}
                </table>
              `
              : ""
          }

          <p style="font-size:12px;color:#8a95a8;margin:24px 0 0">
            Country: ${escapeHtml(offer.country || "Unknown")} ·
            Received: ${escapeHtml(offer.receivedAt)}
          </p>
        </div>
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
      ...attributionSummary(offer.attribution).map(([label, value]) => `${label}: ${value}`),
      `Received: ${offer.receivedAt}`,
    ].join("\n"),
    tags: [
      { name: "source", value: "quantivalue_offer" },
      { name: "reference", value: offer.reference.replaceAll("-", "_") },
    ],
  };

  let lastFailure = null;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `quantivalue-offer-${offer.reference}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log("Offer notification sent", {
          reference: offer.reference,
          resendId: result.id,
          recipients,
        });
        return { sent: true, id: result.id };
      }

      lastFailure = {
        status: response.status,
        reason: result.message || result.name || `http_${response.status}`,
      };

      console.error("Offer notification attempt failed", {
        attempt,
        reference: offer.reference,
        ...lastFailure,
      });

      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === 2) break;
      await wait(250);
    } catch (error) {
      lastFailure = {
        status: 0,
        reason: error instanceof Error ? error.message : "network_error",
      };

      console.error("Offer notification request failed", {
        attempt,
        reference: offer.reference,
        ...lastFailure,
      });

      if (attempt === 2) break;
      await wait(250);
    }
  }

  return {
    sent: false,
    reason: lastFailure?.reason || "notification_failed",
    status: lastFailure?.status || 0,
  };
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
  const attribution = cleanAttribution(input.attribution);

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

    if (id) {
      await env.OFFERS_DB.prepare(
        `CREATE TABLE IF NOT EXISTS offer_attribution (
          offer_id INTEGER PRIMARY KEY,
          source TEXT,
          medium TEXT,
          campaign TEXT,
          content TEXT,
          term TEXT,
          prospect TEXT,
          target_company TEXT,
          landing_page TEXT,
          referrer TEXT,
          first_seen_at TEXT,
          last_seen_at TEXT,
          FOREIGN KEY (offer_id) REFERENCES offers(id)
        )`
      ).run();

      await env.OFFERS_DB.prepare(
        `INSERT OR REPLACE INTO offer_attribution
          (offer_id, source, medium, campaign, content, term, prospect, target_company,
           landing_page, referrer, first_seen_at, last_seen_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          id,
          attribution.source,
          attribution.medium,
          attribution.campaign,
          attribution.content,
          attribution.term,
          attribution.prospect,
          attribution.targetCompany,
          attribution.landingPage,
          attribution.referrer,
          attribution.firstSeenAt,
          attribution.lastSeenAt
        )
        .run();
    }

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
        attribution,
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
      notificationId: notification.sent ? notification.id : null,
      notificationError: notification.sent ? null : notification.reason,
    });
  } catch (error) {
    console.error("Offer insert failed", error);
    return json({ error: "Your offer could not be saved. Please try again." }, 500);
  }
}

export async function onRequestGet() {
  return json({ error: "Method not allowed." }, 405);
}
