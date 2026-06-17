const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "movies.json");

app.use(express.json());
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

function readMovies() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeMovies(movies) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(movies, null, 2), "utf-8");
}

// GET all movies, with optional search + language filter
app.get("/api/movies", (req, res) => {
  const { search, language } = req.query;
  let movies = readMovies();

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
        (m.description && m.description.toLowerCase().includes(q))
    );
  }

  res.json(movies);
});

// GET single movie by id
app.get("/api/movies/:id", (req, res) => {
  const movies = readMovies();
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
});

// POST add a new movie (admin panel uses this)
app.post("/api/movies", (req, res) => {
  const { title, year, language, genre, description, source, archiveId, externalUrl, license } = req.body;

  if (!title || !language || !source) {
    return res.status(400).json({ error: "title, language aur source zaroori hain" });
  }
  if (source === "archive.org" && !archiveId) {
    return res.status(400).json({ error: "archive.org source ke liye archiveId zaroori hai" });
  }
  if (source === "external" && !externalUrl) {
    return res.status(400).json({ error: "external source ke liye externalUrl zaroori hai" });
  }

  const movies = readMovies();
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
  writeMovies(movies);
  res.status(201).json(newMovie);
});

// DELETE a movie (admin panel uses this)
app.delete("/api/movies/:id", (req, res) => {
  let movies = readMovies();
  const exists = movies.some((m) => m.id === req.params.id);
  if (!exists) return res.status(404).json({ error: "Movie not found" });

  movies = movies.filter((m) => m.id !== req.params.id);
  writeMovies(movies);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Cinema Ghar server chal raha hai: http://localhost:${PORT}`);
});
