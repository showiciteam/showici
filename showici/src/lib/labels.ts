import type { Lang } from "./lang";

/**
 * The database stores act types, styles, venue types and event categories in English.
 * This shows them in French on French pages. Anything not listed here is shown as stored.
 */
const FR: Record<string, string> = {
  // Kinds of acts
  Band: "Groupe",
  "Band · covers": "Groupe · reprises",
  "Band · originals": "Groupe · compositions",
  "Solo musician": "Musicien solo",
  Duo: "Duo",
  DJ: "DJ",
  "Stand-up comedy": "Humour",
  Magician: "Magicien",
  Dancer: "Danse",
  Mariachi: "Mariachi",
  Other: "Autre",
  // Repertoire
  Covers: "Reprises",
  Originals: "Compositions",
  Both: "Reprises et compositions",
  // Styles
  Rock: "Rock",
  Pop: "Pop",
  Jazz: "Jazz",
  Blues: "Blues",
  Country: "Country",
  "80s / 90s": "Années 80 / 90",
  Latin: "Latin",
  "Hip-hop": "Hip-hop",
  Electronic: "Électro",
  "Folk / trad québécois": "Folk / trad québécois",
  Folk: "Folk",
  Metal: "Métal",
  "R&B / soul": "R&B / soul",
  Soul: "Soul",
  Celtic: "Celtique",
  Classical: "Classique",
  Acoustic: "Acoustique",
  Indie: "Indie",
  Comedy: "Humour",
  Dance: "Danse",
  // Venue types
  Pub: "Pub",
  Bar: "Bar",
  Restaurant: "Restaurant",
  Brewery: "Microbrasserie",
  Café: "Café",
  Club: "Club",
  "Event hall": "Salle d’événements",
  // Big event categories
  Concert: "Concert",
  Festival: "Festival",
  Family: "Famille",
  Theatre: "Théâtre",
  Event: "Spectacle",
  // Private events
  Wedding: "Mariage",
  Birthday: "Anniversaire",
  Quinceañera: "Quinceañera",
  "House party": "Party de maison",
  Anniversary: "Anniversaire de mariage",
  Corporate: "Événement corporatif",
  "Kids' party": "Fête d’enfants",
};

/** A stored value in the page language. Matching ignores letter case ("jazz" and "Jazz"). */
export function label(value: string, lang: Lang): string {
  if (lang === "en") return value;
  return FR[value] ?? FR[Object.keys(FR).find((k) => k.toLowerCase() === value.toLowerCase()) ?? ""] ?? value;
}

const DAYS_FR: Record<string, string> = { MON: "LUN", TUE: "MAR", WED: "MER", THU: "JEU", FRI: "VEN", SAT: "SAM", SUN: "DIM" };
const MONTHS_FR: Record<string, string> = {
  JAN: "JANV", FEB: "FÉVR", MAR: "MARS", APR: "AVR", MAY: "MAI", JUN: "JUIN", JUL: "JUIL", AUG: "AOÛT", SEP: "SEPT", OCT: "OCT", NOV: "NOV", DEC: "DÉC",
};

/** Short day ("THU") and month ("NOV") badges in the page language. */
export const dayLabel = (day: string, lang: Lang) => (lang === "fr" ? DAYS_FR[day.toUpperCase()] ?? day : day).toUpperCase();
export const monthLabel = (month: string, lang: Lang) => (lang === "fr" ? MONTHS_FR[month.slice(0, 3).toUpperCase()] ?? month : month).toUpperCase();
