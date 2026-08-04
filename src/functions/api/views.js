const INITIAL_VIEWS = 1070;
const COUNTER_KEY = "quantivalue:public-visits";

function response(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

async function readCount(env) {
  if (!env?.VISITS) return INITIAL_VIEWS;

  try {
    const stored = await env.VISITS.get(COUNTER_KEY);
    if (stored === null) {
      await env.VISITS.put(COUNTER_KEY, String(INITIAL_VIEWS));
      return INITIAL_VIEWS;
    }

    const parsed = Number.parseInt(stored, 10);
    return Number.isFinite(parsed) ? Math.max(INITIAL_VIEWS, parsed) : INITIAL_VIEWS;
  } catch {
    return INITIAL_VIEWS;
  }
}

export async function onRequestGet({ env }) {
  const views = await readCount(env);
  return response({ views, configured: Boolean(env?.VISITS) });
}

export async function onRequestPost({ env }) {
  const current = await readCount(env);

  if (!env?.VISITS) {
    return response({ views: current, configured: false });
  }

  try {
    const views = current + 1;
    await env.VISITS.put(COUNTER_KEY, String(views));
    return response({ views, configured: true });
  } catch {
    return response({ views: current, configured: false });
  }
}
