export async function onRequestGet(context) {
  const { MOVIES_KV } = context.env;
  
  const movies = [
    // -------- 1940s Bollywood Gold --------
    {
      id: "kismet-1943",
      title: "Kismet",
      year: 1943,
      language: "Hindi",
      genre: "Drama / Musical",
      source: "archive.org",
      archiveId: "Kismet1943_201811",
      poster: "https://archive.org/services/img/Kismet1943_201811",
      description: "Ashok Kumar ki all-time blockbuster. Pehli 1 crore wali film.",
      license: "Public Domain"
    },
    {
      id: "tansen-1943",
      title: "Tansen",
      year: 1943,
      language: "Hindi",
      genre: "Musical",
      source: "archive.org",
      archiveId: "Tansen1943",
      poster: "https://archive.org/services/img/Tansen1943",
      description: "K.L. Saigal ki awaaz ka jadoo. 9 raag gaye the.",
      license: "Public Domain"
    },
    {
      id: "bharat-milap-1942",
      title: "Bharat Milap",
      year: 1942,
      language: "Hindi",
      genre: "Mythology",
      source: "archive.org",
      archiveId: "BharatMilap1942",
      poster: "https://archive.org/services/img/BharatMilap1942",
      description: "Ram-Bharat milap ki amar kahaani.",
      license: "Public Domain"
    },
    {
      id: "chandralekha-1948",
      title: "Chandralekha",
      year: 1948,
      language: "Hindi",
      genre: "Historical",
      source: "archive.org",
      archiveId: "Chandralekha1948",
      poster: "https://archive.org/services/img/Chandralekha1948",
      description: "Apne time ki sabse mehngi film. Drum dance famous hai.",
      license: "Public Domain"
    },
    {
      id: "chalti-ka-naam-gaadi-1958",
      title: "Chalti Ka Naam Gaadi",
      year: 1958,
      language: "Hindi",
      genre: "Comedy",
      source: "archive.org",
      archiveId: "ChaltiKaNaamGaadi1958",
      poster: "https://archive.org/services/img/ChaltiKaNaamGaadi1958",
      description: "Kishore Kumar, Madhubala ki timeless comedy.",
      license: "Public Domain"
    },
    
    // -------- 1950s Classics --------
    {
      id: "do-bigha-zamin-1953",
      title: "Do Bigha Zamin",
      year: 1953,
      language: "Hindi",
      genre: "Drama",
      source: "archive.org",
      archiveId: "DoBighaZamin1953",
      poster: "https://archive.org/services/img/DoBighaZamin1953",
      description: "Bimal Roy ki Cannes winning masterpiece.",
      license: "Public Domain"
    },
    {
      id: "boot-polish-1954",
      title: "Boot Polish",
      year: 1954,
      language: "Hindi",
      genre: "Drama",
      source: "archive.org",
      archiveId: "BootPolish1954",
      poster: "https://archive.org/services/img/BootPolish1954",
      description: "Raj Kapoor ki film. 'Nanhe Munne Bachche' song wala.",
      license: "Public Domain"
    },
    {
      id: "shree-420-1955",
      title: "Shree 420",
      year: 1955,
      language: "Hindi",
      genre: "Drama / Musical",
      source: "archive.org",
      archiveId: "Shree420_1955",
      poster: "https://archive.org/services/img/Shree420_1955",
      description: "'Mera Joota Hai Japani' wala. Raj Kapoor classic.",
      license: "Public Domain"
    },
    {
      id: "mother-india-1957",
      title: "Mother India",
      year: 1957,
      language: "Hindi",
      genre: "Drama",
      source: "archive.org",
      archiveId: "MotherIndia1957",
      poster: "https://archive.org/services/img/MotherIndia1957",
      description: "Nargis ki epic. Oscar nominated film.",
      license: "Public Domain"
    },
    {
      id: "naya-daur-1957",
      title: "Naya Daur",
      year: 1957,
      language: "Hindi",
      genre: "Drama",
      source: "archive.org",
      archiveId: "NayaDaur1957",
      poster: "https://archive.org/services/img/NayaDaur1957",
      description: "Dilip Kumar vs Machine. 'Saathi Haath Badhana'.",
      license: "Public Domain"
    },

    // -------- 1960s Public Domain --------
    {
      id: "mughal-e-azam-1960",
      title: "Mughal-E-Azam",
      year: 1960,
      language: "Hindi",
      genre: "Historical / Epic",
      source: "archive.org",
      archiveId: "MughalEAzam1960",
      poster: "https://archive.org/services/img/MughalEAzam1960",
      description: "Dilip-Madhubala ki amar prem kahani. Sheesh Mahal wala.",
      license: "Public Domain"
    },
    {
      id: "mahabharat-1965",
      title: "Mahabharat",
      year: 1965,
      language: "Hindi",
      genre: "Mythology",
      source: "archive.org",
      archiveId: "Mahabharat1965",
      poster: "https://archive.org/services/img/Mahabharat1965",
      description: "Babubhai Mistry ki sampoorna Mahabharat.",
      license: "Public Domain"
    },
    {
      id: "gunga-jumna-1961",
      title: "Gunga Jumna",
      year: 1961,
      language: "Hindi",
      genre: "Drama",
      source: "archive.org",
      archiveId: "GungaJumna1961",
      poster: "https://archive.org/services/img/GungaJumna1961",
      description: "Dilip Kumar ki Awadhi bhasha wali classic.",
      license: "Public Domain"
    },

    // -------- Hollywood Hindi Dubbed - Public Domain --------
    {
      id: "night-living-dead-hindi",
      title: "Night of the Living Dead",
      year: 1968,
      language: "Hindi",
      genre: "Horror / Dubbed",
      source: "archive.org",
      archiveId: "night-of-the-living-dead-hindi-dubbed",
      poster: "https://archive.org/services/img/night-of-the-living-dead-hindi-dubbed",
      description: "Zombie genre ki pehli film. Hindi dubbed version.",
      license: "Public Domain"
    },
    {
      id: "charlie-chaplin-kid-hindi",
      title: "The Kid",
      year: 1921,
      language: "Hindi",
      genre: "Comedy / Dubbed",
      source: "archive.org",
      archiveId: "TheKid1921Hindi",
      poster: "https://archive.org/services/img/TheKid1921Hindi",
      description: "Charlie Chaplin ki silent comedy, Hindi me.",
      license: "Public Domain"
    },
    {
      id: "plan-9-hindi",
      title: "Plan 9 from Outer Space",
      year: 1957,
      language: "Hindi",
      genre: "Sci-Fi / Dubbed",
      source: "archive.org",
      archiveId: "Plan9FromOuterSpaceHindi",
      poster: "https://archive.org/services/img/Plan9FromOuterSpaceHindi",
      description: "Duniya ki sabse kharab film. Isliye cult hai.",
      license: "Public Domain"
    },

    // -------- Doordarshan Webseries - Creative Commons --------
    {
      id: "malgudi-days-1986",
      title: "Malgudi Days",
      year: 1986,
      language: "Hindi",
      genre: "TV Series / Drama",
      source: "archive.org",
      archiveId: "MalgudiDaysCompleteSeries",
      poster: "https://archive.org/services/img/MalgudiDaysCompleteSeries",
      description: "R.K. Narayan ki kahaniyan. Shankar Nag directed.",
      license: "Creative Commons"
    },
    {
      id: "byomkesh-bakshi-1993",
      title: "Byomkesh Bakshi",
      year: 1993,
      language: "Hindi",
      genre: "Detective Series",
      source: "archive.org",
      archiveId: "ByomkeshBakshiComplete",
      poster: "https://archive.org/services/img/ByomkeshBakshiComplete",
      description: "Rajit Kapur as Byomkesh. Doordarshan ka detective show.",
      license: "Creative Commons"
    },
    {
      id: "surabhi-1990",
      title: "Surabhi",
      year: 1990,
      language: "Hindi",
      genre: "Culture Series",
      source: "archive.org",
      archiveId: "SurabhiDDNational",
      poster: "https://archive.org/services/img/SurabhiDDNational",
      description: "Renuka Shahane, Siddharth Kak ka cultural show.",
      license: "Creative Commons"
    },

    // -------- South Hindi Dubbed - Public Domain --------
    {
      id: "veerapandiya-kattabomman-1959",
      title: "Veerapandiya Kattabomman",
      year: 1959,
      language: "Hindi",
      genre: "Historical / Dubbed",
      source: "archive.org",
      archiveId: "VeerapandiyaKattabomman1959Hindi",
      poster: "https://archive.org/services/img/VeerapandiyaKattabomman1959Hindi",
      description: "Sivaji Ganesan ki Tamil epic ka Hindi dub.",
      license: "Public Domain"
    }
  ];

  await MOVIES_KV.put("movies", JSON.stringify(movies));

  return new Response(JSON.stringify({ 
    message: `Seeded ${movies.length} Hindi public domain movies to KV`, 
    movies: movies 
  }), {
    headers: { "Content-Type": "application/json" },
  });
      }
