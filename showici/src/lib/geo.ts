// Approximate centres for Greater Montréal places, used until a real geocoding API (Mapbox or Google) is added.
const PLACES: Record<string, [number, number]> = {
  "montréal": [45.5019, -73.5674],
  montreal: [45.5019, -73.5674],
  laval: [45.6066, -73.7124],
  longueuil: [45.5312, -73.5181],
  brossard: [45.4584, -73.4659],
  verdun: [45.4544, -73.5698],
  rosemont: [45.5469, -73.5786],
  plateau: [45.5225, -73.5806],
  "mile end": [45.5236, -73.6005],
  ndg: [45.4716, -73.6145],
  griffintown: [45.4927, -73.5604],
  terrebonne: [45.7000, -73.6473],
  "saint-jérôme": [45.7804, -74.0036],
  "saint-jerome": [45.7804, -74.0036],
  "québec": [46.8139, -71.2080],
  quebec: [46.8139, -71.2080],
  ottawa: [45.4215, -75.6972],
  toronto: [43.6532, -79.3832],
  vancouver: [49.2827, -123.1207],
};

/** Returns a PostGIS point string for a city name, defaulting to Montréal. */
export function pointFor(place: string) {
  const key = place.toLowerCase().split(",")[0].trim();
  const [lat, lng] = PLACES[key] ?? PLACES["montréal"];
  return `SRID=4326;POINT(${lng} ${lat})`;
}
