export async function onRequestGet({ json }) {
  return json({ ok: true, ts: Date.now() });
}
