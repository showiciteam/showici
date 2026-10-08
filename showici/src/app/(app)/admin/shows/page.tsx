import Link from "next/link";
import { getAdminShows } from "@/lib/dashboard";
import { ShowStatusSelect } from "../AdminActions";

export const metadata = { title: "Shows · Admin · ShowIci" };

export default async function AdminShows({ searchParams }: { searchParams: Promise<{ when?: string }> }) {
  const { when = "upcoming" } = await searchParams;
  const all = await getAdminShows();
  const shows = when === "past" ? all.filter((s) => s.past) : when === "all" ? all : all.filter((s) => !s.past).reverse();
  return (
    <>
      <h1 className="h-display text-[34px]">Shows</h1>
      <p className="-mt-3 text-slate">Every show posted by venues, including drafts and cancelled ones. Set a show to Draft to hide it from public listings.</p>
      <div className="flex flex-wrap gap-2">
        {["upcoming", "past", "all"].map((t) => (
          <Link key={t} href={`/admin/shows?when=${t}`} className={`rounded-full px-3.5 py-1.5 text-sm capitalize no-underline ${t === when ? "bg-navy font-bold text-white" : "border border-line-strong bg-white text-navy"}`}>{t}</Link>
        ))}
      </div>
      <section className="card overflow-x-auto p-5">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <thead><tr className="text-[13px] text-muted"><th className="px-2 py-2.5">When</th><th className="px-2 py-2.5">Show</th><th className="px-2 py-2.5">Venue</th><th className="px-2 py-2.5">Entry</th><th className="px-2 py-2.5">Status</th></tr></thead>
          <tbody>
            {shows.length === 0 && <tr><td colSpan={5} className="px-2 py-4 text-slate">No shows here yet.</td></tr>}
            {shows.map((s) => (
              <tr key={s.id} className="border-t border-line">
                <td className="px-2 py-3 font-bold">{s.when}</td>
                <td className="px-2 py-3">{s.status === "live" ? <Link href={`/shows/${s.id}`}>{s.title}</Link> : s.title}</td>
                <td className="px-2 py-3">{s.venue}{s.city ? `, ${s.city}` : ""}</td>
                <td className="px-2 py-3">{s.entry}</td>
                <td className="px-2 py-3"><ShowStatusSelect id={s.id} status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
