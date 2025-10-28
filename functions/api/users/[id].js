const store = []; // separate module scope per file — illustrative only

function findIndex(id) {
  return store.findIndex(u => u.id === id);
}

export async function onRequestGet({ params, json }) {
  const i = findIndex(params.id);
  if (i === -1) return json({ error: "Not found" }, { status: 404 });
  return json(store[i]);
}

export async function onRequestPut({ params, request, json }) {
  const i = findIndex(params.id);
  if (i === -1) return json({ error: "Not found" }, { status: 404 });
  const patch = await request.json().catch(() => ({}));
  store[i] = { ...store[i], ...patch, id: params.id };
  return json(store[i]);
}

export async function onRequestDelete({ params, json }) {
  const i = findIndex(params.id);
  if (i === -1) return json({ error: "Not found" }, { status: 404 });
  const [deleted] = store.splice(i, 1);
  return json(deleted);
}
