const grid = document.getElementById("movieGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const languageFilter = document.getElementById("languageFilter");

const modal = document.getElementById("playerModal");
const playerArea = document.getElementById("playerArea");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const modalLicense = document.getElementById("modalLicense");
const closeModal = document.getElementById("closeModal");

const toggleAdminBtn = document.getElementById("toggleAdmin");
const adminPanel = document.getElementById("adminPanel");
const addMovieForm = document.getElementById("addMovieForm");
const formMessage = document.getElementById("formMessage");
const sourceSelect = document.getElementById("sourceSelect");
const archiveIdLabel = document.getElementById("archiveIdLabel");
const externalUrlLabel = document.getElementById("externalUrlLabel");

let allMovies = [];

async function loadMovies() {
  const params = new URLSearchParams();
  if (searchInput.value) params.set("search", searchInput.value);
  if (languageFilter.value !== "all") params.set("language", languageFilter.value);

  const res = await fetch("/api/movies?" + params.toString());
  const movies = await res.json();
  allMovies = movies;
  renderGrid(movies);
}

function renderGrid(movies) {
  grid.innerHTML = "";
  emptyState.hidden = movies.length > 0;

  movies.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "ticket";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${movie.title} dekhein`);

    const posterHtml = movie.poster
      ? `<img src="${movie.poster}" alt="${movie.title} poster" loading="lazy" onerror="this.style.display='none'" />`
      : `<span>${movie.title}</span>`;

    card.innerHTML = `
      <div class="poster">
        ${posterHtml}
        <span class="stamp">${movie.language ? movie.language.slice(0,3).toUpperCase() : ""}<br/>${movie.year || ""}</span>
      </div>
      <div class="perforation"></div>
      <div class="info">
        <h3>${movie.title}</h3>
        <span class="meta">${movie.genre || ""} ${movie.genre ? "•" : ""} ${movie.year || ""}</span>
      </div>
    `;

    card.addEventListener("click", () => openMovie(movie));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openMovie(movie);
    });

    grid.appendChild(card);
  });
}

function openMovie(movie) {
  modalTitle.textContent = movie.title;
  modalMeta.textContent = `${movie.language} • ${movie.year || ""} • ${movie.genre || ""}`;
  modalDesc.textContent = movie.description || "";
  modalLicense.textContent = movie.license || "Public Domain";

  if (movie.source === "archive.org" && movie.archiveId) {
    playerArea.innerHTML = `<iframe src="https://archive.org/embed/${movie.archiveId}" allowfullscreen webkitallowfullscreen></iframe>`;
  } else if (movie.externalUrl) {
    playerArea.innerHTML = `
      <div class="external-link-box">
        <p>Yeh film external source par available hai (embed support nahi karta).</p>
        <a href="${movie.externalUrl}" target="_blank" rel="noopener">Wahan dekhein →</a>
      </div>`;
  } else {
    playerArea.innerHTML = `<div class="external-link-box"><p>Stream source available nahi hai.</p></div>`;
  }

  modal.hidden = false;
}

closeModal.addEventListener("click", () => {
  modal.hidden = true;
  playerArea.innerHTML = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.hidden = true;
    playerArea.innerHTML = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) {
    modal.hidden = true;
    playerArea.innerHTML = "";
  }
});

let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(loadMovies, 300);
});
languageFilter.addEventListener("change", loadMovies);

// ---------- Admin panel ----------
toggleAdminBtn.addEventListener("click", () => {
  adminPanel.hidden = !adminPanel.hidden;
  toggleAdminBtn.textContent = adminPanel.hidden
    ? "+ Admin: Nayi movie add karein"
    : "− Admin panel band karein";
});

sourceSelect.addEventListener("change", () => {
  const isArchive = sourceSelect.value === "archive.org";
  archiveIdLabel.hidden = !isArchive;
  externalUrlLabel.hidden = isArchive;
});

addMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formMessage.textContent = "";
  const formData = new FormData(addMovieForm);
  const payload = Object.fromEntries(formData.entries());

  const res = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    formMessage.textContent = "Error: " + (data.error || "Kuch gadbad hui");
    formMessage.style.color = "#e07a5f";
    return;
  }

  formMessage.textContent = `"${data.title}" successfully add ho gayi!`;
  formMessage.style.color = "#9CCC65";
  addMovieForm.reset();
  loadMovies();
});

loadMovies();
