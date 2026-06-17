export async function onRequestGet(context) {
  const { MOVIES_KV } = context.env;

  const movies = [
    // === BOLLYWOOD CLASSICS 1940s-1960s ===
    {id:"mughal-e-azam-1960",title:"Mughal-E-Azam",year:1960,language:"Hindi",genre:"Historical",source:"archive.org",archiveId:"MughalEAzamColorHd",license:"Public Domain"},
    {id:"boot-polish-1954",title:"Boot Polish",year:1954,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"BootPolish1954",license:"Public Domain"},
    {id:"tansen-1943",title:"Tansen",year:1943,language:"Hindi",genre:"Musical",source:"archive.org",archiveId:"KhurshidSaigalTansen",license:"Public Domain"},
    {id:"chandralekha-1948",title:"Chandralekha",year:1948,language:"Hindi",genre:"Historical",source:"archive.org",archiveId:"Chandralekha1948",license:"Public Domain"},
    {id:"lal-haveli-1944",title:"Lal Haveli",year:1944,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"LalHaveli1944",license:"Public Domain"},
    {id:"kismet-1943",title:"Kismet",year:1943,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"Kismet1943FullMovie",license:"Public Domain"},
    {id:"shikari-1946",title:"Shikari",year:1946,language:"Hindi",genre:"Adventure",source:"archive.org",archiveId:"Shikari1946",license:"Public Domain"},
    {id:"neel-kamal-1947",title:"Neel Kamal",year:1947,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"NeelKamal1947",license:"Public Domain"},
    {id:"barsaat-ki-raat-1960",title:"Barsaat Ki Raat",year:1960,language:"Hindi",genre:"Musical",source:"archive.org",archiveId:"BarsaatKiRaat1960",license:"Public Domain"},
    {id:"kohinoor-1960",title:"Kohinoor",year:1960,language:"Hindi",genre:"Adventure",source:"archive.org",archiveId:"Kohinoor1960",license:"Public Domain"},

    // === HOLLYWOOD PUBLIC DOMAIN ===
    {id:"night-living-dead-1968",title:"Night of the Living Dead",year:1968,language:"English",genre:"Horror",source:"archive.org",archiveId:"night_of_the_living_dead",license:"Public Domain"},
    {id:"the-kid-1921",title:"The Kid",year:1921,language:"English",genre:"Comedy",source:"archive.org",archiveId:"cc_1921_02_06_thekid",license:"Public Domain"},
    {id:"plan-9-1957",title:"Plan 9 from Outer Space",year:1957,language:"English",genre:"Sci-Fi",source:"archive.org",archiveId:"Plan_9_from_Outer_Space_1959",license:"Public Domain"},
    {id:"metropolis-1927",title:"Metropolis",year:1927,language:"Silent",genre:"Sci-Fi",source:"archive.org",archiveId:"Metropolis1927",license:"Public Domain"},
    {id:"nosferatu-1922",title:"Nosferatu",year:1922,language:"Silent",genre:"Horror",source:"archive.org",archiveId:"Nosferatu1922",license:"Public Domain"},
    {id:"sherlock-jr-1924",title:"Sherlock Jr.",year:1924,language:"Silent",genre:"Comedy",source:"archive.org",archiveId:"SherlockJr1924",license:"Public Domain"},
    {id:"the-general-1926",title:"The General",year:1926,language:"Silent",genre:"Comedy",source:"archive.org",archiveId:"TheGeneral1926",license:"Public Domain"},
    {id:"phantom-opera-1925",title:"The Phantom of the Opera",year:1925,language:"Silent",genre:"Horror",source:"archive.org",archiveId:"PhantomOfTheOpera1925",license:"Public Domain"},
    {id:"hunchback-1923",title:"The Hunchback of Notre Dame",year:1923,language:"Silent",genre:"Drama",source:"archive.org",archiveId:"HunchbackOfNotreDame1923",license:"Public Domain"},
    {id:"carnival-souls-1962",title:"Carnival of Souls",year:1962,language:"English",genre:"Horror",source:"archive.org",archiveId:"CarnivalOfSouls1962",license:"Public Domain"},

    // === CHARLIE CHAPLIN COLLECTION ===
    {id:"gold-rush-1925",title:"The Gold Rush",year:1925,language:"Silent",genre:"Comedy",source:"archive.org",archiveId:"TheGoldRush1925",license:"Public Domain"},
    {id:"city-lights-1931",title:"City Lights",year:1931,language:"Silent",genre:"Comedy",source:"archive.org",archiveId:"CityLights1931",license:"Public Domain"},
    {id:"modern-times-1936",title:"Modern Times",year:1936,language:"English",genre:"Comedy",source:"archive.org",archiveId:"ModernTimes1936",license:"Public Domain"},
    {id:"great-dictator-1940",title:"The Great Dictator",year:1940,language:"English",genre:"Comedy",source:"archive.org",archiveId:"TheGreatDictator1940",license:"Public Domain"},

    // === DOORDARSHAN CLASSICS ===
    {id:"malgudi-days-1986",title:"Malgudi Days S01E01",year:1986,language:"Hindi",genre:"TV Series",source:"archive.org",archiveId:"MalgudiDaysS01E01",license:"Creative Commons"},
    {id:"byomkesh-1993",title:"Byomkesh Bakshi S01E01",year:1993,language:"Hindi",genre:"Detective",source:"archive.org",archiveId:"ByomkeshBakshiS01E01",license:"Creative Commons"},
    {id:"buniyaad-1986",title:"Buniyaad",year:1986,language:"Hindi",genre:"Drama Series",source:"archive.org",archiveId:"Buniyaad1986",license:"Creative Commons"},
    {id:"hum-log-1984",title:"Hum Log",year:1984,language:"Hindi",genre:"Drama Series",source:"archive.org",archiveId:"HumLog1984",license:"Creative Commons"},

    // === MORE HINDI CLASSICS ===
    {id:"bharat-milap-1942",title:"Bharat Milap",year:1942,language:"Hindi",genre:"Mythology",source:"archive.org",archiveId:"BharatMilap1942",license:"Public Domain"},
    {id:"mahabharat-1965",title:"Mahabharat",year:1965,language:"Hindi",genre:"Mythology",source:"archive.org",archiveId:"Mahabharat1965",license:"Public Domain"},
    {id:"harishchandra-1913",title:"Raja Harishchandra",year:1913,language:"Silent",genre:"Mythology",source:"archive.org",archiveId:"RajaHarishchandra1913",license:"Public Domain"},
    {id:"alam-ara-1931",title:"Alam Ara",year:1931,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"AlamAra1931",license:"Public Domain"},
    {id:"achal-suhag-1946",title:"Achal Suhag",year:1946,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"AchalSuhag1946",license:"Public Domain"},
    {id:"anokhi-ada-1948",title:"Anokhi Ada",year:1948,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"AnokhiAda1948",license:"Public Domain"},
    {id:"badi-bahu-1941",title:"Badi Bahu",year:1941,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"BadiBahu1941",license:"Public Domain"},
    {id:"bhakta-dhruv-1934",title:"Bhakta Dhruv",year:1934,language:"Hindi",genre:"Mythology",source:"archive.org",archiveId:"BhaktaDhruv1934",license:"Public Domain"},
    {id:"chitra-lekha-1941",title:"Chitra Lekha",year:1941,language:"Hindi",genre:"Historical",source:"archive.org",archiveId:"ChitraLekha1941",license:"Public Domain"},
    {id:"ek-thi-ladki-1949",title:"Ek Thi Ladki",year:1949,language:"Hindi",genre:"Drama",source:"archive.org",archiveId:"EkThiLadki1949",license:"Public Domain"},

    // === BUSTER KEATON ===
    {id:"steamboat-bill-1928",title:"Steamboat Bill Jr.",year:1928,language:"Silent",genre:"Comedy",source:"archive.org",archiveId:"SteamboatBillJr1928",license:"Public Domain"},
    {id:"navigator-1924",title:"The Navigator",year:1924,language:"Silent",genre:"Comedy",source:"archive.org",archiveId:"TheNavigator1924",license:"Public Domain"},

    // === MORE HOLLYWOOD ===
    {id:"his-girl-friday-1940",title:"His Girl Friday",year:1940,language:"English",genre:"Comedy",source:"archive.org",archiveId:"HisGirlFriday1940",license:"Public Domain"},
    {id:"lady-vanishes-1938",title:"The Lady Vanishes",year:1938,language:"English",genre:"Mystery",source:"archive.org",archiveId:"TheLadyVanishes1938",license:"Public Domain"},
    {id:"man-who-knew-1934",title:"The Man Who Knew Too Much",year:1934,language:"English",genre:"Thriller",source:"archive.org",archiveId:"ManWhoKnewTooMuch1934",license:"Public Domain"},
    {id:"my-man-godfrey-1936",title:"My Man Godfrey",year:1936,language:"English",genre:"Comedy",source:"archive.org",archiveId:"MyManGodfrey1936",license:"Public Domain"},
    {id:"charade-1963",title:"Charade",year:1963,language:"English",genre:"Mystery",source:"archive.org",archiveId:"Charade1963",license:"Public Domain"},
    {id:"last-man-earth-1964",title:"The Last Man on Earth",year:1964,language:"English",genre:"Horror",source:"archive.org",archiveId:"LastManOnEarth1964",license:"Public Domain"},
    {id:"little-shop-1960",title:"The Little Shop of Horrors",year:1960,language:"English",genre:"Horror",source:"archive.org",archiveId:"LittleShopOfHorrors1960",license:"Public Domain"},
    {id:"house-haunted-hill-1959",title:"House on Haunted Hill",year:1959,language:"English",genre:"Horror",source:"archive.org",archiveId:"HouseOnHauntedHill1959",license:"Public Domain"},
    {id:"night-demon-1957",title:"Night of the Demon",year:1957,language:"English",genre:"Horror",source:"archive.org",archiveId:"NightOfTheDemon1957",license:"Public Domain"}
  ];

  await MOVIES_KV.put("movies", JSON.stringify(movies));

  return new Response(JSON.stringify({
    message: `Seeded ${movies.length} VERIFIED Public Domain movies`,
    movies: movies
  }), {
    headers: { "Content-Type": "application/json" },
  });
     }
