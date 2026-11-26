import { serverTr } from "@/lib/lang-server";
import { fill } from "@/lib/tr";
import { AppHeader } from "@/components/Header";
import { Button, toneClass } from "@/components/ui";
import { getEventRequests } from "@/lib/data";
import { requireUser } from "@/lib/session";
import { RequestFilters } from "./RequestFilters";

export const metadata = { title: "Event requests near you · ShowIci" };

export default async function RequestsPage() {
  const tr = await serverTr();
  const user = await requireUser(["performer"]);
  const requests = await getEventRequests();
  return (
    <>
      <AppHeader role={user?.role ?? "performer"} name={user?.name ?? "[Band name]"} live={!!user} />
      <main className="wrap pb-16 pt-8">
        <h1 className="h-display text-[40px]">{tr("Event requests near you")}</h1>
        <p className="mb-[22px] mt-1.5 text-slate">{tr("Private events looking for acts like yours, within your 50 km travel area. Responding uses one of your daily contacts.")}</p>
        <RequestFilters />
        {requests.length === 0 && <p className="card p-6 text-slate">{tr("No open event requests right now. Check back soon.")}</p>}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
          {requests.map((r) => (
            <article key={r.id} className="card flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between gap-2.5"><span className={`rounded-lg px-2.5 py-1 text-[13px] font-bold ${toneClass[r.tone]}`}>{tr(r.type)}</span><span className="hint">{fill(tr("Posted {when}"), { when: r.postedAgo })}</span></div>
              <span className="h-display text-[22px]">{tr(r.date)} · {r.city}</span>
              <span className="leading-normal text-slate">{r.note}</span>
              <div className="flex flex-wrap gap-1.5">{[r.guests, r.wants, r.budget, r.language].map(tr).map((t) => <span key={t} className="rounded-lg bg-sand px-2.5 py-1 text-[13px] text-graphite">{t}</span>)}</div>
              <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line pt-3">
                <span className="hint text-sm">{r.replies ? `${r.replies} performers replied` : ""}</span>
                <Button href={`/messages?request=${r.id}`}>{tr("Respond")}</Button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
