// Pages Function: GET/POST /api/movies

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const language = url.searchParams.get("language");

  let movies = JSON.parse((await env.MOVIES_KV.get("movies")) || "[]");

  if (language && language !== "all") {
    movies = movies.filter(
      (m) => m.language.toLowerCase() === language.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    movies = movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.description || "").toLowerCase().includes(q)
    );
  }

  return jsonResponse(movies);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();
  const { title, year, language, genre, description, source, archiveId, externalUrl, license } = body;

  if (!title || !language || !source) {
    return jsonResponse({ error: "title, language aur source zaroori hain" }, 400);
  }
  if (source === "archive.org" && !archiveId) {
    return jsonResponse({ error: "archive.org source ke liye archiveId zaroori hai" }, 400);
  }
  if (source === "external" && !externalUrl) {
    return jsonResponse({ error: "external source ke liye externalUrl zaroori hai" }, 400);
  }

  let movies = JSON.parse((await env.MOVIES_KV.get("movies")) || "[]");
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + (year || Date.now());

  const newMovie = {
    id,
    title,
    year: year || null,
    language,
    genre: genre || "",
    description: description || "",
    source,
    archiveId: archiveId || undefined,
    externalUrl: externalUrl || undefined,
    poster: source === "archive.org" ? `https://archive.org/services/img/${archiveId}` : "",
    license: license || "Public Domain / Creative Commons (verify before adding)",
  };

  movies.push(newMovie);
  await env.MOVIES_KV.put("movies", JSON.stringify(movies));

  return jsonResponse(newMovie, 201);
}
