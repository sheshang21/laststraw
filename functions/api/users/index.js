// naive in-memory store during a single instance lifetime
// (stateless edge: do not rely on persistence — use KV/D1 for real data)
const store = [];

export async function onRequestGet({ json }) {
  return json({ users: store });
}

export async function onRequestPost({ request, json }) {
  const data = await request.json().catch(() => null);
  if (!data || !data.name) {
    return json({ error: "name is required" }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const user = { id, name: data.name, email: data.email || null };
  store.push(user);
  return json(user, { status: 201 });
}
