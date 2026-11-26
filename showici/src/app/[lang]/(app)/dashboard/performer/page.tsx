import { serverTr } from "@/lib/lang-server";
import { fill } from "@/lib/tr";
import { AppHeader } from "@/components/Header";
import Link from "@/components/Link";
import { Button, DateBadge, toneClass } from "@/components/ui";
import { getEventRequests } from "@/lib/data";
import { countConversations, getBookingRequests, getMyPerformer } from "@/lib/dashboard";
import { requireUser } from "@/lib/session";
import { AvailabilityToggle } from "./AvailabilityToggle";
import { BookingRequests } from "./BookingRequests";
import { PromoteKit } from "@/components/Social";
import { SITE_URL } from "@/lib/site";

export const metadata = { title: "Dashboard · ShowIci" };

export default async function PerformerDashboard() {
  const tr = await serverTr();
  const user = await requireUser(["performer"]);
  const allRequests = await getEventRequests();
  const requests = allRequests.slice(0, 3);

  // Demo mode keeps the sample layout. Live mode reads the signed-in performer's own data.
  const [me, conversations, bookings] = user
    ? await Promise.all([getMyPerformer(user.id), countConversations(user.id), getBookingRequests()])
    : [null, 3, []];

  const name = me?.name ?? user?.name ?? "[Band name]";
  const strength = me?.strength ?? (user ? 0 : 85);
  const tip = tr(me?.tip ?? "") || (user ? tr("Create your performer profile to appear in searches.") : tr("Add one more YouTube video to reach 100%."));
  const gigs = me?.gigs ?? (user ? [] : [
    { id: "g1", day: "FRI", date: "16", title: "[Pub name]", sub: "Plateau · 9:00 pm" },
    { id: "g2", day: "SAT", date: "24", title: "Private event", sub: "Laval · 7:00 pm" },
  ]);
  const stats: [string, string][] = [
    ["Conversations", String(conversations)],
    ["Open event requests", String(allRequests.length)],
    ["Booking requests", String(bookings.length)],
    ["Profile", me ? (me.published ? tr("Published") : tr("Draft")) : user ? tr("Not created") : tr("Published")],
  ];

  return (
    <>
      <AppHeader role={user?.role ?? "performer"} name={user?.name ?? "[Band name]"} live={!!user} />
      <main className="min-h-screen bg-sand">
        <div className="wrap flex flex-col gap-6 pb-16 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="h-display text-[38px]">{fill(tr("Welcome back, {name}"), { name })}</h1>
              <p className="mt-1.5 text-slate">
                {me && !me.available ? tr("You're hidden from searches right now.") : fill(tr("You're visible to venues and planners within {km} km."), { km: me?.travelKm ?? 50 })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(me?.published || !user) && <Button href={`/performers/${me?.id ?? "p1"}`} variant="secondary">{tr("View my profile")}</Button>}
              <Button href="/register/performer">{me || !user ? tr("Edit profile") : tr("Create my profile")}</Button>
            </div>
          </div>

          {user && !me && (
            <div className="card flex flex-wrap items-center justify-between gap-4 border-2 border-accent p-5">
              <span><strong>{tr("Finish setting up.")}</strong> {tr("Create your performer profile so venues and planners can find and contact you.")}</span>
              <Button href="/register/performer">{tr("Create my profile")}</Button>
            </div>
          )}

          <BookingRequests requests={bookings} />

          <PromoteKit kind="performer" id={me?.published ? me.id : user ? null : "p1"} siteUrl={SITE_URL} />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            {stats.map(([k, v]) => <div key={k} className="card flex flex-col gap-1.5 p-5"><span className="text-sm text-muted">{tr(k)}</span><span className="h-display text-[34px]">{v}</span></div>)}
          </div>
          <div className="card flex flex-wrap items-center gap-4 p-5">
            <div className="flex flex-[1_1_300px] flex-col gap-2">
              <div className="flex justify-between font-bold"><span>{tr("Profile strength")}</span><span className="text-accent-dark">{strength}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-ink" style={{ width: `${strength}%` }} /></div>
            </div>
            <span className="text-slate">{tip}</span>
            <Button href="/register/performer" variant="secondary">{tr("Improve profile")}</Button>
          </div>
          <div className="flex flex-wrap items-start gap-6">
            <section className="card flex min-w-0 flex-[999_1_520px] flex-col gap-3.5 p-[22px]">
              <div className="flex items-center justify-between"><h2 className="h-display text-[22px]">{tr("Event requests that match you")}</h2><Link href="/requests" className="font-bold no-underline">{tr("See all →")}</Link></div>
              {requests.length === 0 && <p className="border-t border-line pt-3.5 text-slate">{tr("No open event requests right now. New ones will show up here.")}</p>}
              {requests.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center gap-3.5 border-t border-line pt-3.5">
                  <span className={`flex-none rounded-[10px] ${toneClass[r.tone]} px-3 py-2 text-[13px] font-bold`}>{tr(r.type)}</span>
                  <span className="flex flex-[1_1_220px] flex-col gap-0.5"><strong>{tr(r.date)} · {r.city}</strong><span className="text-sm text-muted">{[r.guests, r.wants, r.budget].map(tr).join(" · ")}</span></span>
                  <Button href={`/messages?request=${r.id}`} className="text-sm">{tr("Respond")}</Button>
                </div>
              ))}
            </section>
            <div className="flex max-w-[400px] flex-[1_1_300px] flex-col gap-6">
              <section className="card flex flex-col gap-3 p-[22px]">
                <h2 className="h-display text-[22px]">{tr("Upcoming gigs")}</h2>
                {gigs.length === 0 && <p className="text-slate">{tr("No gigs booked yet.")}</p>}
                {gigs.map((g) => (
                  <div key={g.id} className="flex items-center gap-3"><DateBadge day={tr(g.day)} date={g.date} /><span><strong>{tr(g.title)}</strong><br /><span className="text-sm text-muted">{tr(g.sub)}</span></span></div>
                ))}
              </section>
              <AvailabilityToggle performerId={me?.id} initial={me?.available ?? true} blocked={me?.blockedDates ?? []} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
