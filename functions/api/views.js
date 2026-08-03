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
  const stored = await env.VISITS.get(COUNTER_KEY);
  if (stored === null) {
    await env.VISITS.put(COUNTER_KEY, String(INITIAL_VIEWS));
    return INITIAL_VIEWS;
  }

  const parsed = Number.parseInt(stored, 10);
  return Number.isFinite(parsed) ? parsed : INITIAL_VIEWS;
}

export async function onRequestGet({ env }) {
  if (!env.VISITS) {
    return response({ error: "KV binding VISITS is not configured." }, 500);
  }

  const views = await readCount(env);
  return response({ views });
}

export async function onRequestPost({ env }) {
  if (!env.VISITS) {
    return response({ error: "KV binding VISITS is not configured." }, 500);
  }

  const current = await readCount(env);
  const views = current + 1;
  await env.VISITS.put(COUNTER_KEY, String(views));
  return response({ views });
}
