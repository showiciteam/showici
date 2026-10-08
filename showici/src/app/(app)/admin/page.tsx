import Link from "next/link";
import { getPerformers, getVenues } from "@/lib/data";
import { getAdminData } from "@/lib/dashboard";
import { getSessionUser } from "@/lib/session";
import { LimitsSwitch, ReportActions, VerifyActions } from "./AdminActions";

export const metadata = { title: "Admin · ShowIci" };

const demoReports = [
  { id: "r1", kind: "Message", who: "[User name]", by: "[Venue name]", when: "2 h ago", why: "Sharing phone numbers to avoid the platform" },
  { id: "r2", kind: "Profile", who: "[Performer name]", by: "[Planner name]", when: "yesterday", why: "Videos are not of this act" },
];

export default async function AdminPage() {
  const user = await getSessionUser();
  const live = user ? await getAdminData() : null;

  let stats: [string, string | number, string][];
  let reports = demoReports;
  let pending: { id: string; name: string; detail: string }[];
  if (live) {
    const s = live.stats;
    stats = [
      ["Venues", s?.venues ?? "–", "/admin/users"],
      ["Performers", s?.performers ?? "–", "/admin/verifications"],
      ["Event planners", s?.planners ?? "–", "/admin/users"],
      ["Messages this week", s?.messages_week ?? "–", "/admin/reports"],
      ["Shows posted", s?.shows ?? "–", "/admin/shows"],
    ];
    reports = live.reports.slice(0, 5);
    pending = live.pending.slice(0, 5);
  } else {
    const [performers, venues] = await Promise.all([getPerformers(), getVenues()]);
    stats = [["Venues", venues.length, "/admin/users"], ["Performers", performers.length, "/admin/verifications"], ["Event planners", "[N]", "/admin/users"], ["Messages this week", "[N]", "/admin/reports"], ["Shows posted", "[N]", "/admin/shows"]];
    pending = performers.filter((p) => !p.verified).map((p) => ({ id: p.id, name: p.name, detail: "Performer" }));
  }

  return (
    <>
      <h1 className="h-display text-[34px]">Overview</h1>
      {live?.setupError && (
        <div className="card border-2 border-brass p-4 text-sm">
          <strong>Database update needed.</strong> Run the SQL files in <code>supabase/migrations</code> in the Supabase SQL Editor. ({live.setupError})
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
        {stats.map(([k, v, href]) => (
          <Link key={k} href={href} className="card p-[18px] text-navy no-underline hover:border-navy">
            <span className="text-sm text-muted">{k}</span>
            <div className="h-display text-[30px]">{v}</div>
          </Link>
        ))}
      </div>
      <section className="card flex flex-col gap-1 p-5">
        <div className="mb-2 flex items-center justify-between"><h2 className="h-display text-[22px]">Open reports</h2><Link href="/admin/reports" className="font-bold no-underline">All reports →</Link></div>
        {reports.length === 0 && <p className="text-slate">No open reports.</p>}
        {reports.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
            <span className="rounded-full bg-brass-tint px-2.5 py-0.5 text-xs font-bold capitalize">{r.kind}</span>
            <span className="flex-[1_1_260px]"><strong>{r.who}</strong> <span className="hint text-sm">reported by {r.by} · {r.when}</span><br /><span className="text-sm text-slate">{r.why}</span></span>
            <ReportActions id={r.id} />
          </div>
        ))}
      </section>
      <section className="card flex flex-col gap-1 p-5">
        <div className="mb-2 flex items-center justify-between"><h2 className="h-display text-[22px]">Waiting for verification</h2><Link href="/admin/verifications" className="font-bold no-underline">All →</Link></div>
        {pending.length === 0 && <p className="text-slate">Nobody is waiting for verification.</p>}
        {pending.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
            <span className="flex-[1_1_260px]"><strong>{p.name}</strong> <span className="hint text-sm">{p.detail}</span></span>
            <VerifyActions id={p.id} />
          </div>
        ))}
      </section>
      <LimitsSwitch initial={live?.limitsOn ?? false} />
    </>
  );
}
