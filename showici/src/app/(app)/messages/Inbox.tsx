"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, PlayIcon, toneClass } from "@/components/ui";
import { maskContactInfo } from "@/lib/actions";
import type { Message, Thread } from "@/lib/types";

const starter: Message[] = [
  { id: "m1", fromMe: true, text: "Hi! We have Friday, Oct 23 open. Would you play two sets, 9 to 11 pm?" },
  { id: "m2", fromMe: false, text: "Yes, we're free that night! We bring our own PA. Our usual fee is in the range on our profile." },
  { id: "m3", fromMe: false, text: "You can reach me at [phone hidden]" },
  { id: "m4", fromMe: false, kind: "notice", text: "Phone numbers and emails are hidden to keep your conversation on ShowIci. Payment is agreed directly between you." },
];

export function Inbox({ threads }: { threads: Thread[] }) {
  const [active, setActive] = useState(threads[0]);
  const [messages, setMessages] = useState<Message[]>(starter);
  const [draft, setDraft] = useState("");
  const [proposing, setProposing] = useState(false);
  const [contactsLeft] = useState(1);

  function send(text: string, kind: Message["kind"] = "text") {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), fromMe: true, text: maskContactInfo(text), kind }]);
    setDraft("");
  }

  return (
    <div className="flex min-h-[720px] flex-wrap overflow-hidden rounded-[18px] border border-line bg-white">
      <aside className="flex max-w-[340px] flex-[1_1_280px] flex-col border-r border-line">
        <div className="flex flex-col gap-2.5 border-b border-line p-[18px]">
          <h1 className="h-display text-[26px]">Messages</h1>
          <span className="rounded-[10px] bg-brass-tint px-3 py-2 text-[13px] font-bold text-navy-deep">{contactsLeft} of 2 new contacts left today</span>
        </div>
        {threads.map((t) => (
          <button key={t.id} type="button" onClick={() => setActive(t)} className={`flex gap-3 border-b border-line px-[18px] py-3.5 text-left ${active.id === t.id ? "bg-brass-tint" : "bg-white hover:bg-parchment"}`}>
            <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-full font-extrabold ${toneClass[t.tone]}`}>{t.initials}</span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex justify-between gap-2"><strong>{t.name}</strong><span className="hint">{t.when}</span></span>
              <span className="truncate text-sm text-slate">{t.last}</span>
            </span>
          </button>
        ))}
      </aside>

      <section className="flex min-w-0 flex-[999_1_420px] flex-col">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className={`flex h-11 w-11 items-center justify-center rounded-full font-extrabold ${toneClass[active.tone]}`}>{active.initials}</span>
          <span className="flex-1"><strong>{active.name}</strong><br /><span className="hint">Band · Rock covers · Montréal</span></span>
          <Button href="/performers/p1" variant="secondary" className="text-sm">View profile</Button>
        </div>
        <div className="flex flex-1 flex-col gap-3.5 bg-ivory p-5" aria-live="polite">
          {messages.map((m) =>
            m.kind === "notice" ? (
              <div key={m.id} className="max-w-[80%] self-center rounded-xl bg-parchment px-3.5 py-2.5 text-center text-[13px] text-ink-2">{m.text}</div>
            ) : m.kind === "proposal" ? (
              <div key={m.id} className="flex max-w-[70%] flex-col gap-2 self-end rounded-2xl border-2 border-navy bg-white px-4 py-3.5">
                <strong className="text-brass-dark">Gig proposal</strong><span>{m.text}</span><span className="hint text-sm">Waiting for {active.name} to confirm</span>
              </div>
            ) : (
              <div key={m.id} className={`max-w-[70%] px-4 py-3 leading-normal ${m.fromMe ? "self-end rounded-[16px_16px_4px_16px] bg-navy text-white" : "self-start rounded-[16px_16px_16px_4px] border border-line bg-white"}`}>{m.text}</div>
            )
          )}
        </div>
        {proposing && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              send(`${f.get("date")} · ${f.get("start")} – ${f.get("end")} · [Your pub]`, "proposal");
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
        <form onSubmit={(e) => { e.preventDefault(); send(draft); }} className="flex flex-wrap items-end gap-2.5 border-t border-line px-4 py-3.5">
          <Button variant="secondary" onClick={() => setProposing(true)} className="text-sm">📅 Propose date</Button>
          <textarea aria-label="Message" rows={1} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }} placeholder="Write a message…" className="input min-h-11 flex-[1_1_240px] resize-none" />
          <Button type="submit">Send</Button>
        </form>
      </section>

      <aside className="flex max-w-[300px] flex-[1_1_240px] flex-col gap-3.5 border-l border-line p-5">
        <strong>About this conversation</strong>
        {[["Started", "Oct 5"], ["Their fee", "$300 – $600"], ["Travels", "Up to 50 km"]].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm"><span className="text-muted">{k}</span><span>{v}</span></div>
        ))}
        <div className="flex aspect-video items-center justify-center rounded-[10px] bg-navy"><PlayIcon color="#D9A441" /></div>
        <span className="hint">Their featured video</span>
        <Button href="/review" variant="secondary" className="text-sm">Leave a review after the gig</Button>
        <Link href="#" className="text-sm text-muted">Report this conversation</Link>
      </aside>
    </div>
  );
}
