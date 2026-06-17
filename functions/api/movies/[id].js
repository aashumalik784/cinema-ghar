// Pages Function: GET/DELETE /api/movies/:id

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestGet(context) {
  const { params, env } = context;
  const movies = JSON.parse((await env.MOVIES_KV.get("movies")) || "[]");
  const movie = movies.find((m) => m.id === params.id);
  if (!movie) return jsonResponse({ error: "Movie not found" }, 404);
  return jsonResponse(movie);
}

export async function onRequestDelete(context) {
  const { params, env } = context;
  let movies = JSON.parse((await env.MOVIES_KV.get("movies")) || "[]");
  const exists = movies.some((m) => m.id === params.id);
  if (!exists) return jsonResponse({ error: "Movie not found" }, 404);

  movies = movies.filter((m) => m.id !== params.id);
  await env.MOVIES_KV.put("movies", JSON.stringify(movies));
  return jsonResponse({ success: true });
}
