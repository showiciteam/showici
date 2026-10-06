import { Logo } from "@/components/Logo";
import { getPerformers, getVenues } from "@/lib/data";
import { AdminActions, LimitsSwitch } from "./AdminActions";

export const metadata = { title: "Admin · ShowIci" };

const reports = [
  { kind: "Message", who: "[User name]", by: "[Venue name]", when: "2 h ago", why: "Sharing phone numbers to avoid the platform" },
  { kind: "Profile", who: "[Performer name]", by: "[Planner name]", when: "yesterday", why: "Videos are not of this act" },
  { kind: "No-show", who: "[Performer name]", by: "[Pub name]", when: "2 days ago", why: "Did not show up for a confirmed gig" },
];

export default async function AdminPage() {
  const [performers, venues] = await Promise.all([getPerformers(), getVenues()]);
  const stats = [["Venues", venues.length], ["Performers", performers.length], ["Event planners", "[N]"], ["Messages this week", "[N]"], ["Shows posted", "[N]"]];
  return (
    <div className="flex min-h-screen flex-wrap bg-parchment">
      <nav aria-label="Admin" className="flex max-w-[240px] flex-[1_1_220px] flex-col gap-1 bg-navy px-3 py-5">
        <div className="px-3.5 pb-4"><Logo /></div>
        {["Overview", "Reports", "Verifications", "Users", "Shows", "Event requests", "Settings and plan limits"].map((l, i) => (
          <a key={l} href="#" className={`rounded-[10px] px-3.5 py-2.5 no-underline ${i === 0 ? "bg-navy-soft font-bold text-white" : "text-on-navy hover:text-white"}`}>{l}</a>
        ))}
      </nav>
      <main className="flex min-w-0 flex-[999_1_640px] flex-col gap-[22px] p-8">
        <h1 className="h-display text-[34px]">Overview</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          {stats.map(([k, v]) => <div key={k} className="card p-[18px]"><span className="text-sm text-muted">{k}</span><div className="h-display text-[30px]">{v}</div></div>)}
        </div>
        <section className="card flex flex-col gap-1 p-5">
          <h2 className="h-display mb-2 text-[22px]">Open reports</h2>
          {reports.map((r) => (
            <div key={r.why} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
              <span className="rounded-full bg-brass-tint px-2.5 py-0.5 text-xs font-bold">{r.kind}</span>
              <span className="flex-[1_1_260px]"><strong>{r.who}</strong> <span className="hint text-sm">reported by {r.by} · {r.when}</span><br /><span className="text-sm text-slate">{r.why}</span></span>
              <AdminActions labels={["View", "Dismiss", "Suspend"]} />
            </div>
          ))}
        </section>
        <section className="card flex flex-col gap-1 p-5">
          <h2 className="h-display mb-2 text-[22px]">Waiting for verification</h2>
          {performers.filter((p) => !p.verified).concat(performers.slice(0, 1)).map((p) => (
            <div key={p.id + "v"} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
              <span className="flex-[1_1_260px]"><strong>{p.name}</strong> <span className="hint text-sm">Performer · phone confirmed, social links added</span></span>
              <AdminActions labels={["Reject", "Verify"]} />
            </div>
          ))}
        </section>
        <LimitsSwitch />
      </main>
    </div>
  );
}
