import { Trip } from "@/lib/types/item-data";

export const TRIPS: Trip[] = [
  {
    slug: "mount-prau-2026",
    title: "Mount Prau, Central Java",
    date: "April 2026",
    regionTags: ["Indonesia", "Hiking"],
    coverEmoji: "⛰️",
    description:
      "The Dieng plateau at sunrise, with five volcanoes lined up on the horizon like a postcard no one would believe was real.",
    featured: true,
    kicker: "Central Java, Indonesia · April 2026",
    opening:
      "Prau is called the easiest of Java's summit hikes. That's relative. What it lacks in brutality it makes up for in reward — the sunrise panorama from the top, with Sindoro, Sumbing, Merapi, Merbabu, and Slamet all visible at once, is the kind of view that makes you reconsider your priorities.",
    stats: [
      { value: "2,565m", label: "Elevation" },
      { value: "~6km", label: "Trail distance" },
      { value: "5", label: "Volcanoes visible" },
      { value: "∞", label: "Times I said wow" },
    ],
    journal:
      "We summited just before 5am and waited in the cold for the light to come. When it did — slowly, then all at once — the entire Dieng plateau turned gold below us and the volcano silhouettes sharpened against a pink sky. Someone in our group said \"this is why we do this.\" I think they were right. The descent was steep and my knees complained the whole way down. Worth it.",
    places: [
      {
        name: "Patak Banteng Trailhead",
        type: "Trailhead",
        note: "Most popular route, well-marked",
      },
      {
        name: "Summit meadow",
        type: "Summit",
        note: "2,565m, wide open, perfect for tents",
      },
      {
        name: "Dieng Plateau",
        type: "Nearby",
        note: "Visit the temples and coloured lakes after descending",
      },
      {
        name: "Wonosobo",
        type: "Nearby town",
        note: "Mie ongklok is the local dish, don't skip it",
      },
    ],
    photoSlots: 6,
  },
  {
    slug: "mount-merbabu-2025",
    title: "Mount Merbabu, Central Java",
    date: "October 2025",
    regionTags: ["Indonesia", "Hiking", "Solo"],
    coverEmoji: "🏔️",
    description:
      "3,145 metres above sea level. Summit at 3am, clouds below, stars above. A mountain that earns everything it gives you.",
    featured: false,
    kicker: "Central Java, Indonesia · October 2025",
    opening:
      "Merbabu is not a mountain you visit. It's a mountain you endure — and then immediately want to do again. The trail is long, the night is cold, and the summit crater at dawn is one of the most surreal things I have ever stood inside.",
    stats: [
      { value: "3,145m", label: "Elevation" },
      { value: "~14km", label: "Trail distance" },
      { value: "3am", label: "Summit time" },
      { value: "2", label: "Hours of sleep before" },
    ],
    journal:
      "We started the Wekas trail at 8pm with headlamps and too much hope. By midnight, the temperature had dropped sharply and the path had turned to loose volcanic gravel. At 3am, standing at the crater rim, the cloud layer was below us and the Milky Way was directly overhead. I didn't say anything for a long time. Some views don't have a correct response.",
    places: [
      {
        name: "Wekas Base Camp",
        type: "Trailhead",
        note: "Register here, start at dusk for summit timing",
      },
      {
        name: "Sabana I & II",
        type: "Rest point",
        note: "Rolling grasslands, otherworldly at night",
      },
      {
        name: "Summit Crater",
        type: "Summit",
        note: "3,145m, bring a proper jacket",
      },
      {
        name: "Kopeng",
        type: "Nearby town",
        note: "Descend here for warm food and a rest",
      },
    ],
    photoSlots: 6,
  },
  {
    slug: "kuala-lumpur-2025",
    title: "Kuala Lumpur, Malaysia",
    date: "April 2025",
    regionTags: ["Southeast Asia", "Solo"],
    coverEmoji: "🇲🇾",
    description:
      "A long weekend across the causeway. Petronas at golden hour, Brickfields at noon, and roti canai for every meal.",
    featured: false,
    kicker: "Malaysia · April 2025",
    opening:
      "A spontaneous long weekend trip — just Jakarta to KL, easy and familiar yet completely different. Malaysian energy is a specific thing: chaotic, multilingual, and deeply proud of its food.",
    stats: [
      { value: "4", label: "Days" },
      { value: "5", label: "Neighbourhoods" },
      { value: "6", label: "Languages heard" },
      { value: "∞", label: "Teh tarik consumed" },
    ],
    journal:
      "I expected KL to feel like a louder Jakarta. It doesn't — it has its own rhythm, its own visual language. The contrast between the gleaming Petronas towers and the Tamil shopfronts of Brickfields three kilometres away is the whole city in miniature. I ate at a mamak stall every single day and have no regrets. The LRT is genuinely good. Jakarta, take notes.",
    places: [
      {
        name: "Petronas Twin Towers",
        type: "Landmark",
        note: "Go at dusk, not noon",
      },
      {
        name: "Brickfields (Little India)",
        type: "Neighbourhood",
        note: "Chaotic, colourful, unmissable",
      },
      {
        name: "Jalan Alor",
        type: "Street food",
        note: "Night market energy, go hungry",
      },
      {
        name: "Central Market",
        type: "Market",
        note: "Good for batik and a cold drink",
      },
      {
        name: "Masjid Jamek",
        type: "Mosque",
        note: "Colonial-era mosque at the river confluence",
      },
    ],
    photoSlots: 6,
  },
];

// Derived stats for the index page
export const ATLAS_STATS = {
  tripsLogged: TRIPS.length,
  countriesVisited: 3,
  soloAdventures: TRIPS.filter((t) => t.regionTags.includes("Solo")).length,
  firstEntry: "April 2025",
};

export const REGION_FILTERS = [
  "All",
  "Southeast Asia",
  "Indonesia",
  "Hiking",
  "Solo",
] as const;
