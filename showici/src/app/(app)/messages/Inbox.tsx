"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, PlayIcon, toneClass } from "@/components/ui";
import { markConversationRead, maskContactInfo, reportConversation, sendMessage, setEmailOnMessage, startConversation } from "@/lib/actions";
import { getBrowserSupabase } from "@/lib/supabase/client";
import type { Message, Thread } from "@/lib/types";

const notice: Message = {
  id: "notice",
  fromMe: false,
  kind: "notice",
  text: "Phone numbers and emails are hidden to keep your conversation on ShowIci. Payment is agreed directly between you.",
};

// Sample conversation shown in demo mode only.
const demoMessages: Message[] = [
  { id: "m1", fromMe: true, text: "Hi! We have Friday, Oct 23 open. Would you play two sets, 9 to 11 pm?" },
  { id: "m2", fromMe: false, text: "Yes, we're free that night! We bring our own PA. Our usual fee is in the range on our profile." },
  { id: "m3", fromMe: false, text: "You can reach me at [phone hidden]" },
  notice,
];

interface Props {
  live: boolean;
  meId: string;
  threads: Thread[];
  activeId: string | null;
  messages: Message[];
  startedAt: string | null;
  contactsLeft: number | null;
  /** Whether this person gets an email when someone messages them. */
  emailOnMessage?: boolean;
  /** Set when starting a new conversation (e.g. replying to an event request). */
  newTo: { id: string; name: string; context: string; requestId?: string } | null;
}

export function Inbox({ live, meId, threads, activeId, messages: initial, startedAt, contactsLeft, emailOnMessage = true, newTo }: Props) {
  const router = useRouter();
  const [demoActive, setDemoActive] = useState(threads[0]);
  const [messages, setMessages] = useState<Message[]>(live ? initial : demoMessages);
  const [draft, setDraft] = useState("");
  const [proposing, setProposing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const [emailOn, setEmailOn] = useState(emailOnMessage);

  const thread = live ? threads.find((t) => t.id === activeId) : demoActive;
  const header = newTo
    ? { name: newTo.name, initials: newTo.name.slice(0, 1).toUpperCase(), tone: "ph-2" as const, subtitle: newTo.context }
    : thread
      ? { name: thread.name, initials: thread.initials, tone: thread.tone, subtitle: thread.subtitle ?? "Band · Rock covers · Montréal" }
      : null;

  // New messages from the other person appear without a reload. While a conversation is
  // on screen it counts as read, so no "new message" email goes out for it.
  useEffect(() => {
    if (!live || !activeId) return;
    const sb = getBrowserSupabase();
    if (!sb) return;
    markConversationRead(activeId);
    const keepRead = setInterval(() => {
      if (document.visibilityState === "visible") markConversationRead(activeId);
    }, 120_000);
    const channel = sb
      .channel(`conversation-${activeId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${activeId}` }, (payload) => {
        const m = payload.new as { id: string; sender_id: string; body: string; kind: Message["kind"] };
        setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, { id: m.id, fromMe: m.sender_id === meId, text: m.body, kind: m.kind }]));
        if (m.sender_id !== meId && document.visibilityState === "visible") markConversationRead(activeId);
      })
      .subscribe();
    return () => {
      clearInterval(keepRead);
      sb.removeChannel(channel);
    };
  }, [live, activeId, meId]);

  async function send(text: string, kind: "text" | "proposal" = "text") {
    if (!text.trim() || busy) return;
    const body = maskContactInfo(text.trim());
    setError("");

    if (!live) {
      setMessages((m) => [...m, { id: crypto.randomUUID(), fromMe: true, text: body, kind }]);
      setDraft("");
      return;
    }

    setBusy(true);
    if (newTo) {
      const res = await startConversation(newTo.id, body, newTo.requestId);
      setBusy(false);
      if (!res.ok) return setError(res.error);
      setDraft("");
      router.push(`/messages?c=${res.id}`);
      router.refresh();
      return;
    }
    if (!activeId) return setBusy(false);
    const res = await sendMessage(activeId, body, kind);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setMessages((prev) => (prev.some((x) => x.id === res.id) ? prev : [...prev, { id: res.id ?? crypto.randomUUID(), fromMe: true, text: body, kind }]));
    setDraft("");
    router.refresh(); // updates the thread list preview
  }

  function openThread(t: Thread) {
    if (live) router.push(`/messages?c=${t.id}`);
    else setDemoActive(t);
  }

  async function submitReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const res = await reportConversation({
      subject_id: thread?.otherId ?? null,
      conversation_id: activeId,
      kind: String(f.get("kind")) as "message" | "profile" | "no_show" | "other",
      reason: String(f.get("reason") ?? ""),
    });
    if (!res.ok) return setError(res.error);
    setReporting(false);
    setReported(true);
  }

  const started = startedAt ? new Date(startedAt).toLocaleDateString("en-CA", { month: "short", day: "numeric" }) : null;

  return (
    <div className="flex min-h-[720px] flex-wrap overflow-hidden rounded-[18px] border border-line bg-white">
      <aside className="flex max-w-[340px] flex-[1_1_280px] flex-col border-r border-line">
        <div className="flex flex-col gap-2.5 border-b border-line p-[18px]">
          <h1 className="h-display text-[26px]">Messages</h1>
          <span className="rounded-[10px] bg-brass-tint px-3 py-2 text-[13px] font-bold text-navy-deep">
            {contactsLeft == null ? "Unlimited new contacts during launch" : `${contactsLeft} of 2 new contacts left today`}
          </span>
          {live && (
            <label className="flex items-center gap-2 text-[13px] text-slate">
              <input
                type="checkbox"
                checked={emailOn}
                onChange={async (e) => {
                  const on = e.target.checked;
                  setEmailOn(on);
                  const res = await setEmailOnMessage(on);
                  if (!res.ok) {
                    setEmailOn(!on);
                    setError(res.error);
                  }
                }}
                className="h-4 w-4 accent-navy"
              />
              Email me when I get a new message
            </label>
          )}
        </div>
        {threads.length === 0 && !newTo && <p className="p-[18px] text-sm text-slate">No conversations yet. Contact a performer, venue or event request to start one.</p>}
        {threads.map((t) => {
          const isActive = live ? t.id === activeId && !newTo : demoActive?.id === t.id;
          return (
            <button key={t.id} type="button" onClick={() => openThread(t)} className={`flex gap-3 border-b border-line px-[18px] py-3.5 text-left ${isActive ? "bg-brass-tint" : "bg-white hover:bg-parchment"}`}>
              <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-full font-extrabold ${toneClass[t.tone]}`}>{t.initials}</span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex justify-between gap-2">
                  <strong className="flex items-center gap-1.5">
                    {t.unread && !isActive && <span className="h-2.5 w-2.5 flex-none rounded-full bg-brass" aria-label="New message" />}
                    {t.name}
                  </strong>
                  <span className="hint">{t.when}</span>
                </span>
                <span className={`truncate text-sm ${t.unread && !isActive ? "font-bold text-navy" : "text-slate"}`}>{t.last}</span>
              </span>
            </button>
          );
        })}
      </aside>

      <section className="flex min-w-0 flex-[999_1_420px] flex-col">
        {header ? (
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className={`flex h-11 w-11 items-center justify-center rounded-full font-extrabold ${toneClass[header.tone]}`}>{header.initials}</span>
            <span className="flex-1"><strong>{header.name}</strong><br /><span className="hint">{header.subtitle}</span></span>
            {!live && <Button href="/performers/p1" variant="secondary" className="text-sm">View profile</Button>}
          </div>
        ) : (
          <div className="border-b border-line px-5 py-4 text-slate">Select a conversation</div>
        )}
        <div className="flex flex-1 flex-col gap-3.5 bg-ivory p-5" aria-live="polite">
          {live && header && (
            <div className="max-w-[80%] self-center rounded-xl bg-parchment px-3.5 py-2.5 text-center text-[13px] text-ink-2">{notice.text}</div>
          )}
          {newTo && <div className="self-center text-sm text-muted">Write your first message to {newTo.name}.</div>}
          {messages.map((m) =>
            m.kind === "notice" ? (
              <div key={m.id} className="max-w-[80%] self-center rounded-xl bg-parchment px-3.5 py-2.5 text-center text-[13px] text-ink-2">{m.text}</div>
            ) : m.kind === "proposal" ? (
              <div key={m.id} className={`flex max-w-[70%] flex-col gap-2 rounded-2xl border-2 border-navy bg-white px-4 py-3.5 ${m.fromMe ? "self-end" : "self-start"}`}>
                <strong className="text-brass-dark">Gig proposal</strong><span>{m.text}</span>
                {m.fromMe && header && <span className="hint text-sm">Waiting for {header.name} to confirm</span>}
              </div>
            ) : (
              <div key={m.id} className={`max-w-[70%] px-4 py-3 leading-normal ${m.fromMe ? "self-end rounded-[16px_16px_4px_16px] bg-navy text-white" : "self-start rounded-[16px_16px_16px_4px] border border-line bg-white"}`}>{m.text}</div>
            )
          )}
        </div>
        {error && <div className="border-t border-line bg-red-50 px-4 py-2 text-sm text-red-800">{error}</div>}
        {proposing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              send(`${f.get("date")} · ${f.get("start")} – ${f.get("end")}`, "proposal");
              setProposing(false);
            }}
            className="flex flex-wrap items-end gap-2.5 border-t border-line bg-parchment px-4 py-3"
          >
            <label className="label">Date<input name="date" type="date" required className="input" /></label>
            <label className="label">Start<input name="start" type="time" defaultValue="21:00" className="input" /></label>
            <label className="label">End<input name="end" type="time" defaultValue="23:00" className="input" /></label>
            <Button type="submit">Send proposal</Button>
            <Button variant="secondary" onClick={() => setProposing(false)}>Cancel</Button>
          </form>
        )}
        {header && (
          <form onSubmit={(e) => { e.preventDefault(); send(draft); }} className="flex flex-wrap items-end gap-2.5 border-t border-line px-4 py-3.5">
            {!newTo && <Button variant="secondary" onClick={() => setProposing(true)} className="text-sm">📅 Propose date</Button>}
            <textarea aria-label="Message" rows={1} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }} placeholder="Write a message…" className="input min-h-11 flex-[1_1_240px] resize-none" />
            <Button type="submit" disabled={busy}>{busy ? "Sending…" : "Send"}</Button>
          </form>
        )}
      </section>

      <aside className="flex max-w-[300px] flex-[1_1_240px] flex-col gap-3.5 border-l border-line p-5">
        <strong>About this conversation</strong>
        {live ? (
          <>
            {started && <div className="flex justify-between text-sm"><span className="text-muted">Started</span><span>{started}</span></div>}
            {header?.subtitle && <div className="flex justify-between gap-3 text-sm"><span className="text-muted">With</span><span className="text-right">{header.subtitle}</span></div>}
            <p className="hint text-sm">Agree on the date, set times and fee here. ShowIci takes no commission.</p>
          </>
        ) : (
          <>
            {[["Started", "Oct 5"], ["Their fee", "$300 – $600"], ["Travels", "Up to 50 km"]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm"><span className="text-muted">{k}</span><span>{v}</span></div>
            ))}
            <div className="flex aspect-video items-center justify-center rounded-[10px] bg-navy"><PlayIcon color="#D9A441" /></div>
            <span className="hint">Their featured video</span>
          </>
        )}
        {(!live || (activeId && !newTo)) && (
          <Button href={live ? `/review?c=${activeId}` : "/review"} variant="secondary" className="text-sm">Leave a review after the gig</Button>
        )}
        {live && activeId && !newTo && (
          reported ? (
            <span className="text-sm text-success-ink">Thanks, the ShowIci team will look at it.</span>
          ) : reporting ? (
            <form onSubmit={submitReport} className="flex flex-col gap-2 rounded-xl border border-line p-3">
              <label className="label text-sm">What happened?
                <select name="kind" className="input min-h-9 py-1 text-sm" defaultValue="message">
                  <option value="message">Inappropriate or spam messages</option>
                  <option value="profile">Fake or misleading profile</option>
                  <option value="no_show">Didn&apos;t show up</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <textarea name="reason" rows={3} className="input text-sm" placeholder="Tell us briefly what happened." />
              <div className="flex gap-2"><button type="submit" className="min-h-9 rounded-lg bg-navy px-3 text-sm font-bold text-white">Send report</button><button type="button" onClick={() => setReporting(false)} className="text-sm text-muted">Cancel</button></div>
            </form>
          ) : (
            <button type="button" onClick={() => setReporting(true)} className="self-start text-sm text-muted underline">Report this conversation</button>
          )
        )}
        {!live && <Link href="#" className="text-sm text-muted">Report this conversation</Link>}
      </aside>
    </div>
  );
}
