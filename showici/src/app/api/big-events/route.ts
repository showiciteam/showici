import { NextResponse } from "next/server";
import { bigEvents } from "@/lib/mock";

// Big events near a point, from the Ticketmaster Discovery API (free key: developer.ticketmaster.com).
// Results are cached for an hour to stay well under the default 5,000 calls/day quota.
// Add your Impact affiliate tracking to `url` once you are accepted into the affiliate program.
export const revalidate = 3600;

export async function GET(req: Request) {
  const key = process.env.TICKETMASTER_API_KEY;
  if (!key) return NextResponse.json({ source: "sample", events: bigEvents });

  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat") ?? "45.5019";
  const lng = searchParams.get("lng") ?? "-73.5674";
  const radius = searchParams.get("radius") ?? "50";
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&geoPoint=${lat},${lng}&radius=${radius}&unit=km&size=24&sort=date,asc&countryCode=CA`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return NextResponse.json({ source: "sample", events: bigEvents });
  const data = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events = (data._embedded?.events ?? []).map((e: any) => ({
    id: e.id,
    category: e.classifications?.[0]?.segment?.name ?? "Event",
    name: e.name,
    venue: e._embedded?.venues?.[0]?.name ?? "",
    date: e.dates?.start?.localDate,
    time: e.dates?.start?.localTime,
    price: e.priceRanges?.[0] ? `From $${Math.round(e.priceRanges[0].min)}` : "",
    image: e.images?.find((i: { ratio: string }) => i.ratio === "16_9")?.url,
    url: e.url,
  }));
  return NextResponse.json({ source: "ticketmaster", events });
}
