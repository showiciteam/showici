/**
 * ShowIci covers the province of Québec, with Greater Montréal as the main landing area.
 * Each region has a centre point (used to sort results and move the map). Regions around Montréal,
 * the Outaouais, Estrie, Centre-du-Québec, Saguenay–Lac-Saint-Jean, Abitibi-Témiscamingue, Bas-Saint-Laurent
 * and Gaspésie, the Côte-Nord, Québec City/Charlevoix and the Beauce also list their towns, so a venue in Terrebonne shows up under Lanaudière,
 * one in Maniwaki under the Outaouais even though it's far from Gatineau, and visitors can drill down to a
 * single town. Towns not listed fall back to distance.
 * Keys are used in URLs (?region=montreal&area=laval), so don't rename them.
 */
export type Region = { key: string; en: string; fr: string; lat: number; lng: number; zoom: number; radiusKm: number };

/** Official administrative region a city belongs to (shown next to the city name). */
type Admin = "montreal" | "laval" | "monteregie" | "lanaudiere" | "laurentides" | "gatineau" | "sherbrooke" | "drummondville" | "saguenay" | "rouyn-noranda" | "rimouski" | "gaspesie" | "cote-nord" | "quebec" | "charlevoix" | "levis" | "beauce";
/** The filter region an administrative region is listed under (same key unless noted). */
const REGION_OF: Partial<Record<Admin, string>> = { gaspesie: "rimouski", charlevoix: "quebec", levis: "quebec" };
const regionOf = (admin: Admin) => REGION_OF[admin] ?? admin;
/** Part of Greater Montréal, used to group the drill-down list. Cities outside Greater Montréal have none. */
export type Group = "island" | "laval" | "south" | "north";

export type City = { key: string; name: string; lat: number; lng: number; admin: Admin; group?: Group; zoom?: number; aliases?: string[] };

export const ALL_QUEBEC = "all";
export const DEFAULT_REGION = "montreal";

export const REGIONS: Region[] = [
  { key: "montreal", en: "Greater Montréal", fr: "Grand Montréal", lat: 45.5019, lng: -73.5674, zoom: 10, radiusKm: 50 },
  { key: "quebec", en: "Québec City, Lévis and Charlevoix", fr: "Québec, Lévis et Charlevoix", lat: 46.8139, lng: -71.208, zoom: 9, radiusKm: 60 },
  { key: "beauce", en: "Beauce and Chaudière-Appalaches", fr: "Beauce et Chaudière-Appalaches", lat: 46.25, lng: -70.85, zoom: 9, radiusKm: 80 },
  { key: "gatineau", en: "Gatineau and Outaouais", fr: "Gatineau et Outaouais", lat: 45.4765, lng: -75.7013, zoom: 10, radiusKm: 50 },
  { key: "sherbrooke", en: "Sherbrooke and Eastern Townships", fr: "Sherbrooke et Estrie", lat: 45.4042, lng: -71.8929, zoom: 10, radiusKm: 60 },
  { key: "trois-rivieres", en: "Trois-Rivières and Mauricie", fr: "Trois-Rivières et Mauricie", lat: 46.3432, lng: -72.5477, zoom: 10, radiusKm: 60 },
  { key: "drummondville", en: "Drummondville and Centre-du-Québec", fr: "Drummondville et Centre-du-Québec", lat: 45.8833, lng: -72.4833, zoom: 10, radiusKm: 50 },
  { key: "monteregie", en: "Montérégie (South Shore)", fr: "Montérégie (Rive-Sud)", lat: 45.45, lng: -73.3, zoom: 9, radiusKm: 70 },
  { key: "laurentides", en: "Laurentides", fr: "Laurentides", lat: 45.8, lng: -74.0, zoom: 9, radiusKm: 60 },
  { key: "lanaudiere", en: "Lanaudière", fr: "Lanaudière", lat: 45.85, lng: -73.5, zoom: 9, radiusKm: 50 },
  { key: "saguenay", en: "Saguenay–Lac-Saint-Jean", fr: "Saguenay–Lac-Saint-Jean", lat: 48.4284, lng: -71.0685, zoom: 9, radiusKm: 100 },
  { key: "cote-nord", en: "Côte-Nord", fr: "Côte-Nord", lat: 49.4, lng: -67.0, zoom: 7, radiusKm: 250 },
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
  gatineau: { en: "Outaouais", fr: "Outaouais" },
  sherbrooke: { en: "Estrie", fr: "Estrie" },
  drummondville: { en: "Centre-du-Québec", fr: "Centre-du-Québec" },
  saguenay: { en: "Saguenay–Lac-Saint-Jean", fr: "Saguenay–Lac-Saint-Jean" },
  "rouyn-noranda": { en: "Abitibi-Témiscamingue", fr: "Abitibi-Témiscamingue" },
  rimouski: { en: "Bas-Saint-Laurent", fr: "Bas-Saint-Laurent" },
  gaspesie: { en: "Gaspésie–Îles-de-la-Madeleine", fr: "Gaspésie–Îles-de-la-Madeleine" },
  "cote-nord": { en: "Côte-Nord", fr: "Côte-Nord" },
  quebec: { en: "Capitale-Nationale", fr: "Capitale-Nationale" },
  charlevoix: { en: "Charlevoix", fr: "Charlevoix" },
  levis: { en: "Chaudière-Appalaches", fr: "Chaudière-Appalaches" },
  beauce: { en: "Chaudière-Appalaches", fr: "Chaudière-Appalaches" },
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
  c("saint-eustache", "Saint-Eustache", 45.565, -73.905, "laurentides", "north", ["Deux-Montagnes", "Sainte-Marthe-sur-le-Lac", "Saint-Joseph-du-Lac"], 13),
  c("oka", "Oka", 45.4646, -74.0886, "laurentides", "north", ["Saint-Placide", "Pointe-Calumet"], 13),
  c("mirabel", "Mirabel", 45.65, -74.0833, "laurentides", "north", undefined, 12),
  // Same regions, outside Greater Montréal
  c("saint-jean", "Saint-Jean-sur-Richelieu", 45.3071, -73.2626, "monteregie", undefined, ["Saint-Jean"], 12),
  c("saint-hyacinthe", "Saint-Hyacinthe", 45.6307, -72.957, "monteregie", undefined, undefined, 12),
  c("granby", "Granby", 45.4, -72.7333, "monteregie", undefined, undefined, 12),
  c("vaudreuil", "Vaudreuil-Dorion", 45.4, -74.0333, "monteregie", undefined, ["Vaudreuil", "Pincourt", "L'Île-Perrot"], 12),
  c("valleyfield", "Salaberry-de-Valleyfield", 45.25, -74.1333, "monteregie", undefined, ["Valleyfield"], 12),
  c("sorel-tracy", "Sorel-Tracy", 46.0333, -73.1167, "monteregie", undefined, ["Sorel"], 12),
  c("hudson", "Hudson", 45.45, -74.15, "monteregie", undefined, undefined, 13),
  c("sainte-barbe", "Sainte-Barbe", 45.1667, -74.2, "monteregie", undefined, undefined, 13),
  c("acton-vale", "Acton Vale", 45.65, -72.5667, "monteregie", undefined, undefined, 13),
  c("shefford", "Shefford", 45.35, -72.6, "monteregie", undefined, undefined, 13),
  c("joliette", "Joliette", 46.0167, -73.45, "lanaudiere", undefined, ["Saint-Charles-Borromée", "Notre-Dame-des-Prairies"], 12),
  c("lavaltrie", "Lavaltrie", 45.8833, -73.2833, "lanaudiere", undefined, undefined, 13),
  c("saint-jacques", "Saint-Jacques", 45.95, -73.5667, "lanaudiere", undefined, undefined, 13),
  c("rawdon", "Rawdon", 46.05, -73.7167, "lanaudiere", undefined, undefined, 13),
  c("berthierville", "Berthierville", 46.0833, -73.1833, "lanaudiere", undefined, undefined, 13),
  c("saint-jean-de-matha", "Saint-Jean-de-Matha", 46.2333, -73.5333, "lanaudiere", undefined, undefined, 13),
  c("saint-gabriel", "Saint-Gabriel", 46.3, -73.3833, "lanaudiere", undefined, ["Saint-Gabriel-de-Brandon"], 13),
  c("saint-michel-des-saints", "Saint-Michel-des-Saints", 46.6767, -73.9147, "lanaudiere", undefined, undefined, 13),
  c("lassomption", "L'Assomption", 45.8333, -73.4167, "lanaudiere", undefined, undefined, 13),
  c("saint-jerome", "Saint-Jérôme", 45.7803, -74.0036, "laurentides", undefined, undefined, 12),
  c("saint-sauveur", "Saint-Sauveur", 45.8833, -74.1667, "laurentides", undefined, undefined, 13),
  c("sainte-agathe", "Sainte-Agathe-des-Monts", 46.05, -74.2833, "laurentides", undefined, undefined, 12),
  c("mont-tremblant", "Mont-Tremblant", 46.1185, -74.5962, "laurentides", undefined, undefined, 12),
  c("mont-laurier", "Mont-Laurier", 46.5517, -75.4986, "laurentides", undefined, ["Ferme-Neuve", "Lac-des-Écorces"], 12),
  c("val-david", "Val-David", 46.03, -74.2, "laurentides", undefined, undefined, 13),
  c("val-morin", "Val-Morin", 46.0, -74.1833, "laurentides", undefined, undefined, 13),
  c("sainte-adele", "Sainte-Adèle", 45.95, -74.1333, "laurentides", undefined, ["Mont-Rolland"], 13),
  c("prevost", "Prévost", 45.8667, -74.0833, "laurentides", undefined, undefined, 13),
  c("sainte-anne-des-lacs", "Sainte-Anne-des-Lacs", 45.85, -74.1333, "laurentides", undefined, undefined, 13),
  // Outaouais (region "gatineau")
  c("gatineau", "Gatineau", 45.4765, -75.7013, "gatineau", undefined, ["Hull", "Vieux-Hull", "Aylmer", "Buckingham", "Masson-Angers", "Gatineau (Hull)"], 11),
  c("chelsea", "Chelsea", 45.5167, -75.7833, "gatineau", undefined, ["Old Chelsea"], 12),
  c("la-peche", "La Pêche", 45.6417, -75.9083, "gatineau", undefined, ["Wakefield", "Sainte-Cécile-de-Masham"], 12),
  c("pontiac", "Pontiac", 45.5833, -76.1167, "gatineau", undefined, ["Quyon", "Luskville"], 11),
  c("low", "Low", 45.8, -75.95, "gatineau", undefined, undefined, 12),
  c("clarendon", "Clarendon", 45.6333, -76.4833, "gatineau", undefined, ["Shawville"], 12),
  c("sheenboro", "Sheenboro", 45.9703, -77.2325, "gatineau", undefined, undefined, 12),
  c("montebello", "Montebello", 45.65, -74.9333, "gatineau", undefined, undefined, 13),
  c("maniwaki", "Maniwaki", 46.3833, -75.9667, "gatineau", undefined, undefined, 12),
  // Estrie (region "sherbrooke")
  c("sherbrooke", "Sherbrooke", 45.4042, -71.8929, "sherbrooke", undefined, ["Lennoxville", "Fleurimont", "Rock Forest"], 11),
  c("magog", "Magog", 45.2667, -72.15, "sherbrooke", undefined, ["Orford"], 12),
  c("north-hatley", "North Hatley", 45.2833, -71.9667, "sherbrooke", undefined, ["Hatley", "Ayer's Cliff"], 13),
  c("coaticook", "Coaticook", 45.1333, -71.8, "sherbrooke", undefined, undefined, 12),
  c("lac-brome", "Lac-Brome", 45.2167, -72.5167, "sherbrooke", undefined, ["Knowlton"], 12),
  c("sutton", "Sutton", 45.1053, -72.6153, "sherbrooke", undefined, undefined, 13),
  c("bromont", "Bromont", 45.3167, -72.65, "sherbrooke", undefined, undefined, 12),
  c("waterloo", "Waterloo", 45.35, -72.5167, "sherbrooke", undefined, undefined, 13),
  c("eastman", "Eastman", 45.3, -72.3167, "sherbrooke", undefined, undefined, 13),
  c("richmond", "Richmond", 45.6623, -72.1438, "sherbrooke", undefined, undefined, 13),
  c("valcourt", "Valcourt", 45.5, -72.3167, "sherbrooke", undefined, undefined, 13),
  c("saint-camille", "Saint-Camille", 45.6837, -71.7037, "sherbrooke", undefined, undefined, 13),
  c("east-angus", "East Angus", 45.4833, -71.6667, "sherbrooke", undefined, undefined, 13),
  c("cookshire-eaton", "Cookshire-Eaton", 45.4167, -71.6333, "sherbrooke", undefined, ["Cookshire"], 12),
  c("stanstead", "Stanstead", 45.0167, -72.1, "sherbrooke", undefined, ["Rock Island"], 13),
  // Centre-du-Québec (region "drummondville"). Nicolet and Bécancour are left to distance so they still show near Trois-Rivières.
  c("drummondville", "Drummondville", 45.8833, -72.4833, "drummondville", undefined, undefined, 12),
  c("victoriaville", "Victoriaville", 46.05, -71.9667, "drummondville", undefined, ["Arthabaska"], 12),
  c("plessisville", "Plessisville", 46.2167, -71.7667, "drummondville", undefined, undefined, 13),
  c("warwick", "Warwick", 45.95, -71.9833, "drummondville", undefined, undefined, 13),
  c("kingsey-falls", "Kingsey Falls", 45.85, -72.0667, "drummondville", undefined, undefined, 13),
  c("tingwick", "Tingwick", 45.8833, -71.95, "drummondville", undefined, undefined, 13),
  // Saguenay–Lac-Saint-Jean (region "saguenay")
  c("saguenay", "Saguenay", 48.4284, -71.0685, "saguenay", undefined, ["Chicoutimi", "Jonquière", "Arvida", "La Baie", "Kénogami"], 11),
  c("alma", "Alma", 48.55, -71.65, "saguenay", undefined, undefined, 12),
  c("saint-felicien", "Saint-Félicien", 48.65, -72.45, "saguenay", undefined, undefined, 12),
  c("dolbeau-mistassini", "Dolbeau-Mistassini", 48.8833, -72.2333, "saguenay", undefined, ["Dolbeau", "Mistassini"], 12),
  c("roberval", "Roberval", 48.5167, -72.2333, "saguenay", undefined, undefined, 12),
  c("hebertville", "Hébertville", 48.4, -71.6833, "saguenay", undefined, undefined, 13),
  c("saint-gedeon", "Saint-Gédéon", 48.5, -71.7667, "saguenay", undefined, undefined, 13),
  c("saint-fulgence", "Saint-Fulgence", 48.45, -70.9, "saguenay", undefined, undefined, 13),
  c("lanse-saint-jean", "L'Anse-Saint-Jean", 48.2333, -70.2, "saguenay", undefined, undefined, 13),
  // Abitibi-Témiscamingue (region "rouyn-noranda")
  c("rouyn-noranda", "Rouyn-Noranda", 48.2366, -79.0231, "rouyn-noranda", undefined, ["Noranda", "Évain", "Cadillac"], 12),
  c("val-dor", "Val-d'Or", 48.0975, -77.7828, "rouyn-noranda", undefined, undefined, 12),
  c("amos", "Amos", 48.5667, -78.1167, "rouyn-noranda", undefined, undefined, 12),
  c("la-sarre", "La Sarre", 48.8, -79.2, "rouyn-noranda", undefined, undefined, 13),
  c("ville-marie", "Ville-Marie", 47.3333, -79.4333, "rouyn-noranda", undefined, undefined, 13),
  c("temiscaming", "Témiscaming", 46.7167, -79.1, "rouyn-noranda", undefined, undefined, 13),
  c("malartic", "Malartic", 48.1333, -78.1333, "rouyn-noranda", undefined, undefined, 13),
  c("senneterre", "Senneterre", 48.3833, -77.2333, "rouyn-noranda", undefined, undefined, 13),
  c("macamic", "Macamic", 48.75, -79.0, "rouyn-noranda", undefined, undefined, 13),
  // Bas-Saint-Laurent (region "rimouski")
  c("rimouski", "Rimouski", 48.4489, -68.5236, "rimouski", undefined, ["Le Bic", "Bic", "Pointe-au-Père", "Sainte-Blandine"], 12),
  c("riviere-du-loup", "Rivière-du-Loup", 47.8333, -69.5333, "rimouski", undefined, undefined, 12),
  c("matane", "Matane", 48.85, -67.5333, "rimouski", undefined, undefined, 12),
  c("amqui", "Amqui", 48.4667, -67.4333, "rimouski", undefined, undefined, 13),
  c("mont-joli", "Mont-Joli", 48.5833, -68.1833, "rimouski", undefined, undefined, 13),
  c("trois-pistoles", "Trois-Pistoles", 48.1167, -69.1833, "rimouski", undefined, undefined, 13),
  c("la-pocatiere", "La Pocatière", 47.3667, -70.0333, "rimouski", undefined, undefined, 13),
  c("kamouraska", "Kamouraska", 47.5667, -69.8667, "rimouski", undefined, undefined, 13),
  c("saint-andre-de-kamouraska", "Saint-André-de-Kamouraska", 47.6667, -69.7333, "rimouski", undefined, undefined, 13),
  c("saint-pascal", "Saint-Pascal", 47.5333, -69.8, "rimouski", undefined, undefined, 13),
  c("cacouna", "Cacouna", 47.9167, -69.5, "rimouski", undefined, undefined, 13),
  c("temiscouata-sur-le-lac", "Témiscouata-sur-le-Lac", 47.6833, -68.8833, "rimouski", undefined, ["Cabano", "Notre-Dame-du-Lac"], 13),
  c("sainte-flavie", "Sainte-Flavie", 48.6, -68.2333, "rimouski", undefined, undefined, 13),
  c("causapscal", "Causapscal", 48.3667, -67.2333, "rimouski", undefined, undefined, 13),
  // Gaspésie–Îles-de-la-Madeleine (listed under the "rimouski" region)
  c("gaspe", "Gaspé", 48.8333, -64.4833, "gaspesie", undefined, undefined, 12),
  c("perce", "Percé", 48.5244, -64.2133, "gaspesie", undefined, ["L'Anse-à-Beaufils"], 13),
  c("carleton-sur-mer", "Carleton-sur-Mer", 48.1, -66.1333, "gaspesie", undefined, ["Carleton"], 13),
  c("maria", "Maria", 48.1667, -65.9833, "gaspesie", undefined, undefined, 13),
  c("new-richmond", "New Richmond", 48.1667, -65.8667, "gaspesie", undefined, undefined, 13),
  c("bonaventure", "Bonaventure", 48.05, -65.4833, "gaspesie", undefined, undefined, 13),
  c("paspebiac", "Paspébiac", 48.0333, -65.25, "gaspesie", undefined, undefined, 13),
  c("chandler", "Chandler", 48.35, -64.6833, "gaspesie", undefined, undefined, 13),
  c("grande-riviere", "Grande-Rivière", 48.4, -64.5, "gaspesie", undefined, undefined, 13),
  c("sainte-anne-des-monts", "Sainte-Anne-des-Monts", 49.1333, -66.4833, "gaspesie", undefined, undefined, 13),
  c("cap-chat", "Cap-Chat", 49.1, -66.6833, "gaspesie", undefined, undefined, 13),
  c("petite-vallee", "Petite-Vallée", 49.2167, -65.0333, "gaspesie", undefined, ["Cloridorme"], 13),
  c("iles-de-la-madeleine", "Les Îles-de-la-Madeleine", 47.3833, -61.85, "gaspesie", undefined, ["Îles-de-la-Madeleine", "Cap-aux-Meules", "Havre-Aubert", "L'Étang-du-Nord", "Grande-Entrée"], 11),
  // Québec City and area (region "quebec"; Lévis and Charlevoix are listed there too)
  c("quebec", "Québec", 46.8139, -71.208, "quebec", undefined, ["Québec City", "Ville de Québec", "Quebec City", "Sainte-Foy", "Sillery", "Beauport", "Charlesbourg", "Limoilou", "Cap-Rouge", "Loretteville", "Val-Bélair", "Vanier"], 11),
  c("lancienne-lorette", "L'Ancienne-Lorette", 46.7944, -71.35, "quebec", undefined, undefined, 13),
  c("saint-augustin-de-desmaures", "Saint-Augustin-de-Desmaures", 46.7333, -71.4667, "quebec", undefined, ["Saint-Augustin"], 13),
  c("wendake", "Wendake", 46.8667, -71.35, "quebec", undefined, undefined, 13),
  c("stoneham", "Stoneham-et-Tewkesbury", 46.9833, -71.3833, "quebec", undefined, ["Stoneham"], 13),
  c("ile-dorleans", "Île d'Orléans", 46.9, -71.0, "quebec", undefined, ["Île-d'Orléans", "Saint-Pierre-de-l'Île-d'Orléans", "Sainte-Pétronille", "Saint-Laurent-de-l'Île-d'Orléans", "Sainte-Famille"], 12),
  c("donnacona", "Donnacona", 46.6833, -71.7333, "quebec", undefined, undefined, 13),
  c("saint-raymond", "Saint-Raymond", 46.9, -71.8333, "quebec", undefined, undefined, 13),
  c("levis", "Lévis", 46.8033, -71.1779, "levis", undefined, ["Saint-Romuald", "Saint-Nicolas", "Charny", "Saint-Jean-Chrysostome", "Pintendre", "Saint-Rédempteur"], 12),
  c("baie-saint-paul", "Baie-Saint-Paul", 47.4419, -70.4986, "charlevoix", undefined, undefined, 13),
  c("la-malbaie", "La Malbaie", 47.6544, -70.1528, "charlevoix", undefined, ["Pointe-au-Pic"], 13),
  c("clermont", "Clermont", 47.6875, -70.2308, "charlevoix", undefined, undefined, 13),
  c("saint-irenee", "Saint-Irénée", 47.5667, -70.2333, "charlevoix", undefined, undefined, 13),
  c("les-eboulements", "Les Éboulements", 47.4833, -70.3167, "charlevoix", undefined, undefined, 13),
  c("isle-aux-coudres", "L'Isle-aux-Coudres", 47.3833, -70.3667, "charlevoix", undefined, ["Île-aux-Coudres", "Isle-aux-Coudres"], 13),
  c("saint-simeon", "Saint-Siméon", 47.8333, -69.8833, "charlevoix", undefined, undefined, 13),
  c("petite-riviere-saint-francois", "Petite-Rivière-Saint-François", 47.3167, -70.5667, "charlevoix", undefined, undefined, 13),
  // Beauce and Chaudière-Appalaches (region "beauce")
  c("saint-georges", "Saint-Georges", 46.1167, -70.6667, "beauce", undefined, undefined, 12),
  c("sainte-marie", "Sainte-Marie", 46.45, -71.0333, "beauce", undefined, undefined, 13),
  c("beauceville", "Beauceville", 46.2167, -70.7833, "beauce", undefined, undefined, 13),
  c("saint-joseph-de-beauce", "Saint-Joseph-de-Beauce", 46.3, -70.8833, "beauce", undefined, undefined, 13),
  c("lac-etchemin", "Lac-Etchemin", 46.4, -70.5, "beauce", undefined, undefined, 13),
  c("thetford-mines", "Thetford Mines", 46.1, -71.3, "beauce", undefined, undefined, 13),
  c("montmagny", "Montmagny", 46.9833, -70.55, "beauce", undefined, undefined, 13),
  // Côte-Nord (region "cote-nord")
  c("baie-comeau", "Baie-Comeau", 49.2167, -68.15, "cote-nord", undefined, ["Hauterive"], 12),
  c("sept-iles", "Sept-Îles", 50.2167, -66.3833, "cote-nord", undefined, undefined, 12),
  c("port-cartier", "Port-Cartier", 50.0333, -66.8667, "cote-nord", undefined, undefined, 13),
  c("tadoussac", "Tadoussac", 48.1444, -69.7167, "cote-nord", undefined, undefined, 14),
  c("les-bergeronnes", "Les Bergeronnes", 48.25, -69.55, "cote-nord", undefined, ["Bergeronnes"], 13),
  c("les-escoumins", "Les Escoumins", 48.35, -69.4, "cote-nord", undefined, ["Escoumins"], 13),
  c("forestville", "Forestville", 48.7333, -69.0833, "cote-nord", undefined, undefined, 13),
  c("havre-saint-pierre", "Havre-Saint-Pierre", 50.2333, -63.6, "cote-nord", undefined, undefined, 13),
  c("natashquan", "Natashquan", 50.1833, -61.8167, "cote-nord", undefined, undefined, 13),
  c("fermont", "Fermont", 52.7833, -67.0833, "cote-nord", undefined, undefined, 13),
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
  return CITIES.filter((x) => regionOf(x.admin) === region.key);
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
  if (known && hasCityList(region)) return region.key === DEFAULT_REGION ? Boolean(known.group) : regionOf(known.admin) === region.key;
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
