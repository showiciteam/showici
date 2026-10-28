import { NextResponse } from "next/server";
import { getBigEvents } from "@/lib/data";

// Upcoming big events in Québec (Ticketmaster Discovery API, cached for an hour; sample data without a key).
export const revalidate = 3600;

export async function GET() {
  const events = await getBigEvents();
  return NextResponse.json({ source: process.env.TICKETMASTER_API_KEY ? "ticketmaster" : "sample", events });
}
