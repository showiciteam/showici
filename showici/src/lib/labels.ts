/**
 * French labels for values stored in English in the database (act types, styles, venue types, chips…).
 * Pages show `label(lang, value)`; the stored value never changes, so search filters keep working.
 * A value missing here is shown as stored.
 */
import type { Lang } from "./locale";

const FR: Record<string, string> = {
  // Venue types
  Pub: "Pub", Bar: "Bar", Restaurant: "Restaurant", Brewery: "Microbrasserie", "Café": "Café", Club: "Club", "Event hall": "Salle de spectacle", Other: "Autre",
  // What venues book
  Bands: "Groupes", "Solo / duo": "Solo / duo", DJs: "DJ", "Stand-up comedy": "Humour", Magicians: "Magiciens", "Trivia / karaoke hosts": "Animation quiz / karaoké",
  // Act types
  Band: "Groupe", "Solo musician": "Musicien solo", Duo: "Duo", DJ: "DJ", Magician: "Magicien", Dancer: "Danse", Mariachi: "Mariachi", "Solo singer": "Chanteur ou chanteuse solo", Comedian: "Humoriste", Dancers: "Danseurs",
  // Music styles (as stored, any case)
  rock: "rock", Rock: "Rock", pop: "pop", Pop: "Pop", jazz: "jazz", Jazz: "Jazz", blues: "blues", Blues: "Blues", country: "country", Country: "Country",
  folk: "folk", Folk: "Folk", indie: "indie", Indie: "Indie", electronic: "électro", Electronic: "Électro", classical: "classique", Classical: "Classique",
  punk: "punk", Punk: "Punk", metal: "métal", Metal: "Métal", "hip-hop": "hip-hop", "Hip-hop": "Hip-hop", latin: "latino", Latin: "Latino", world: "musiques du monde", World: "Musiques du monde",
  comedy: "humour", Comedy: "Humour", disco: "disco", Disco: "Disco", experimental: "expérimental", Acoustic: "Acoustique", Celtic: "Celtique", Tribute: "Hommage", tribute: "hommage",
  Chanson: "Chanson", Chansonnier: "Chansonnier", House: "House", Techno: "Techno", Dance: "Danse", Soul: "Soul", "R&B / soul": "R&B / soul", "Singer-songwriter": "Auteur-compositeur",
  Retro: "Rétro", "Pub rock": "Pub rock", "Open mic": "Micro ouvert", Improv: "Improvisation", Francophone: "Francophone", "Québec francophone": "Chanson québécoise",
  Karaoke: "Karaoké", Party: "Party", Burlesque: "Burlesque", Bluegrass: "Bluegrass", "Live music": "Musique live", "Pop rock": "Pop rock",
  "80s / 90s": "Années 80 / 90", "Folk / trad québécois": "Folk / trad québécois",
  // Other act families
  "Traditional mariachi": "Mariachi traditionnel", Ranchera: "Ranchera", Bolero: "Boléro", Cumbia: "Cumbia", "Latin pop": "Pop latine", Serenades: "Sérénades",
  "Open format": "Tous styles", "Top 40": "Top 40", "Hip-hop / R&B": "Hip-hop / R&B", "Latin / reggaeton": "Latino / reggaeton", "Wedding and party mix": "Mix mariage et party",
  Observational: "Observation", Storytelling: "Récits", "Crowd work": "Interaction avec le public", "One-liners": "One-liners", "Bilingual comedy": "Humour bilingue", "Musical comedy": "Humour musical",
  "Close-up / strolling": "Close-up / ambulant", "Stage magic": "Magie de scène", Mentalism: "Mentalisme", "Comedy magic": "Magie humoristique", "Kids' magic": "Magie pour enfants", "Balloon art": "Sculpture de ballons",
  "Salsa / bachata": "Salsa / bachata", "Hip-hop / street": "Hip-hop / street", Contemporary: "Contemporain", Ballet: "Ballet", "Folk / traditional": "Folklorique / traditionnel", "Belly dance": "Danse orientale", Bollywood: "Bollywood", Tap: "Claquettes",
  "Circus / acrobatics": "Cirque / acrobatie", "Fire show": "Spectacle de feu", Clown: "Clown", Puppets: "Marionnettes", "Spoken word": "Slam / poésie", "Karaoke / trivia host": "Animation karaoké / quiz",
  // Repertoire answers
  Covers: "Reprises", Originals: "Compositions", Both: "Les deux", "Popular tracks": "Succès populaires", "My own productions": "Mes propres productions",
  "Clean (all ages)": "Pour tous", "Mature (18+)": "Pour adultes (18+)", "Can adapt to the crowd": "S'adapte au public", Kids: "Enfants", Adults: "Adultes", "All ages": "Tous âges",
  "Choreographed show": "Spectacle chorégraphié", "Audience participation": "Participation du public", "Family friendly": "Familial", "Adults (18+)": "Adultes (18+)",
  // Event types
  "Pubs and bars": "Pubs et bars", Restaurants: "Restaurants", "Private parties": "Fêtes privées", "Quinceañeras": "Quinceañeras", Weddings: "Mariages", "Corporate events": "Événements d'entreprise", Festivals: "Festivals", "Kids' parties": "Fêtes d'enfants",
  "Quinceañera": "Quinceañera", Birthday: "Anniversaire", Wedding: "Mariage", "House party": "Fête à la maison", Anniversary: "Anniversaire de couple", Corporate: "Entreprise", "Kids' party": "Fête d'enfants",
  // Languages
  "Français": "Français", English: "Anglais", "Español": "Espagnol",
  // Days
  Mon: "lun", Tue: "mar", Wed: "mer", Thu: "jeu", Fri: "ven", Sat: "sam", Sun: "dim",
  // Equipment
  "PA / sound system": "Système de son", Microphones: "Micros", "Drum kit": "Batterie", "Amps (backline)": "Amplis (backline)", "Stage lighting": "Éclairage de scène",
  "Piano / keyboard": "Piano / clavier", "Sound technician": "Technicien de son", "Parking for load-in": "Stationnement pour le déchargement",
  // Fees and other free-form defaults
  "On request": "Sur demande", "Prefer not to say": "Sur demande",
  // Big event categories (Ticketmaster)
  Festival: "Festival", Concert: "Concert", Family: "Famille", Theatre: "Théâtre", Event: "Événement",
  // Link labels
  Website: "Site Web", Music: "Musique",
};

export function label(lang: Lang, value: string) {
  return lang === "fr" ? FR[value] ?? value : value;
}

export const labels = (lang: Lang, values: string[]) => values.map((v) => label(lang, v));
