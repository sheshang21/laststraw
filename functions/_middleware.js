export const onRequest = async (context, next) => {
  try {
    // Add a helper for returning JSON consistently
    context.json = (obj, init = {}) =>
      new Response(JSON.stringify(obj), {
        headers: { "content-type": "application/json", ...(init.headers || {}) },
        status: init.status || 200,
      });

    // Proceed to the route file
    const res = await next();

    // If a route forgot content-type on JSON, normalize here
    if (res && res.headers && !res.headers.get("content-type") && res.bodyUsed === false) {
      try {
        // naive: try to parse to see if JSON
        const clone = res.clone();
        const txt = await clone.text();
        JSON.parse(txt);
        const r = new Response(txt, res);
        r.headers.set("content-type", "application/json");
        return r;
      } catch (_) {
        return res;
      }
    }

    return res;
  } catch (err) {
    const message = err?.message || "Internal Server Error";
    return context.json({ error: message }, { status: 500 });
  }
};
