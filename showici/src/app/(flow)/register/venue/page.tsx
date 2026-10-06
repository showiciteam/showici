"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChipGroup, Dropzone, FormCard, Notice } from "@/components/form";
import { Button } from "@/components/ui";
import { insertRow } from "@/lib/actions";

const steps = ["Venue basics", "Space and equipment", "Photos", "What you book", "Links", "Contact and publish"];
const EQUIPMENT = ["PA / sound system", "Microphones", "Drum kit", "Amps (backline)", "Stage lighting", "Piano / keyboard", "Sound technician", "Parking for load-in"];

export default function RegisterVenue() {
  const router = useRouter();
  const [type, setType] = useState(["Pub"]);
  const [equipment, setEquipment] = useState(["PA / sound system", "Microphones"]);
  const [books, setBooks] = useState(["Bands", "Solo / duo"]);
  const [genres, setGenres] = useState(["Rock", "Blues"]);
  const [nights, setNights] = useState(["Thu", "Fri", "Sat"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const res = await insertRow("venues", {
      name: f.get("name"), type: type[0], street: f.get("street"), city: f.get("city"), postal_code: f.get("postal"),
      description: f.get("description"), capacity: f.get("capacity"), stage: f.get("stage"), setting: f.get("setting"),
      equipment, books, genres, nights: nights.join(", "), fee_range: f.get("fee"), lead_time: f.get("lead"),
      open_to_new_acts: f.get("open") === "on", website: f.get("website"), instagram: f.get("instagram"),
      facebook: f.get("facebook"), youtube_url: f.get("youtube"), published: true,
    });
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: "Demo mode: everything looks good. Connect Supabase to save venues for real." });
    router.push("/dashboard/venue");
  }

  return (
    <div className="wrap pb-[72px] pt-9">
      <p className="eyebrow mb-1.5 text-[13px]">Venue registration</p>
      <h1 className="h-display text-[44px]">List your venue</h1>
      <p className="mb-8 mt-2.5 max-w-[720px] text-lg text-slate">Tell performers what your space is like and what you book. Your upcoming shows also appear on ShowIci&apos;s public listings.</p>
      <div className="flex flex-wrap items-start gap-7">
        <nav aria-label="Registration steps" className="card flex max-w-[280px] flex-[1_1_240px] flex-col p-2.5 lg:sticky lg:top-6">
          {steps.map((s, i) => (
            <a key={s} href={`#v${i + 1}`} className="flex items-center gap-3 rounded-[10px] p-3 font-medium text-navy no-underline hover:bg-parchment">
              <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border-2 border-line-strong text-[13px] font-bold text-muted">{i + 1}</span>{s}
            </a>
          ))}
        </nav>

        <form onSubmit={submit} className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
          <FormCard id="v1" title="1. Venue basics">
            <label className="label">Venue name<input name="name" required className="input" /></label>
            <ChipGroup legend="Type of venue" single options={["Pub", "Bar", "Restaurant", "Brewery", "Café", "Club", "Event hall", "Other"]} value={type} onChange={setType} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Street address<input name="street" className="input" placeholder="123 rue Saint-Denis" /></label>
              <label className="label">City<input name="city" required className="input" defaultValue="Montréal" /></label>
              <label className="label">Postal code<input name="postal" className="input" placeholder="H2X 1K1" /></label>
            </div>
            <label className="label">Short description <span className="hint">The vibe, the crowd, what nights are like.</span><textarea name="description" rows={3} className="input" /></label>
          </FormCard>

          <FormCard id="v2" title="2. Space and equipment">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Capacity<select name="capacity" className="input" defaultValue="50 – 150"><option>Under 50</option><option>50 – 150</option><option>150 – 300</option><option>300+</option></select></label>
              <label className="label">Stage<select name="stage" className="input" defaultValue="Small stage"><option>No stage (floor area)</option><option>Small stage</option><option>Large stage</option></select></label>
              <label className="label">Setting<select name="setting" className="input"><option>Indoor</option><option>Outdoor terrace</option><option>Both</option></select></label>
            </div>
            <ChipGroup legend="Equipment on site" options={EQUIPMENT} value={equipment} onChange={setEquipment} />
          </FormCard>

          <FormCard id="v3" title="3. Photos of your venue">
            <Dropzone files={photos} onFiles={setPhotos} hint="Show the stage, the room on a busy night, and the outside. JPG or PNG, up to 10 MB, 12 photos max." />
          </FormCard>

          <FormCard id="v4" title="4. What you book">
            <ChipGroup legend="Types of acts" options={["Bands", "Solo / duo", "DJs", "Stand-up comedy", "Magicians", "Trivia / karaoke hosts"]} value={books} onChange={setBooks} />
            <ChipGroup legend="Genres your crowd likes" options={["Rock", "Pop", "Blues", "Jazz", "Folk / trad québécois", "Country", "Latin", "Electronic"]} value={genres} onChange={setGenres} />
            <ChipGroup legend="Nights with live entertainment" options={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} value={nights} onChange={setNights} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
              <label className="label">Typical fee you pay <span className="hint">Optional. Shown as a range.</span><select name="fee" className="input" defaultValue="$200 – $500"><option>Prefer not to say</option><option>Door split / tips</option><option>$200 – $500</option><option>$500 – $1,000</option><option>$1,000+</option></select></label>
              <label className="label">How far ahead you book<select name="lead" className="input" defaultValue="2 – 4 weeks"><option>Last minute is fine</option><option>2 – 4 weeks</option><option>1 – 3 months</option></select></label>
            </div>
            <label className="flex items-center gap-2.5 font-medium"><input type="checkbox" name="open" defaultChecked className="h-[18px] w-[18px] accent-navy" />Open to new and emerging acts</label>
          </FormCard>

          <FormCard id="v5" title="5. Links">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
              <label className="label">Website<input name="website" type="url" className="input" placeholder="https://" /></label>
              <label className="label">Instagram<input name="instagram" type="url" className="input" placeholder="instagram.com/…" /></label>
              <label className="label">Facebook<input name="facebook" type="url" className="input" placeholder="facebook.com/…" /></label>
              <label className="label">YouTube video of your venue <span className="hint">Optional</span><input name="youtube" type="url" className="input" placeholder="https://www.youtube.com/watch?v=…" /></label>
            </div>
          </FormCard>

          <FormCard id="v6" title="6. Booking contact and publish">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
              <label className="label">Booking contact name<input name="contact" className="input" /></label>
              <label className="label">Role<select name="role" className="input" defaultValue="Manager"><option>Owner</option><option>Manager</option><option>Booker</option></select></label>
              <label className="label">Phone <span className="hint">Private</span><input name="phone" type="tel" className="input" placeholder="514-555-0123" /></label>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-slate"><input type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-navy" />I&apos;m authorized to list this venue, and I agree to the <a href="#">Terms</a>.</label>
            {status && <Notice kind={status.kind}>{status.msg}</Notice>}
            <div className="flex flex-wrap justify-end gap-2.5">
              <Button type="submit" disabled={busy} className="px-7 text-base">{busy ? "Publishing…" : "Publish my venue"}</Button>
            </div>
          </FormCard>
        </form>
      </div>
    </div>
  );
}
