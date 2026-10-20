/**
 * ShowIci covers the province of Québec, with Greater Montréal as the main landing area.
 * Each region is a centre point used to sort and filter search results and to move the map.
 * Keys are used in URLs (?region=quebec), so don't rename them.
 */
export type Region = { key: string; en: string; fr: string; lat: number; lng: number; zoom: number; radiusKm: number };
