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
  "Private event": "Événement privé",
  // Entry
  "Free entry": "Entrée libre",
  "Cover charge": "Prix d’entrée",
  "Free": "Gratuit",
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

const WEEKDAYS_FR: Record<string, string> = {
  Monday: "lundi", Tuesday: "mardi", Wednesday: "mercredi", Thursday: "jeudi", Friday: "vendredi", Saturday: "samedi", Sunday: "dimanche",
  Mon: "lun", Tue: "mar", Wed: "mer", Thu: "jeu", Fri: "ven", Sat: "sam", Sun: "dim",
};
const MONTH_NAMES_FR: Record<string, string> = {
  January: "janvier", February: "février", March: "mars", April: "avril", May: "mai", June: "juin", July: "juillet",
  August: "août", September: "septembre", October: "octobre", November: "novembre", December: "décembre",
  Jan: "janv.", Feb: "févr.", Mar: "mars", Apr: "avr.", Jun: "juin", Jul: "juil.", Aug: "août", Sep: "sept.", Sept: "sept.", Oct: "oct.", Nov: "nov.", Dec: "déc.",
};
const WORDS = (names: Record<string, string>) => new RegExp(`\\b(${Object.keys(names).sort((a, b) => b.length - a.length).join("|")})\\.?(?![a-z])`, "g");
const WEEKDAY_RE = WORDS(WEEKDAYS_FR);
const MONTH_RE = WORDS(MONTH_NAMES_FR);

/**
 * Dates and times formatted in English ("Friday, October 9", "Sat, Mar 20", "9:00 pm", "75 guests")
 * written the Québec way on French pages ("vendredi 9 octobre", "sam 20 mars", "21 h", "75 invités").
 */
export function whenLabel(text: string, lang: Lang): string {
  if (lang === "en" || !text) return text;
  if (DAYS_FR[text]) return DAYS_FR[text];
  return text
    .replace(/\b(\d{1,2}):(\d{2})\s*([ap])\.?m\.?/gi, (_, h: string, m: string, ap: string) => {
      const hour = (Number(h) % 12) + (ap.toLowerCase() === "p" ? 12 : 0);
      return m === "00" ? `${hour} h` : `${hour} h ${m}`;
    })
    .replace(/\b([A-Z][a-z]{2,8})\.? (\d{1,2})\b/g, (all, month: string, day: string) => (month in MONTH_NAMES_FR ? `${day} ${month}` : all))
    .replace(WEEKDAY_RE, (w) => WEEKDAYS_FR[w.replace(".", "")])
    .replace(MONTH_RE, (m) => MONTH_NAMES_FR[m.replace(".", "")])
    .replace(/(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|lun|mar|mer|jeu|ven|sam|dim),/g, "$1")
    .replace(/(\d{1,2} [a-zéû.]+), (\d{4})/g, "$1 $2")
    .replace(/\bguests\b/g, "invités")
    .replace(/\$(\d[\d,]*)/g, (_, n: string) => `${n.replace(/,/g, " ")} $`);
}
