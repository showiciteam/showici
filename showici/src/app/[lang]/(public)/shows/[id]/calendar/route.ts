import { getShow, getVenue } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/** "Add to calendar": an .ics file that opens in Apple Calendar, Google Calendar or Outlook. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const show = await getShow(id);
  if (!show?.startsAt) return new Response("Show not found", { status: 404 });
  const venue = await getVenue(show.venueId);
  const start = new Date(show.startsAt);
  const end = new Date(start.getTime() + 3 * 3600 * 1000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const location = venue ? [venue.name, venue.street, venue.city].filter(Boolean).join(", ") : "";
  const url = `${SITE_URL}/shows/${show.id}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ShowIci//Shows//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${show.id}@showici.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(show.title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(`${show.description ? `${show.description}\n\n` : ""}${show.entry}\n${url}`)}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return new Response(ics, {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="showici-${show.id}.ics"` },
  });
}
