// Pages Function: GET /api/seed
// Ek baar visit karne se KV mein shuruati 4 verified public-domain movies set ho jaati hain.

const SEED_MOVIES = [
  {
    id: "kismet-1943",
    title: "Kismet",
    year: 1943,
    language: "Hindi",
    genre: "Drama / Musical",
    description:
      "Bombay Talkies ki classic kahani ek dil-phenk chor ki, jisme family ka bichhdaa beta aur ek divyang dancer ki kahani judti hai. Iss film ne Hindi cinema mein pehli baar ek 'anti-hero' character pesh kiya tha.",
    source: "archive.org",
    archiveId: "Kismet_201903",
    poster: "https://archive.org/services/img/Kismet_201903",
    license: "Public Domain Mark 1.0",
  },
  {
    id: "achhut-kannya-1936",
    title: "Achhut Kannya",
    year: 1936,
    language: "Hindi",
    genre: "Drama / Social",
    description:
      "Devika Rani aur Ashok Kumar starring ye Bombay Talkies ki landmark film, ek upper-caste ladke aur ek 'untouchable' ladki ki prem kahani ke through chhuachhut ke mudde ko uthati hai.",
    source: "external",
    externalUrl: "https://commons.wikimedia.org/wiki/Category:Achhut_Kannya",
    poster: "",
    license: "Public Domain (India, 1936 release)",
  },
  {
    id: "india-independent-1949",
    title: "India Independent",
    year: 1949,
    language: "English",
    genre: "Documentary",
    description:
      "Government of India, Films Division dwara bani documentary jo bharat ke azaadi ke andolan ko 1857 se Mahatma Gandhi ki shahadat tak dikhati hai.",
    source: "archive.org",
    archiveId: "dli.MoI.films.001082",
    poster: "https://archive.org/services/img/dli.MoI.films.001082",
    license: "Public Domain (Govt. of India production)",
  },
  {
    id: "night-living-dead-1968",
    title: "Night of the Living Dead",
    year: 1968,
    language: "English",
    genre: "Horror",
    description:
      "George A. Romero ki classic zombie horror film. Copyright notice chhoot jaane ki wajah se ye film officially public domain hai USA mein.",
    source: "archive.org",
    archiveId: "night_of_the_living_dead",
    poster: "https://archive.org/services/img/night_of_the_living_dead",
    license: "Public Domain Mark 1.0",
  },
];

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.MOVIES_KV) {
    return new Response(
      JSON.stringify({
        error:
          "MOVIES_KV binding nahi mila. Cloudflare Pages dashboard mein Settings > Functions > KV namespace bindings se 'MOVIES_KV' add karein.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const existing = await env.MOVIES_KV.get("movies");
  if (existing) {
    const count = JSON.parse(existing).length;
    return new Response(
      JSON.stringify({ message: `Movies already seeded hain (${count} movies). Kuch nahi badla.` }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  await env.MOVIES_KV.put("movies", JSON.stringify(SEED_MOVIES));
  return new Response(
    JSON.stringify({ message: `Seed ho gaya! ${SEED_MOVIES.length} movies add ki gayi.` }),
    { headers: { "Content-Type": "application/json" } }
  );
}
