/**
 * ShowIci covers the province of Québec, with Greater Montréal as the main landing area.
 * Each region has a centre point (used to sort results and move the map). Regions around Montréal
 * also list their cities, so a venue in Terrebonne shows up under Lanaudière and one in Blainville
 * under Laurentides, and visitors can drill down from Greater Montréal to a single city.
 * Keys are used in URLs (?region=montreal&area=laval), so don't rename them.
 */
export type Region = { key: string; en: string; fr: string; lat: number; lng: number; zoom: number; radiusKm: number };

/** Official administrative region a city belongs to (shown next to the city name). */
type Admin = "montreal" | "laval" | "monteregie" | "lanaudiere" | "laurentides";
/** Part of Greater Montréal, used to group the drill-down list. Cities outside Greater Montréal have none. */
export type Group = "island" | "laval" | "south" | "north";

export type City = { key: string; name: string; lat: number; lng: number; admin: Admin; group?: Group; zoom?: number; aliases?: string[] };

export const ALL_QUEBEC = "all";
export const DEFAULT_REGION = "montreal";

export const REGIONS: Region[] = [
  { key: "montreal", en: "Greater Montréal", fr: "Grand Montréal", lat: 45.5019, lng: -73.5674, zoom: 10, radiusKm: 50 },
  { key: "quebec", en: "Québec City", fr: "Ville de Québec", lat: 46.8139, lng: -71.208, zoom: 10, radiusKm: 50 },
  { key: "gatineau", en: "Gatineau and Outaouais", fr: "Gatineau et Outaouais", lat: 45.4765, lng: -75.7013, zoom: 10, radiusKm: 50 },
  { key: "sherbrooke", en: "Sherbrooke and Eastern Townships", fr: "Sherbrooke et Estrie", lat: 45.4042, lng: -71.8929, zoom: 10, radiusKm: 60 },
  { key: "trois-rivieres", en: "Trois-Rivières and Mauricie", fr: "Trois-Rivières et Mauricie", lat: 46.3432, lng: -72.5477, zoom: 10, radiusKm: 60 },
  { key: "drummondville", en: "Drummondville and Centre-du-Québec", fr: "Drummondville et Centre-du-Québec", lat: 45.8833, lng: -72.4833, zoom: 10, radiusKm: 50 },
  { key: "monteregie", en: "Montérégie (South Shore)", fr: "Montérégie (Rive-Sud)", lat: 45.45, lng: -73.3, zoom: 9, radiusKm: 70 },
  { key: "laurentides", en: "Laurentides", fr: "Laurentides", lat: 45.8, lng: -74.0, zoom: 9, radiusKm: 60 },
  { key: "lanaudiere", en: "Lanaudière", fr: "Lanaudière", lat: 45.85, lng: -73.5, zoom: 9, radiusKm: 50 },
  { key: "saguenay", en: "Saguenay–Lac-Saint-Jean", fr: "Saguenay–Lac-Saint-Jean", lat: 48.4284, lng: -71.0685, zoom: 9, radiusKm: 100 },
  { key: "rimouski", en: "Bas-Saint-Laurent and Gaspésie", fr: "Bas-Saint-Laurent et Gaspésie", lat: 48.4489, lng: -68.5236, zoom: 8, radiusKm: 200 },
  { key: "rouyn-noranda", en: "Abitibi-Témiscamingue", fr: "Abitibi-Témiscamingue", lat: 48.2366, lng: -79.0231, zoom: 8, radiusKm: 150 },
  { key: ALL_QUEBEC, en: "All of Québec", fr: "Tout le Québec", lat: 47.3, lng: -72.5, zoom: 6, radiusKm: 2000 },
];

export const ADMIN_LABEL: Record<Admin, { en: string; fr: string }> = {
  montreal: { en: "Montréal", fr: "Montréal" },
  laval: { en: "Laval", fr: "Laval" },
  monteregie: { en: "Montérégie", fr: "Montérégie" },
  lanaudiere: { en: "Lanaudière", fr: "Lanaudière" },
  laurentides: { en: "Laurentides", fr: "Laurentides" },
};

export const GROUP_LABEL: Record<Group, { en: string; fr: string }> = {
  island: { en: "Island of Montréal", fr: "Île de Montréal" },
  laval: { en: "Laval", fr: "Laval" },
  south: { en: "South Shore", fr: "Rive-Sud" },
  north: { en: "North Shore", fr: "Rive-Nord" },
};

const c = (key: string, name: string, lat: number, lng: number, admin: Admin, group?: Group, aliases?: string[], zoom?: number): City => ({ key, name, lat, lng, admin, group, aliases, zoom });

/** Cities around Montréal. Boroughs and enclaves are aliases so "Verdun" or "Westmount" count as Montréal. */
export const CITIES: City[] = [
  // Island of Montréal
  c("montreal", "Montréal", 45.5019, -73.5674, "montreal", "island", ["Verdun", "LaSalle", "Lachine", "Saint-Laurent", "Anjou", "Montréal-Nord", "Pierrefonds", "Pierrefonds-Roxboro", "Rivière-des-Prairies", "Pointe-aux-Trembles", "Saint-Léonard", "Outremont", "Westmount", "Mont-Royal", "Ville Mont-Royal", "Town of Mount Royal", "Côte-Saint-Luc", "Hampstead", "Montréal-Ouest", "Montréal-Est", "Montreal"], 11),
  c("west-island", "West Island", 45.46, -73.82, "montreal", "island", ["Pointe-Claire", "Dorval", "Kirkland", "Beaconsfield", "Baie-D'Urfé", "Sainte-Anne-de-Bellevue", "Senneville", "Dollard-des-Ormeaux", "L'Île-Bizard"], 12),
  // Laval
  c("laval", "Laval", 45.5869, -73.75, "laval", "laval", ["Chomedey", "Sainte-Dorothée", "Fabreville", "Sainte-Rose", "Vimont", "Auteuil", "Pont-Viau", "Laval-des-Rapides", "Duvernay"], 11),
  // South Shore (Montérégie)
  c("longueuil", "Longueuil", 45.5312, -73.5181, "monteregie", "south", ["Saint-Hubert", "Greenfield Park", "LeMoyne", "Vieux-Longueuil"], 12),
  c("brossard", "Brossard", 45.4584, -73.4659, "monteregie", "south", undefined, 13),
  c("saint-lambert", "Saint-Lambert", 45.5009, -73.5068, "monteregie", "south", undefined, 13),
  c("boucherville", "Boucherville", 45.5911, -73.4365, "monteregie", "south", undefined, 13),
  c("saint-bruno", "Saint-Bruno-de-Montarville", 45.5336, -73.3497, "monteregie", "south", ["Saint-Bruno"], 13),
  c("varennes", "Varennes", 45.6833, -73.4333, "monteregie", "south", undefined, 13),
  c("sainte-julie", "Sainte-Julie", 45.5833, -73.3333, "monteregie", "south", undefined, 13),
  c("chambly", "Chambly", 45.4503, -73.2878, "monteregie", "south", ["Carignan"], 13),
  c("beloeil", "Beloeil", 45.5667, -73.2, "monteregie", "south", ["Mont-Saint-Hilaire", "McMasterville"], 13),
  c("la-prairie", "La Prairie", 45.4167, -73.5, "monteregie", "south", ["Candiac", "Delson", "Sainte-Catherine", "Saint-Constant"], 13),
  c("chateauguay", "Châteauguay", 45.3833, -73.75, "monteregie", "south", ["Léry"], 13),
  // North Shore (Lanaudière and Laurentides)
  c("terrebonne", "Terrebonne", 45.7, -73.6333, "lanaudiere", "north", ["Lachenaie", "La Plaine"], 12),
  c("mascouche", "Mascouche", 45.75, -73.6, "lanaudiere", "north", undefined, 13),
  c("repentigny", "Repentigny", 45.7422, -73.45, "lanaudiere", "north", ["Le Gardeur", "Charlemagne"], 13),
  c("blainville", "Blainville", 45.6667, -73.8833, "laurentides", "north", undefined, 13),
  c("boisbriand", "Boisbriand", 45.6167, -73.8333, "laurentides", "north", undefined, 13),
  c("sainte-therese", "Sainte-Thérèse", 45.6333, -73.85, "laurentides", "north", ["Rosemère", "Lorraine", "Bois-des-Filion"], 13),
  c("saint-eustache", "Saint-Eustache", 45.565, -73.905, "laurentides", "north", ["Deux-Montagnes"], 13),
  c("mirabel", "Mirabel", 45.65, -74.0833, "laurentides", "north", undefined, 12),
  // Same regions, outside Greater Montréal
  c("saint-jean", "Saint-Jean-sur-Richelieu", 45.3071, -73.2626, "monteregie", undefined, ["Saint-Jean"], 12),
  c("saint-hyacinthe", "Saint-Hyacinthe", 45.6307, -72.957, "monteregie", undefined, undefined, 12),
  c("granby", "Granby", 45.4, -72.7333, "monteregie", undefined, undefined, 12),
  c("vaudreuil", "Vaudreuil-Dorion", 45.4, -74.0333, "monteregie", undefined, ["Vaudreuil", "Pincourt", "L'Île-Perrot"], 12),
  c("valleyfield", "Salaberry-de-Valleyfield", 45.25, -74.1333, "monteregie", undefined, ["Valleyfield"], 12),
  c("sorel-tracy", "Sorel-Tracy", 46.0333, -73.1167, "monteregie", undefined, ["Sorel"], 12),
  c("joliette", "Joliette", 46.0167, -73.45, "lanaudiere", undefined, undefined, 12),
  c("lassomption", "L'Assomption", 45.8333, -73.4167, "lanaudiere", undefined, undefined, 13),
  c("saint-jerome", "Saint-Jérôme", 45.7803, -74.0036, "laurentides", undefined, undefined, 12),
  c("saint-sauveur", "Saint-Sauveur", 45.8833, -74.1667, "laurentides", undefined, undefined, 13),
  c("sainte-agathe", "Sainte-Agathe-des-Monts", 46.05, -74.2833, "laurentides", undefined, undefined, 12),
  c("mont-tremblant", "Mont-Tremblant", 46.1185, -74.5962, "laurentides", undefined, undefined, 12),
];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/^(st|ste)[-\s.]+/, (m) => (m.startsWith("ste") ? "sainte-" : "saint-")).replace(/[^a-z0-9]+/g, "");
const LOOKUP = new Map<string, City>();
for (const city of CITIES) for (const n of [city.name, city.key, ...(city.aliases ?? [])]) LOOKUP.set(norm(n), city);

/** The known city for a free-text city ("Montréal, QC", "Verdun", "Ste-Thérèse"), if any. */
export function cityOf(name?: string | null): City | undefined {
  if (!name) return undefined;
  return LOOKUP.get(norm(name.split(",")[0]));
}

export function regionFor(key?: string | null): Region {
  return REGIONS.find((r) => r.key === key) ?? REGIONS[0];
}

/** Cities a visitor can drill down to inside a region (Greater Montréal: grouped by shore). Empty for other regions. */
export function citiesIn(region: Region): City[] {
  if (region.key === DEFAULT_REGION) return CITIES.filter((x) => x.group);
  return CITIES.filter((x) => x.admin === region.key);
}

export function cityFor(region: Region, key?: string | null): City | null {
  return citiesIn(region).find((x) => x.key === key) ?? null;
}

/** Whether a region is defined by its list of cities (no distance slider needed). */
export const hasCityList = (region: Region) => citiesIn(region).length > 0;

/** Straight-line distance in km between two points. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/** Distance from a point (region or city centre), or the stored distance (from Montréal) when coordinates are missing. */
export function kmFrom(from: { key: string; lat: number; lng: number }, x: { lat?: number; lng?: number; distanceKm: number }) {
  if (x.lat == null || x.lng == null) return from.key === DEFAULT_REGION || from.key === "montreal" ? x.distanceKm : Number.POSITIVE_INFINITY;
  return Math.round(distanceKm(from, { lat: x.lat, lng: x.lng }));
}

/**
 * Is a venue or performer in the chosen region (and city, when the visitor drilled down)?
 * Known cities are matched by region; anything else falls back to distance from the region's centre.
 */
export function inArea(region: Region, city: City | null, radius: number, x: { city?: string; lat?: number; lng?: number; distanceKm: number }) {
  if (region.key === ALL_QUEBEC) return true;
  const known = cityOf(x.city);
  if (city) return known ? known.key === city.key : kmFrom(city, x) <= 5;
  if (known && hasCityList(region)) return region.key === DEFAULT_REGION ? Boolean(known.group) : known.admin === region.key;
  if (known) return false; // a city we know around Montréal is never in, say, Québec City
  return kmFrom(region, x) <= (hasCityList(region) ? region.radiusKm : radius);
}

/** "Chomedey, Laval" or "Vieux-Terrebonne, Terrebonne · Lanaudière": neighbourhood, city and (outside Montréal and Laval) its region. */
export function placeLabel(area: string | undefined, cityName: string | undefined, lang: "en" | "fr" = "en") {
  const known = cityOf(cityName);
  const town = cityName || "";
  const local = [area && area !== town ? area : "", town].filter(Boolean).join(", ");
  if (!known || known.admin === "montreal" || known.admin === "laval") return local;
  return `${local} · ${ADMIN_LABEL[known.admin][lang]}`;
}
