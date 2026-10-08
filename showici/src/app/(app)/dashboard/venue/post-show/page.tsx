"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/Header";
import { ChipGroup, Notice } from "@/components/form";
import { Button, DateBadge, Placeholder } from "@/components/ui";
import { saveShow, setShowStatus } from "@/lib/actions";
import { getBrowserSupabase, supabaseEnabled } from "@/lib/supabase/client";
import { isoToMontreal, montrealToISO } from "@/lib/time";

type Me = { name: string; venueId: string | null; venueName: string; area: string };

export default function PostShow() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(supabaseEnabled ? null : { name: "[Your pub]", venueId: null, venueName: "[Your pub]", area: "Plateau" });
  const [showId, setShowId] = useState<string | undefined>();
  const [currentStatus, setCurrentStatus] = useState<"draft" | "live" | "cancelled" | null>(null);
  const [performers, setPerformers] = useState<{ id: string; name: string }[]>([]);
  const [entry, setEntry] = useState(["Free"]);
  const [performer, setPerformer] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Rock covers");
  const [date, setDate] = useState("");
  const [doors, setDoors] = useState("20:00");
  const [time, setTime] = useState("21:00");
  const [price, setPrice] = useState("");
  const [ticketUrl, setTicketUrl] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [lang, setLang] = useState(["Français"]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const sb = getBrowserSupabase();
      if (!sb) return;
      const { data: auth } = await sb.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) return;
      const [{ data: profile }, { data: venue }, { data: perfs }] = await Promise.all([
        sb.from("profiles").select("display_name").eq("id", uid).maybeSingle(),
        sb.from("venues").select("id, name, area, city").eq("owner", uid).order("created_at").limit(1).maybeSingle(),
        sb.from("performers_view").select("id, name").order("name").limit(500),
      ]);
      setMe({ name: profile?.display_name ?? "My venue", venueId: venue?.id ?? null, venueName: venue?.name ?? "", area: venue?.area || venue?.city || "" });
      setPerformers(perfs ?? []);

      // Editing an existing show: /dashboard/venue/post-show?id=…
      const id = new URLSearchParams(window.location.search).get("id");
      if (!id) return;
      const { data: s } = await sb.from("shows").select("*").eq("id", id).maybeSingle();
      if (!s) return setStatus({ kind: "error", msg: "That show was not found." });
      setShowId(s.id);
      setCurrentStatus(s.status);
      setPerformer(s.performer_name ?? "");
      setTitle(s.title && s.title !== s.performer_name ? s.title : "");
      setGenre(s.genre ?? "Rock covers");
      const start = isoToMontreal(s.starts_at);
      setDate(start.date);
      setTime(start.time);
      if (s.doors_at) setDoors(isoToMontreal(s.doors_at).time);
      if (s.ticket_url) { setEntry(["Tickets"]); setTicketUrl(s.ticket_url); setPrice(s.entry ?? ""); }
      else if (s.entry && s.entry !== "Free entry") { setEntry(["Cover charge"]); setPrice(s.entry); }
      setDescFr(s.description_fr ?? "");
      setDescEn(s.description_en ?? "");
    })();
  }, []);

  const d = date ? new Date(`${date}T12:00`) : null;

  async function save(nextStatus: "draft" | "live") {
    if (!date || !performer.trim()) return setStatus({ kind: "error", msg: "Add the performer and the date first." });
    if (supabaseEnabled && !me?.venueId) return setStatus({ kind: "error", msg: "Add your venue first, then post shows." });
    setBusy(true);
    setStatus(null);
    const match = performers.find((p) => p.name.toLowerCase() === performer.trim().toLowerCase());
    const res = await saveShow(
      {
        venue_id: me?.venueId ?? "",
        performer_id: match?.id ?? null,
        performer_name: performer.trim(),
        title: title.trim() || performer.trim(),
        genre,
        starts_at: montrealToISO(date, time),
        doors_at: doors ? montrealToISO(date, doors) : null,
        entry: entry[0] === "Free" ? "Free entry" : price || entry[0],
        ticket_url: entry[0] === "Tickets" && ticketUrl ? ticketUrl : null,
        description_fr: descFr,
        description_en: descEn,
        status: nextStatus,
      },
      showId,
    );
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: "Demo mode: the show looks good. Connect Supabase to publish it for real." });
    router.push("/dashboard/venue");
    router.refresh();
  }

  async function cancelShow() {
    if (!showId) return;
    setBusy(true);
    const res = await setShowStatus(showId, "cancelled");
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    router.push("/dashboard/venue");
    router.refresh();
  }

  if (!me) return <><AppHeader role="venue" name="…" /><main className="wrap py-16 text-slate">Loading…</main></>;

  return (
    <>
      <AppHeader role="venue" name={me.name} live={supabaseEnabled} />
      <main className="min-h-screen bg-parchment">
        <div className="wrap pb-[72px] pt-9">
          <Link href="/dashboard/venue" className="font-bold no-underline">← My shows</Link>
          <h1 className="h-display mt-2.5 text-[40px]">{showId ? "Edit show" : "Post an upcoming show"}</h1>
          <p className="mb-7 mt-2 text-[17px] text-slate">It appears on ShowIci&apos;s public listings and on your venue page. Times are Montréal time.</p>
          {supabaseEnabled && !me.venueId && (
            <div className="mb-6"><Notice kind="info">You need to add your venue before posting shows. <Link href="/register/venue" className="font-bold">Add my venue →</Link></Notice></div>
          )}
          <div className="flex flex-wrap items-start gap-7">
            <form onSubmit={(e) => { e.preventDefault(); save("live"); }} className="card flex min-w-0 flex-[999_1_560px] flex-col gap-5 p-7">
              <label className="label">Performer <span className="hint">Start typing to pick an act on ShowIci, or type a name if they&apos;re not on ShowIci yet.</span>
                <input required value={performer} onChange={(e) => setPerformer(e.target.value)} className="input" placeholder="e.g. [Band name]" list="performers" />
                <datalist id="performers">{performers.map((p) => <option key={p.id} value={p.name} />)}</datalist>
              </label>
              <label className="label">Show title <span className="hint">Optional</span><input value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="e.g. 90s Night" /></label>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
                <label className="label">Date<input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="input" /></label>
                <label className="label">Doors<input type="time" value={doors} onChange={(e) => setDoors(e.target.value)} className="input" /></label>
                <label className="label">Show starts<input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" /></label>
              </div>
              <ChipGroup legend="Entry" single options={["Free", "Cover charge", "Tickets"]} value={entry} onChange={setEntry} />
              {entry[0] !== "Free" && <label className="label">Price<input value={price} onChange={(e) => setPrice(e.target.value)} className="input" placeholder="e.g. $10 cover" /></label>}
              {entry[0] === "Tickets" && <label className="label">Ticket link <span className="hint">Eventbrite or any other ticketing page</span><input type="url" value={ticketUrl} onChange={(e) => setTicketUrl(e.target.value)} className="input" placeholder="https://www.eventbrite.ca/e/…" /></label>}
              <label className="label">Genre<select value={genre} onChange={(e) => setGenre(e.target.value)} className="input"><option>Rock covers</option><option>Pop</option><option>Blues</option><option>Jazz</option><option>Folk / trad</option><option>Latin</option><option>Comedy</option><option>DJ night</option><option>Magic</option><option>Other</option></select></label>
              <div className="flex flex-col gap-2">
                <ChipGroup legend="Description" hint="Write it in both languages" single options={["Français", "English"]} value={lang} onChange={setLang} />
                <textarea rows={3} value={descFr} onChange={(e) => setDescFr(e.target.value)} className={`input ${lang[0] === "Français" ? "" : "hidden"}`} placeholder="Description du spectacle en français." />
                <textarea rows={3} value={descEn} onChange={(e) => setDescEn(e.target.value)} className={`input ${lang[0] === "English" ? "" : "hidden"}`} placeholder="Show description in English." />
              </div>
              {status && <Notice kind={status.kind}>{status.msg}</Notice>}
              <div className="flex flex-wrap items-center justify-end gap-2.5">
                {showId && currentStatus !== "cancelled" && <button type="button" disabled={busy} onClick={cancelShow} className="mr-auto text-sm font-bold text-red-700 underline">Cancel this show</button>}
                <Button variant="secondary" disabled={busy} onClick={() => save("draft")}>Save draft</Button>
                <Button type="submit" disabled={busy} className="px-7">{busy ? "Saving…" : showId ? "Save and publish" : "Publish show"}</Button>
              </div>
            </form>
            <aside className="flex max-w-[360px] flex-[1_1_280px] flex-col gap-3">
              <span className="text-[13px] font-bold tracking-[0.06em] text-muted">PREVIEW</span>
              <article className="card overflow-hidden">
                <div className="relative"><Placeholder tone="ph-1" className="h-[170px]" /><span className="absolute bottom-3.5 left-3.5"><DateBadge day={d ? d.toLocaleDateString("en-CA", { weekday: "short" }).replace(".", "").toUpperCase() : "FRI"} date={d ? String(d.getDate()) : "16"} dark /></span></div>
                <div className="flex flex-col gap-1.5 p-[18px]">
                  <span className="eyebrow">{genre}</span>
                  <span className="h-display text-[21px]">{title || performer || "[Performer]"}</span>
                  <span className="text-slate">{me.venueName || "[Your venue]"}{me.area ? ` · ${me.area}` : ""}</span>
                  <span className="text-sm text-muted">{time} · {entry[0] === "Free" ? "Free entry" : price || entry[0]}</span>
                </div>
              </article>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
