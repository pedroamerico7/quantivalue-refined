const INITIAL_VIEWS = 1070;
const COUNTER_KEY = "quantivalue:public-visits";
const D1_KEY = "public-visits";

function response(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

async function readFromKv(env) {
  if (!env?.VISITS) return null;
  const stored = await env.VISITS.get(COUNTER_KEY);
  if (stored === null) {
    await env.VISITS.put(COUNTER_KEY, String(INITIAL_VIEWS));
    return INITIAL_VIEWS;
  }
  const parsed = Number.parseInt(stored, 10);
  return Number.isFinite(parsed) ? Math.max(INITIAL_VIEWS, parsed) : INITIAL_VIEWS;
}

async function readFromD1(env) {
  if (!env?.OFFERS_DB) return null;
  await env.OFFERS_DB.prepare(
    `CREATE TABLE IF NOT EXISTS site_metrics (
      metric_key TEXT PRIMARY KEY,
      metric_value INTEGER NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`
  ).run();
  await env.OFFERS_DB.prepare(
    `INSERT OR IGNORE INTO site_metrics (metric_key, metric_value) VALUES (?, ?)`
  ).bind(D1_KEY, INITIAL_VIEWS).run();
  const row = await env.OFFERS_DB.prepare(
    `SELECT metric_value FROM site_metrics WHERE metric_key = ?`
  ).bind(D1_KEY).first();
  const parsed = Number.parseInt(String(row?.metric_value ?? INITIAL_VIEWS), 10);
  return Number.isFinite(parsed) ? Math.max(INITIAL_VIEWS, parsed) : INITIAL_VIEWS;
}

async function readCount(env) {
  try {
    const kvCount = await readFromKv(env);
    if (kvCount !== null) return { views: kvCount, store: "kv" };
  } catch (error) {
    console.error("Visit KV read failed", error);
  }

  try {
    const d1Count = await readFromD1(env);
    if (d1Count !== null) return { views: d1Count, store: "d1" };
  } catch (error) {
    console.error("Visit D1 read failed", error);
  }

  return { views: INITIAL_VIEWS, store: "fallback" };
}

async function incrementCount(env, state) {
  if (state.store === "kv" && env?.VISITS) {
    const views = state.views + 1;
    await env.VISITS.put(COUNTER_KEY, String(views));
    return views;
  }

  if (state.store === "d1" && env?.OFFERS_DB) {
    await env.OFFERS_DB.prepare(
      `UPDATE site_metrics
       SET metric_value = metric_value + 1, updated_at = datetime('now')
       WHERE metric_key = ?`
    ).bind(D1_KEY).run();
    const updated = await readFromD1(env);
    return updated ?? state.views;
  }

  return state.views;
}

export async function onRequestGet({ env }) {
  const state = await readCount(env);
  return response({
    views: state.views,
    persistent: state.store !== "fallback",
    store: state.store,
  });
}

export async function onRequestPost({ env }) {
  const state = await readCount(env);
  try {
    const views = await incrementCount(env, state);
    return response({
      views,
      persistent: state.store !== "fallback",
      store: state.store,
    });
  } catch (error) {
    console.error("Visit increment failed", error);
    return response({
      views: state.views,
      persistent: state.store !== "fallback",
      store: state.store,
    });
  }
}
