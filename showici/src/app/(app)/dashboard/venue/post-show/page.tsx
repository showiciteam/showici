"use client";

import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/components/Header";
import { ChipGroup, Notice } from "@/components/form";
import { Button, DateBadge, Placeholder } from "@/components/ui";
import { insertRow } from "@/lib/actions";

export default function PostShow() {
  const [entry, setEntry] = useState(["Free"]);
  const [performer, setPerformer] = useState("");
  const [genre, setGenre] = useState("Rock covers");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("21:00");
  const [lang, setLang] = useState(["Français"]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);

  const d = date ? new Date(`${date}T12:00`) : null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const res = await insertRow("shows", {
      venue_id: f.get("venueId") || null,
      performer_name: performer,
      title: f.get("title") || performer,
      genre,
      starts_at: `${date}T${time}:00`,
      doors_at: `${date}T${f.get("doors")}:00`,
      entry: entry[0] === "Free" ? "Free entry" : String(f.get("price") || entry[0]),
      ticket_url: f.get("ticketUrl") || null,
      description_fr: f.get("descFr"),
      description_en: f.get("descEn"),
      status: "live",
    });
    setStatus(res.ok
      ? { kind: "ok", msg: res.demo ? "Demo mode: the show looks good. Connect Supabase to publish it for real." : "Your show is live on ShowIci." }
      : { kind: "error", msg: res.error });
  }

  return (
    <>
      <AppHeader role="venue" name="[Your pub]" />
      <main className="min-h-screen bg-parchment">
        <div className="wrap pb-[72px] pt-9">
          <Link href="/dashboard/venue" className="font-bold no-underline">← My shows</Link>
          <h1 className="h-display mt-2.5 text-[40px]">Post an upcoming show</h1>
          <p className="mb-7 mt-2 text-[17px] text-slate">It appears on ShowIci&apos;s public listings and on your venue page.</p>
          <div className="flex flex-wrap items-start gap-7">
            <form onSubmit={submit} className="card flex min-w-0 flex-[999_1_560px] flex-col gap-5 p-7">
              <label className="label">Performer <span className="hint">Search ShowIci, or type a name if they&apos;re not on ShowIci yet.</span>
                <input required value={performer} onChange={(e) => setPerformer(e.target.value)} className="input" placeholder="e.g. [Band name]" list="performers" />
                <datalist id="performers"><option value="[Band name]" /><option value="[Comedian name]" /><option value="[DJ name]" /></datalist>
              </label>
              <label className="label">Show title <span className="hint">Optional</span><input name="title" className="input" placeholder="e.g. 90s Night" /></label>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
                <label className="label">Date<input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="input" /></label>
                <label className="label">Doors<input name="doors" type="time" defaultValue="20:00" className="input" /></label>
                <label className="label">Show starts<input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" /></label>
              </div>
              <ChipGroup legend="Entry" single options={["Free", "Cover charge", "Tickets"]} value={entry} onChange={setEntry} />
              {entry[0] !== "Free" && <label className="label">Price<input name="price" className="input" placeholder="e.g. $10 cover" /></label>}
              {entry[0] === "Tickets" && <label className="label">Ticket link <span className="hint">Eventbrite or any other ticketing page</span><input name="ticketUrl" type="url" className="input" placeholder="https://www.eventbrite.ca/e/…" /></label>}
              <label className="label">Genre<select value={genre} onChange={(e) => setGenre(e.target.value)} className="input"><option>Rock covers</option><option>Blues</option><option>Jazz</option><option>Comedy</option><option>DJ night</option></select></label>
              <div className="flex flex-col gap-2">
                <ChipGroup legend="Description" hint="Write it in both languages" single options={["Français", "English"]} value={lang} onChange={setLang} />
                <textarea name="descFr" rows={3} className={`input ${lang[0] === "Français" ? "" : "hidden"}`} placeholder="Description du spectacle en français." />
                <textarea name="descEn" rows={3} className={`input ${lang[0] === "English" ? "" : "hidden"}`} placeholder="Show description in English." />
              </div>
              {status && <Notice kind={status.kind}>{status.msg}</Notice>}
              <div className="flex flex-wrap justify-end gap-2.5"><Button variant="secondary">Save draft</Button><Button type="submit" className="px-7">Publish show</Button></div>
            </form>
            <aside className="flex max-w-[360px] flex-[1_1_280px] flex-col gap-3">
              <span className="text-[13px] font-bold tracking-[0.06em] text-muted">PREVIEW</span>
              <article className="card overflow-hidden">
                <div className="relative"><Placeholder tone="ph-1" className="h-[170px]" /><span className="absolute bottom-3.5 left-3.5"><DateBadge day={d ? d.toLocaleDateString("en-CA", { weekday: "short" }).toUpperCase() : "FRI"} date={d ? String(d.getDate()) : "16"} dark /></span></div>
                <div className="flex flex-col gap-1.5 p-[18px]">
                  <span className="eyebrow">{genre}</span>
                  <span className="h-display text-[21px]">{performer || "[Performer]"}</span>
                  <span className="text-slate">[Your pub] · Plateau</span>
                  <span className="text-sm text-muted">{time} · {entry[0] === "Free" ? "Free entry" : entry[0]}</span>
                </div>
              </article>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
