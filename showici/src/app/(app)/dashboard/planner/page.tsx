import { AppHeader } from "@/components/Header";
import { Button } from "@/components/ui";
import { getMyRequests } from "@/lib/dashboard";
import { requireUser } from "@/lib/session";
import { RequestStatus } from "./RequestStatus";

export const metadata = { title: "My events · ShowIci" };

const badge = { open: "bg-success text-success-ink", booked: "bg-brass-tint text-navy-deep", closed: "bg-line text-muted" };

export default async function PlannerDashboard() {
  const user = await requireUser(["planner"]);
  const requests = user ? await getMyRequests(user.id) : [];

  return (
    <>
      <AppHeader role={user?.role ?? "planner"} name={user?.name ?? "[Your name]"} live={!!user} />
      <main className="min-h-screen bg-parchment">
        <div className="wrap flex flex-col gap-6 pb-16 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="h-display text-[38px]">My events</h1>
              <p className="mt-1.5 text-slate">Performers who match your request message you here. Compare them in Messages, then mark the request booked.</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button href="/performers" variant="secondary">Browse performers</Button>
              <Button href="/request">+ New event request</Button>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="card flex flex-col items-start gap-3 p-6">
              <strong className="text-lg">You haven&apos;t posted an event yet.</strong>
              <span className="text-slate">Describe your party, wedding or quinceañera once and matching performers will message you.</span>
              <Button href="/request">Post my event</Button>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
              {requests.map((r) => (
                <article key={r.id} className="card flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="rounded-lg bg-parchment px-2.5 py-1 text-[13px] font-bold">{r.type}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold capitalize ${badge[r.status]}`}>{r.past && r.status === "open" ? "Past" : r.status}</span>
                  </div>
                  <span className="h-display text-[22px]">{r.date}{r.city ? ` · ${r.city}` : ""}</span>
                  <span className="text-sm text-slate">{[r.wants, r.budget].filter(Boolean).join(" · ")}</span>
                  <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line pt-3">
                    <Button href="/messages" variant="secondary" className="text-sm">{r.replies} {r.replies === 1 ? "reply" : "replies"} → Messages</Button>
                    <RequestStatus id={r.id} status={r.status} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
