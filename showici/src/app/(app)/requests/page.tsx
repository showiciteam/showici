import { AppHeader } from "@/components/Header";
import { Button, toneClass } from "@/components/ui";
import { getEventRequests } from "@/lib/data";
import { RequestFilters } from "./RequestFilters";

export const metadata = { title: "Event requests near you · ShowIci" };

export default async function RequestsPage() {
  const requests = await getEventRequests();
  return (
    <>
      <AppHeader role="performer" name="[Band name]" />
      <main className="wrap pb-16 pt-8">
        <h1 className="h-display text-[40px]">Event requests near you</h1>
        <p className="mb-[22px] mt-1.5 text-slate">Private events looking for acts like yours, within your 50 km travel area. Responding uses one of your daily contacts.</p>
        <RequestFilters />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
          {requests.map((r) => (
            <article key={r.id} className="card flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between gap-2.5"><span className={`rounded-lg px-2.5 py-1 text-[13px] font-bold ${toneClass[r.tone]}`}>{r.type}</span><span className="hint">Posted {r.postedAgo}</span></div>
              <span className="h-display text-[22px]">{r.date} · {r.city}</span>
              <span className="leading-normal text-slate">{r.note}</span>
              <div className="flex flex-wrap gap-1.5">{[r.guests, r.wants, r.budget, r.language].map((t) => <span key={t} className="rounded-lg bg-parchment px-2.5 py-1 text-[13px] text-ink-2">{t}</span>)}</div>
              <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line pt-3">
                <span className="hint text-sm">{r.replies} performers replied</span>
                <Button href={`/messages?request=${r.id}`}>Respond</Button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
