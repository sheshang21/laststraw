export async function onRequestPost({ request, json, env }) {
  // Example secure config: env.MAIL_WEBHOOK or env.SLACK_WEBHOOK set in dashboard
  // (see Section 8 below for env setup)
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ error: "Expected application/json" }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.email || !body.message) {
    return json({ error: "name, email, message are required" }, { status: 400 });
  }

  // Do your processing here (store in KV, call a webhook, send email, etc.)
  // Example: await fetch(env.SLACK_WEBHOOK, { method: "POST", body: JSON.stringify({ text: ... }) });

  return json({ received: true });
}
