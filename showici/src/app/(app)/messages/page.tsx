import { AppHeader } from "@/components/Header";
import { getEventRequest, getThreads } from "@/lib/data";
import { getContactAllowance, getEmailOnMessage, getInbox, getProfileName, resolveRecipient } from "@/lib/dashboard";
import { requireUser } from "@/lib/session";
import { Inbox } from "./Inbox";

export const metadata = { title: "Messages · ShowIci" };

type Search = { c?: string; request?: string; to?: string };

export default async function MessagesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const user = await requireUser();

  // Demo mode: sample threads, nothing is saved.
  if (!user) {
    const threads = await getThreads();
    return (
      <>
        <AppHeader role="venue" name="[Your pub]" />
        <main className="wrap pb-12 pt-6">
          <Inbox live={false} meId="" threads={threads} activeId={threads[0]?.id ?? null} messages={[]} contactsLeft={1} startedAt={null} newTo={null} />
        </main>
      </>
    );
  }

  const [inbox, contactsLeft, emailOnMessage] = await Promise.all([getInbox(user.id, sp.c), getContactAllowance(user.id), getEmailOnMessage(user.id)]);

  // Starting a new conversation: replying to an event request, or contacting a profile directly.
  let newTo: { id: string; name: string; context: string; requestId?: string } | null = null;
  if (!sp.c) {
    if (sp.request) {
      const req = await getEventRequest(sp.request);
      if (req?.plannerId && req.plannerId !== user.id) {
        const who = await getProfileName(req.plannerId);
        newTo = { id: req.plannerId, name: who?.name ?? "Event planner", context: `${req.type} · ${req.date} · ${req.city}`, requestId: req.id };
      }
    } else if (sp.to) {
      // Profile pages link with the performer or venue id; find the person behind it.
      const who = await resolveRecipient(sp.to);
      if (who && who.id !== user.id) newTo = { id: who.id, name: who.name, context: who.role };
    }
  }

  return (
    <>
      <AppHeader role={user.role} name={user.name} live />
      <main className="wrap pb-12 pt-6">
        <Inbox
          key={newTo ? `new-${newTo.id}` : inbox.activeId ?? "empty"}
          live
          meId={user.id}
          threads={inbox.threads}
          activeId={newTo ? null : inbox.activeId}
          messages={newTo ? [] : inbox.messages}
          startedAt={newTo ? null : inbox.startedAt}
          contactsLeft={contactsLeft}
          emailOnMessage={emailOnMessage}
          newTo={newTo}
        />
      </main>
    </>
  );
}
