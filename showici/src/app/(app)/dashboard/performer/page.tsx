import { AppHeader } from "@/components/Header";
import { Button, DateBadge, toneClass } from "@/components/ui";
import { getEventRequests } from "@/lib/data";
import { countConversations, getContactAllowance, getMyPerformer } from "@/lib/dashboard";
import { requireUser } from "@/lib/session";
import { AvailabilityToggle } from "./AvailabilityToggle";

export const metadata = { title: "Dashboard · ShowIci" };

export default async function PerformerDashboard() {
  const user = await requireUser(["performer"]);
  const allRequests = await getEventRequests();
  const requests = allRequests.slice(0, 3);

  // Demo mode keeps the sample layout. Live mode reads the signed-in performer's own data.
  const [me, conversations, contactsLeft] = user
    ? await Promise.all([getMyPerformer(user.id), countConversations(user.id), getContactAllowance(user.id)])
    : [null, 3, 2];

  const name = me?.name ?? user?.name ?? "[Band name]";
  const strength = me?.strength ?? (user ? 0 : 85);
  const tip = me?.tip ?? (user ? "Create your performer profile to appear in searches." : "Add one more YouTube video to reach 100%.");
  const gigs = me?.gigs ?? (user ? [] : [
    { id: "g1", day: "FRI", date: "16", title: "[Pub name]", sub: "Plateau · 9:00 pm" },
    { id: "g2", day: "SAT", date: "24", title: "Private event", sub: "Laval · 7:00 pm" },
  ]);
  const stats: [string, string][] = [
    ["Conversations", String(conversations)],
    ["Open event requests", String(allRequests.length)],
    ["Contacts left today", contactsLeft == null ? "Unlimited" : `${contactsLeft} / 2`],
    ["Profile", me ? (me.published ? "Published" : "Draft") : user ? "Not created" : "Published"],
  ];

  return (
    <>
      <AppHeader role={user?.role ?? "performer"} name={user?.name ?? "[Band name]"} live={!!user} />
      <main className="min-h-screen bg-parchment">
        <div className="wrap flex flex-col gap-6 pb-16 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="h-display text-[38px]">Welcome back, {name}</h1>
              <p className="mt-1.5 text-slate">
                {me && !me.available ? "You're hidden from searches right now." : `You're visible to venues and planners within ${me?.travelKm ?? 50} km.`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(me?.published || !user) && <Button href={`/performers/${me?.id ?? "p1"}`} variant="secondary">View my profile</Button>}
              <Button href="/register/performer">{me || !user ? "Edit profile" : "Create my profile"}</Button>
            </div>
          </div>

          {user && !me && (
            <div className="card flex flex-wrap items-center justify-between gap-4 border-2 border-brass p-5">
              <span><strong>Finish setting up.</strong> Create your performer profile so venues and planners can find and contact you.</span>
              <Button href="/register/performer">Create my profile</Button>
            </div>
          )}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            {stats.map(([k, v]) => <div key={k} className="card flex flex-col gap-1.5 p-5"><span className="text-sm text-muted">{k}</span><span className="h-display text-[34px]">{v}</span></div>)}
          </div>
          <div className="card flex flex-wrap items-center gap-4 p-5">
            <div className="flex flex-[1_1_300px] flex-col gap-2">
              <div className="flex justify-between font-bold"><span>Profile strength</span><span className="text-brass-dark">{strength}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-navy" style={{ width: `${strength}%` }} /></div>
            </div>
            <span className="text-slate">{tip}</span>
            <Button href="/register/performer" variant="secondary">Improve profile</Button>
          </div>
          <div className="flex flex-wrap items-start gap-6">
            <section className="card flex min-w-0 flex-[999_1_520px] flex-col gap-3.5 p-[22px]">
              <div className="flex items-center justify-between"><h2 className="h-display text-[22px]">Event requests that match you</h2><a href="/requests" className="font-bold no-underline">See all →</a></div>
              {requests.length === 0 && <p className="border-t border-line pt-3.5 text-slate">No open event requests right now. New ones will show up here.</p>}
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
                {gigs.length === 0 && <p className="text-slate">No gigs booked yet.</p>}
                {gigs.map((g) => (
                  <div key={g.id} className="flex items-center gap-3"><DateBadge day={g.day} date={g.date} /><span><strong>{g.title}</strong><br /><span className="text-sm text-muted">{g.sub}</span></span></div>
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
