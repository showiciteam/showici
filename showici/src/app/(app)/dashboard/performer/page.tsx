import { AppHeader } from "@/components/Header";
import { Button, DateBadge, toneClass } from "@/components/ui";
import { getEventRequests } from "@/lib/data";
import { AvailabilityToggle } from "./AvailabilityToggle";

export const metadata = { title: "Dashboard · ShowIci" };

export default async function PerformerDashboard() {
  const requests = (await getEventRequests()).slice(0, 3);
  const stats = [["Profile views this week", "[N]"], ["Unread messages", "3"], ["New event requests for you", String(requests.length)], ["Contacts left today", "2 / 2"]];

  return (
    <>
      <AppHeader role="performer" name="[Band name]" />
      <main className="min-h-screen bg-parchment">
        <div className="wrap flex flex-col gap-6 pb-16 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="h-display text-[38px]">Welcome back, [Band name]</h1><p className="mt-1.5 text-slate">You&apos;re visible to venues and planners within 50 km.</p></div>
            <div className="flex flex-wrap gap-2.5"><Button href="/performers/p1" variant="secondary">View my profile</Button><Button href="/register/performer">Edit profile</Button></div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            {stats.map(([k, v]) => <div key={k} className="card flex flex-col gap-1.5 p-5"><span className="text-sm text-muted">{k}</span><span className="h-display text-[34px]">{v}</span></div>)}
          </div>
          <div className="card flex flex-wrap items-center gap-4 p-5">
            <div className="flex flex-[1_1_300px] flex-col gap-2">
              <div className="flex justify-between font-bold"><span>Profile strength</span><span className="text-brass-dark">85%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full w-[85%] bg-navy" /></div>
            </div>
            <span className="text-slate">Add one more YouTube video to reach 100%.</span>
            <Button href="/register/performer#videos" variant="secondary">Add a video</Button>
          </div>
          <div className="flex flex-wrap items-start gap-6">
            <section className="card flex min-w-0 flex-[999_1_520px] flex-col gap-3.5 p-[22px]">
              <div className="flex items-center justify-between"><h2 className="h-display text-[22px]">Event requests that match you</h2><a href="/requests" className="font-bold no-underline">See all →</a></div>
              {requests.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center gap-3.5 border-t border-line pt-3.5">
                  <span className={`flex-none rounded-[10px] ${toneClass[r.tone]} px-3 py-2 text-[13px] font-bold`}>{r.type}</span>
                  <span className="flex flex-[1_1_220px] flex-col gap-0.5"><strong>{r.date} · {r.city}</strong><span className="text-sm text-muted">{r.guests} · {r.wants} · {r.budget}</span></span>
                  <Button href={`/messages?request=${r.id}`} className="text-sm">Respond</Button>
                </div>
              ))}
            </section>
            <div className="flex max-w-[400px] flex-[1_1_300px] flex-col gap-6">
              <section className="card flex flex-col gap-3 p-[22px]">
                <h2 className="h-display text-[22px]">Upcoming gigs</h2>
                <div className="flex items-center gap-3"><DateBadge day="FRI" date="16" /><span><strong>[Pub name]</strong><br /><span className="text-sm text-muted">Plateau · 9:00 pm</span></span></div>
                <div className="flex items-center gap-3"><DateBadge day="SAT" date="24" /><span><strong>Private event</strong><br /><span className="text-sm text-muted">Laval · 7:00 pm</span></span></div>
              </section>
              <AvailabilityToggle />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
