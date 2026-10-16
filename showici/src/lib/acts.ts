/**
 * What a performer can pick depends on the kind of act: a magician isn't asked about rock or covers.
 * Each act family has its own style list (saved in `genres`) and its own "repertoire" question.
 * Every style list ends with "Other", which opens a box to type a style that isn't listed.
 */

export const ACT_TYPES = ["Band", "Solo musician", "Duo", "DJ", "Stand-up comedy", "Magician", "Dancer", "Mariachi", "Other"] as const;

export const LANGUAGES = ["Français", "English", "Español"] as const;

type Family = { styles: string[]; repertoireLabel: string; repertoire: string[]; ownSound: boolean };

const MUSIC: Family = {
  styles: ["Rock", "Pop", "Jazz", "Blues", "Country", "80s / 90s", "Latin", "Hip-hop", "Electronic", "Folk / trad québécois", "Metal", "R&B / soul", "Classical", "Acoustic"],
  repertoireLabel: "Repertoire",
  repertoire: ["Covers", "Originals", "Both"],
  ownSound: true,
};

const FAMILIES: Record<string, Family> = {
  music: MUSIC,
  mariachi: {
    styles: ["Traditional mariachi", "Ranchera", "Bolero", "Cumbia", "Latin pop", "Serenades"],
    repertoireLabel: "Repertoire",
    repertoire: ["Covers", "Originals", "Both"],
    ownSound: true,
  },
  dj: {
    styles: ["Open format", "Top 40", "House", "Techno", "Hip-hop / R&B", "Latin / reggaeton", "80s / 90s", "Wedding and party mix"],
    repertoireLabel: "What you play",
    repertoire: ["Popular tracks", "My own productions", "Both"],
    ownSound: true,
  },
  comedy: {
    styles: ["Observational", "Storytelling", "Crowd work", "Improv", "One-liners", "Bilingual comedy", "Musical comedy"],
    repertoireLabel: "Content",
    repertoire: ["Clean (all ages)", "Mature (18+)", "Can adapt to the crowd"],
    ownSound: false,
  },
  magic: {
    styles: ["Close-up / strolling", "Stage magic", "Mentalism", "Comedy magic", "Kids' magic", "Balloon art"],
    repertoireLabel: "Audience",
    repertoire: ["Kids", "Adults", "All ages"],
    ownSound: false,
  },
  dance: {
    styles: ["Salsa / bachata", "Hip-hop / street", "Contemporary", "Ballet", "Folk / traditional", "Belly dance", "Bollywood", "Tap"],
    repertoireLabel: "Show format",
    repertoire: ["Choreographed show", "Audience participation", "Both"],
    ownSound: false,
  },
  other: {
    styles: ["Circus / acrobatics", "Fire show", "Clown", "Puppets", "Spoken word", "Karaoke / trivia host"],
    repertoireLabel: "Audience",
    repertoire: ["Family friendly", "Adults (18+)", "All ages"],
    ownSound: false,
  },
};

function familyKey(actType: string) {
  switch (actType) {
    case "DJ": return "dj";
    case "Stand-up comedy": return "comedy";
    case "Magician": return "magic";
    case "Dancer": return "dance";
    case "Mariachi": return "mariachi";
    case "Other": return "other";
    default: return "music";
  }
}

export function actFamily(actType: string): Family {
  return FAMILIES[familyKey(actType)] ?? MUSIC;
}

/** Splits saved values into the ones on the list and the ones the person typed ("Other"). */
export function splitOther(saved: string[], listed: readonly string[]) {
  const known = saved.filter((s) => listed.includes(s));
  const typed = saved.filter((s) => !listed.includes(s) && s !== "Other");
  return { known: typed.length ? [...known, "Other"] : known, other: typed.join(", ") };
}

/** Turns chips + the "Other" box back into one list to save. */
export function joinOther(chips: string[], other: string) {
  const extra = chips.includes("Other") ? other.split(",").map((s) => s.trim()).filter(Boolean) : [];
  return [...chips.filter((c) => c !== "Other"), ...extra];
}
