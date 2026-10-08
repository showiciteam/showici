// Dates and times are entered in Montréal time; the database stores UTC.
export const TZ = "America/Toronto";

/** Offset of Montréal from UTC at a given moment, in minutes (e.g. -240 in summer, -300 in winter). */
function offsetMinutes(at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(at)
    .reduce<Record<string, string>>((a, p) => ((a[p.type] = p.value), a), {});
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** "2026-10-23" + "21:00" in Montréal → ISO string in UTC. */
export function montrealToISO(date: string, time: string) {
  const guess = new Date(`${date}T${time || "00:00"}:00Z`);
  const off = offsetMinutes(guess);
  return new Date(guess.getTime() - off * 60000).toISOString();
}

/** ISO string → { date: "YYYY-MM-DD", time: "HH:MM" } in Montréal. */
export function isoToMontreal(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-CA", { timeZone: TZ }),
    time: d.toLocaleTimeString("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }),
  };
}
