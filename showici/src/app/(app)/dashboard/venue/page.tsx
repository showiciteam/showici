import Link from "next/link";
import { AppHeader } from "@/components/Header";
import { Button, Placeholder } from "@/components/ui";
import { getPerformers, getShows } from "@/lib/data";

export const metadata = { title: "My shows · ShowIci" };

export default async function VenueDashboard() {
  const [shows, performers] = await Promise.all([getShows(), getPerformers()]);
  const nights: [string, string][] = [["Thu 8", "[Comedian name]"], ["Fri 9", "[Band name]"], ["Sat 10", ""], ["Thu 15", ""], ["Fri 16", "[Band name]"], ["Sat 17", ""], ["Thu 22", "[Comedian name]"], ["Fri 23", ""], ["Sat 24", ""]];

  return (
    <>
      <AppHeader role="venue" name="[Your pub]" />
      <main className="min-h-screen bg-parchment">
        <div className="wrap flex flex-col gap-6 pb-16 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="h-display text-[38px]">[Your pub]</h1><p className="mt-1.5 text-slate">Plan your next nights and keep your listings fresh.</p></div>
            <div className="flex flex-wrap gap-2.5"><Button href="/venues/v1" variant="secondary">View venue page</Button><Button href="/dashboard/venue/post-show">+ Post a show</Button></div>
          </div>

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
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-[15px]">
                  <thead><tr className="text-[13px] text-muted"><th className="px-2 py-2.5">Date</th><th className="px-2 py-2.5">Show</th><th className="px-2 py-2.5">Entry</th><th className="px-2 py-2.5">Status</th><th /></tr></thead>
                  <tbody>
                    {shows.map((s, i) => (
                      <tr key={s.id} className="border-t border-line">
                        <td className="px-2 py-3 font-bold">{s.day} {s.date}</td>
                        <td className="px-2 py-3">{s.title}</td>
                        <td className="px-2 py-3">{s.entry}</td>
                        <td className="px-2 py-3"><span className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold ${i === shows.length - 1 ? "bg-line" : "bg-success text-success-ink"}`}>{i === shows.length - 1 ? "Draft" : "Live"}</span></td>
                        <td className="px-2 py-3 text-right"><Link href="/dashboard/venue/post-show" className="font-bold">Edit</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="card flex max-w-[400px] flex-[1_1_300px] flex-col gap-3 p-[22px]">
              <h2 className="h-display text-[22px]">Saved performers</h2>
              {performers.slice(0, 3).map((p) => (
                <Link key={p.id} href={`/performers/${p.id}`} className="flex items-center gap-3 text-navy no-underline">
                  <Placeholder tone={p.tone} label={p.initials} className="h-[42px] w-[42px] flex-none rounded-full text-navy" />
                  <span><strong>{p.name}</strong><br /><span className="text-sm text-muted">{p.actType} · {p.genres[0]}</span></span>
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
