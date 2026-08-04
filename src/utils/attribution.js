const STORAGE_KEY = "qv_attribution_v1";

const allowedKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "prospect",
  "company",
];

function clean(value, max = 160) {
  return String(value || "").trim().slice(0, max);
}

export function captureAttribution() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const current = {};

  for (const key of allowedKeys) {
    const value = clean(params.get(key));
    if (value) current[key] = value;
  }

  const stored = readAttribution();
  const merged = {
    ...stored,
    ...current,
    landing_page: clean(window.location.pathname, 240),
    referrer: clean(document.referrer, 500),
    first_seen_at: stored.first_seen_at || new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Attribution must never block the acquisition experience.
  }

  return merged;
}

export function readAttribution() {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function attributionPayload() {
  const data = readAttribution();

  return {
    source: clean(data.utm_source || data.source),
    medium: clean(data.utm_medium || data.medium),
    campaign: clean(data.utm_campaign || data.campaign),
    content: clean(data.utm_content || data.content),
    term: clean(data.utm_term || data.term),
    prospect: clean(data.prospect),
    targetCompany: clean(data.company),
    landingPage: clean(data.landing_page, 240),
    referrer: clean(data.referrer, 500),
    firstSeenAt: clean(data.first_seen_at, 40),
    lastSeenAt: clean(data.last_seen_at, 40),
  };
}
