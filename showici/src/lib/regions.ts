/**
 * ShowIci covers the province of Québec, with Greater Montréal as the main landing area.
 * Each region is a centre point used to sort and filter search results and to move the map.
 * Keys are used in URLs (?region=quebec), so don't rename them.
 */
export type Region = { key: string; en: string; fr: string; lat: number; lng: number; zoom: number; radiusKm: number };

export const ALL_QUEBEC = "all";
export const DEFAULT_REGION = "montreal";

export const REGIONS: Region[] = [
  { key: "montreal", en: "Greater Montréal", fr: "Grand Montréal", lat: 45.5019, lng: -73.5674, zoom: 10, radiusKm: 50 },
  { key: "quebec", en: "Québec City", fr: "Ville de Québec", lat: 46.8139, lng: -71.208, zoom: 10, radiusKm: 50 },
  { key: "gatineau", en: "Gatineau and Outaouais", fr: "Gatineau et Outaouais", lat: 45.4765, lng: -75.7013, zoom: 10, radiusKm: 50 },
  { key: "sherbrooke", en: "Sherbrooke and Eastern Townships", fr: "Sherbrooke et Estrie", lat: 45.4042, lng: -71.8929, zoom: 10, radiusKm: 60 },
  { key: "trois-rivieres", en: "Trois-Rivières and Mauricie", fr: "Trois-Rivières et Mauricie", lat: 46.3432, lng: -72.5477, zoom: 10, radiusKm: 60 },
  { key: "drummondville", en: "Drummondville and Centre-du-Québec", fr: "Drummondville et Centre-du-Québec", lat: 45.8833, lng: -72.4833, zoom: 10, radiusKm: 50 },
  { key: "laurentides", en: "Laurentides", fr: "Laurentides", lat: 45.95, lng: -74.15, zoom: 9, radiusKm: 60 },
  { key: "lanaudiere", en: "Lanaudière", fr: "Lanaudière", lat: 46.0186, lng: -73.4407, zoom: 9, radiusKm: 50 },
  { key: "saguenay", en: "Saguenay–Lac-Saint-Jean", fr: "Saguenay–Lac-Saint-Jean", lat: 48.4284, lng: -71.0685, zoom: 9, radiusKm: 100 },
  { key: "rimouski", en: "Bas-Saint-Laurent and Gaspésie", fr: "Bas-Saint-Laurent et Gaspésie", lat: 48.4489, lng: -68.5236, zoom: 8, radiusKm: 200 },
  { key: "rouyn-noranda", en: "Abitibi-Témiscamingue", fr: "Abitibi-Témiscamingue", lat: 48.2366, lng: -79.0231, zoom: 8, radiusKm: 150 },
  { key: ALL_QUEBEC, en: "All of Québec", fr: "Tout le Québec", lat: 47.3, lng: -72.5, zoom: 6, radiusKm: 2000 },
];

export function regionFor(key?: string | null): Region {
  return REGIONS.find((r) => r.key === key) ?? REGIONS[0];
}

/** Straight-line distance in km between two points. */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/** Distance from a region's centre, or the stored distance (from Montréal) when coordinates are missing. */
export function kmFrom(region: Region, x: { lat?: number; lng?: number; distanceKm: number }) {
  if (x.lat == null || x.lng == null) return region.key === DEFAULT_REGION ? x.distanceKm : Number.POSITIVE_INFINITY;
  return Math.round(distanceKm(region, { lat: x.lat, lng: x.lng }));
}
