import { Logo } from "@/components/Logo";
import { LogoutButton } from "@/components/Header";
import { getPerformers, getVenues } from "@/lib/data";
import { getAdminData } from "@/lib/dashboard";
import { requireUser } from "@/lib/session";
import { LimitsSwitch, ReportActions, VerifyActions } from "./AdminActions";

export const metadata = { title: "Admin · ShowIci" };

const demoReports = [
  { id: "r1", kind: "Message", who: "[User name]", by: "[Venue name]", when: "2 h ago", why: "Sharing phone numbers to avoid the platform" },
  { id: "r2", kind: "Profile", who: "[Performer name]", by: "[Planner name]", when: "yesterday", why: "Videos are not of this act" },
  { id: "r3", kind: "No-show", who: "[Performer name]", by: "[Pub name]", when: "2 days ago", why: "Did not show up for a confirmed gig" },
];

export default async function AdminPage() {
  const user = await requireUser(["admin"]); // Non-admins are sent to their own dashboard.
  const live = user ? await getAdminData() : null;

  let stats: [string, string | number][];
  let reports = demoReports;
  let pending: { id: string; name: string; detail: string }[];
  if (live) {
    const s = live.stats;
    stats = [["Venues", s?.venues ?? "–"], ["Performers", s?.performers ?? "–"], ["Event planners", s?.planners ?? "–"], ["Messages this week", s?.messages_week ?? "–"], ["Shows posted", s?.shows ?? "–"]];
    reports = live.reports;
    pending = live.pending;
  } else {
    const [performers, venues] = await Promise.all([getPerformers(), getVenues()]);
    stats = [["Venues", venues.length], ["Performers", performers.length], ["Event planners", "[N]"], ["Messages this week", "[N]"], ["Shows posted", "[N]"]];
    pending = performers.filter((p) => !p.verified).map((p) => ({ id: p.id, name: p.name, detail: "Performer · phone confirmed, social links added" }));
  }

  return (
    <div className="flex min-h-screen flex-wrap bg-parchment">
      <nav aria-label="Admin" className="flex max-w-[240px] flex-[1_1_220px] flex-col gap-1 bg-navy px-3 py-5">
        <div className="px-3.5 pb-4"><Logo /></div>
        {["Overview", "Reports", "Verifications", "Users", "Shows", "Event requests", "Settings and plan limits"].map((l, i) => (
          <a key={l} href="#" className={`rounded-[10px] px-3.5 py-2.5 no-underline ${i === 0 ? "bg-navy-soft font-bold text-white" : "text-on-navy hover:text-white"}`}>{l}</a>
        ))}
        {user && <div className="mt-auto px-3.5 pt-6"><span className="mb-2 block truncate text-sm text-on-navy">{user.name}</span><LogoutButton /></div>}
      </nav>
      <main className="flex min-w-0 flex-[999_1_640px] flex-col gap-[22px] p-8">
        <h1 className="h-display text-[34px]">Overview</h1>
        {live?.setupError && (
          <div className="card border-2 border-brass p-4 text-sm">
            <strong>Database update needed.</strong> Run <code>supabase/migrations/002_live_data.sql</code> in the Supabase SQL Editor. ({live.setupError})
          </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          {stats.map(([k, v]) => <div key={k} className="card p-[18px]"><span className="text-sm text-muted">{k}</span><div className="h-display text-[30px]">{v}</div></div>)}
        </div>
        <section className="card flex flex-col gap-1 p-5">
          <h2 className="h-display mb-2 text-[22px]">Open reports</h2>
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
          <h2 className="h-display mb-2 text-[22px]">Waiting for verification</h2>
          {pending.length === 0 && <p className="text-slate">Nobody is waiting for verification.</p>}
          {pending.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
              <span className="flex-[1_1_260px]"><strong>{p.name}</strong> <span className="hint text-sm">{p.detail}</span></span>
              <VerifyActions id={p.id} />
            </div>
          ))}
        </section>
        <LimitsSwitch initial={live?.limitsOn ?? false} />
      </main>
    </div>
  );
}
