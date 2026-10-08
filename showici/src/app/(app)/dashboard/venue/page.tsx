import Link from "next/link";
import { AppHeader } from "@/components/Header";
import { Button, Placeholder } from "@/components/ui";
import { getPerformers, getShows } from "@/lib/data";
import { getMyVenue, getSavedPerformers, nextNights } from "@/lib/dashboard";
import { requireUser } from "@/lib/session";

export const metadata = { title: "My shows · ShowIci" };

type Row = { id: string; day: string; date: string; title: string; entry: string; status: "draft" | "live" | "cancelled" };
const statusStyle = { live: "bg-success text-success-ink", draft: "bg-line", cancelled: "bg-line text-muted line-through" };

export default async function VenueDashboard() {
  const user = await requireUser(["venue"]);
  const [nearby, venue, saved] = await Promise.all([getPerformers(), user ? getMyVenue(user.id) : null, user ? getSavedPerformers(user.id) : []]);
  // Saved performers first; until the venue saves some, suggest performers nearby.
  const sideList = saved.length
    ? saved.map((p) => ({ id: p.id, name: p.name, sub: [p.actType, p.genre].filter(Boolean).join(" · "), initials: p.initials, tone: p.tone }))
    : nearby.slice(0, 3).map((p) => ({ id: p.id, name: p.name, sub: `${p.actType} · ${p.genres[0] ?? ""}`, initials: p.initials, tone: p.tone }));

  // Live mode: this venue's own shows. Demo mode: the sample shows and calendar.
  let name = "[Your pub]";
  let rows: Row[];
  let nights: [string, string][];
  if (user) {
    name = venue?.name ?? user.name;
    rows = venue?.shows ?? [];
    nights = nextNights().map(({ key, label }) => [label, venue?.shows.find((s) => s.key === key && s.status !== "cancelled")?.title ?? ""]);
  } else {
    const shows = await getShows();
    rows = shows.map((s, i) => ({ id: s.id, day: s.day, date: s.date, title: s.title, entry: s.entry, status: i === shows.length - 1 ? "draft" : "live" }));
    nights = [["Thu 8", "[Comedian name]"], ["Fri 9", "[Band name]"], ["Sat 10", ""], ["Thu 15", ""], ["Fri 16", "[Band name]"], ["Sat 17", ""], ["Thu 22", "[Comedian name]"], ["Fri 23", ""], ["Sat 24", ""]];
  }

  return (
    <>
      <AppHeader role={user?.role ?? "venue"} name={user?.name ?? "[Your pub]"} live={!!user} />
      <main className="min-h-screen bg-parchment">
        <div className="wrap flex flex-col gap-6 pb-16 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="h-display text-[38px]">{name}</h1><p className="mt-1.5 text-slate">Plan your next nights and keep your listings fresh.</p></div>
            <div className="flex flex-wrap gap-2.5">
              {(venue?.published || !user) && <Button href={`/venues/${venue?.id ?? "v1"}`} variant="secondary">View venue page</Button>}
              <Button href="/dashboard/venue/post-show">+ Post a show</Button>
            </div>
          </div>

          {user && !venue && (
            <div className="card flex flex-wrap items-center justify-between gap-4 border-2 border-brass p-5">
              <span><strong>Finish setting up.</strong> Add your venue so performers can find you and your shows appear on ShowIci.</span>
              <Button href="/register/venue">Add my venue</Button>
            </div>
          )}

          <section className="card flex flex-col gap-3.5 p-[22px]">
            <h2 className="h-display text-[22px]">Next 3 weeks</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2.5">
              {nights.map(([day, act]) =>
                act ? (
                  <Link key={day} href="/shows" className="flex min-h-[92px] flex-col gap-1 rounded-xl border border-[#E2C98F] bg-brass-tint p-3 text-navy no-underline"><span className="hint font-bold">{day}</span><strong className="text-sm">{act}</strong></Link>
                ) : (
                  <Link key={day} href="/performers" className="flex min-h-[92px] flex-col gap-1 rounded-xl border-2 border-dashed border-line-strong p-3 text-muted no-underline"><span className="text-[13px] font-bold">{day}</span><span className="text-sm font-bold text-brass-dark">+ Book an act</span></Link>
                )
              )}
            </div>
          </section>

          <div className="flex flex-wrap items-start gap-6">
            <section className="card min-w-0 flex-[999_1_520px] p-[22px]">
              <h2 className="h-display mb-2.5 text-[22px]">Posted shows</h2>
              {rows.length === 0 ? (
                <p className="text-slate">No shows yet. <Link href="/dashboard/venue/post-show" className="font-bold">Post your first show</Link> and it will appear on the ShowIci calendar.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-[15px]">
                    <thead><tr className="text-[13px] text-muted"><th className="px-2 py-2.5">Date</th><th className="px-2 py-2.5">Show</th><th className="px-2 py-2.5">Entry</th><th className="px-2 py-2.5">Status</th><th /></tr></thead>
                    <tbody>
                      {rows.map((s) => (
                        <tr key={s.id} className="border-t border-line">
                          <td className="px-2 py-3 font-bold">{s.day} {s.date}</td>
                          <td className="px-2 py-3">{s.title}</td>
                          <td className="px-2 py-3">{s.entry}</td>
                          <td className="px-2 py-3"><span className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold capitalize ${statusStyle[s.status]}`}>{s.status}</span></td>
                          <td className="px-2 py-3 text-right"><Link href={user ? `/dashboard/venue/post-show?id=${s.id}` : "/dashboard/venue/post-show"} className="font-bold">Edit</Link></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
            <section className="card flex max-w-[400px] flex-[1_1_300px] flex-col gap-3 p-[22px]">
              <h2 className="h-display text-[22px]">{saved.length ? "Saved performers" : "Performers near you"}</h2>
              {!saved.length && user && <p className="hint text-sm">Tap ♡ Save on a performer&apos;s page to keep them here.</p>}
              {sideList.map((p) => (
                <Link key={p.id} href={`/performers/${p.id}`} className="flex items-center gap-3 text-navy no-underline">
                  <Placeholder tone={p.tone} label={p.initials} className="h-[42px] w-[42px] flex-none rounded-full text-navy" />
                  <span><strong>{p.name}</strong><br /><span className="text-sm text-muted">{p.sub}</span></span>
                </Link>
              ))}
              <Button href="/performers" variant="secondary">Find more performers</Button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
