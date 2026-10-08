import Link from "next/link";
import { getAdminReports } from "@/lib/dashboard";
import { ReopenReport, ReportActions } from "../AdminActions";

export const metadata = { title: "Reports · Admin · ShowIci" };

const TABS = ["open", "dismissed", "resolved", "all"] as const;

export default async function AdminReports({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: raw } = await searchParams;
  const status = (TABS as readonly string[]).includes(raw ?? "") ? (raw as (typeof TABS)[number]) : "open";
  const reports = await getAdminReports(status);
  return (
    <>
      <h1 className="h-display text-[34px]">Reports</h1>
      <p className="-mt-3 text-slate">Members report conversations from their inbox. Dismiss a report when no action is needed, or mark it resolved once you have dealt with it.</p>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link key={t} href={`/admin/reports?status=${t}`} className={`rounded-full px-3.5 py-1.5 text-sm capitalize no-underline ${t === status ? "bg-navy font-bold text-white" : "border border-line-strong bg-white text-navy"}`}>{t}</Link>
        ))}
      </div>
      <section className="card flex flex-col gap-1 p-5">
        {reports.length === 0 && <p className="text-slate">No {status === "all" ? "" : status} reports.</p>}
        {reports.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-3 border-t border-line py-3 first:border-t-0">
            <span className="rounded-full bg-brass-tint px-2.5 py-0.5 text-xs font-bold capitalize">{r.kind}</span>
            <span className="flex-[1_1_260px]"><strong>{r.who}</strong> <span className="hint text-sm">reported by {r.by} · {r.when}{status === "all" ? ` · ${r.status}` : ""}</span><br /><span className="text-sm text-slate">{r.why || "No reason given."}</span></span>
            {r.status === "open" ? <ReportActions id={r.id} /> : <ReopenReport id={r.id} />}
          </div>
        ))}
      </section>
    </>
  );
}
