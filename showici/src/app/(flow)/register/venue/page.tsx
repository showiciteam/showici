"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChipGroup, Dropzone, FormCard, Notice } from "@/components/form";
import { Button } from "@/components/ui";
import { saveVenue } from "@/lib/actions";
import { mediaUrl } from "@/lib/media";
import { getBrowserSupabase } from "@/lib/supabase/client";

const steps = ["Venue basics", "Space and equipment", "Photos", "What you book", "Links", "Contact and publish"];
const EQUIPMENT = ["PA / sound system", "Microphones", "Drum kit", "Amps (backline)", "Stage lighting", "Piano / keyboard", "Sound technician", "Parking for load-in"];

const EMPTY = {
  name: "", street: "", city: "Montréal", postal: "", description: "", capacity: "50 – 150", stage: "Small stage", setting: "Indoor",
  fee: "$200 – $500", lead: "2 – 4 weeks", open: true, website: "", instagram: "", facebook: "", youtube: "",
  contact: "", role: "Manager", phone: "",
};

export default function RegisterVenue() {
  const router = useRouter();
  const [existingId, setExistingId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [published, setPublished] = useState(false);
  const [f, setF] = useState(EMPTY);
  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) => setF((x) => ({ ...x, [k]: v }));
  const [type, setType] = useState(["Pub"]);
  const [equipment, setEquipment] = useState(["PA / sound system", "Microphones"]);
  const [books, setBooks] = useState(["Bands", "Solo / duo"]);
  const [genres, setGenres] = useState(["Rock", "Blues"]);
  const [nights, setNights] = useState(["Thu", "Fri", "Sat"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [savedPhotos, setSavedPhotos] = useState<string[]>([]);
  const [removedPhotos, setRemovedPhotos] = useState<string[]>([]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  // Editing: load the signed-in venue's existing listing so saving updates it.
  useEffect(() => {
    (async () => {
      const sb = getBrowserSupabase();
      const uid = sb ? (await sb.auth.getUser()).data.user?.id : undefined;
      if (!sb || !uid) return setLoading(false);
      const [{ data: v }, { data: contact }] = await Promise.all([
        sb.from("venues").select("*, venue_photos(*)").eq("owner", uid).order("created_at").limit(1).maybeSingle(),
        sb.from("private_contacts").select("phone").eq("profile_id", uid).maybeSingle(),
      ]);
      if (v) {
        setExistingId(v.id);
        setPublished(!!v.published);
        setF({
          name: v.name ?? "", street: v.street ?? "", city: v.city ?? "Montréal", postal: v.postal_code ?? "", description: v.description ?? "",
          capacity: v.capacity ?? "50 – 150", stage: v.stage ?? "Small stage", setting: v.setting ?? "Indoor", fee: v.fee_range ?? "Prefer not to say",
          lead: v.lead_time ?? "2 – 4 weeks", open: v.open_to_new_acts ?? true, website: v.website ?? "", instagram: v.instagram ?? "",
          facebook: v.facebook ?? "", youtube: v.youtube_url ?? "", contact: v.contact_name ?? "", role: v.contact_role ?? "Manager", phone: contact?.phone ?? "",
        });
        setType([v.type]);
        setEquipment(v.equipment ?? []);
        setBooks(v.books ?? []);
        setGenres(v.genres ?? []);
        setNights((v.nights ?? "").split(",").map((s: string) => s.trim()).filter(Boolean));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setSavedPhotos((v.venue_photos ?? []).sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)).map((x: any) => x.storage_path));
      } else if (contact?.phone) {
        set("phone", contact.phone);
      }
      setLoading(false);
    })();
  }, []);

  async function save(publish: boolean) {
    setBusy(true);
    setStatus(null);
    const res = await saveVenue(
      {
        name: f.name, type: type[0], street: f.street, city: f.city, postal_code: f.postal, description: f.description,
        capacity: f.capacity, stage: f.stage, setting: f.setting, equipment, books, genres, nights: nights.join(", "),
        fee_range: f.fee, lead_time: f.lead, open_to_new_acts: f.open, website: f.website, instagram: f.instagram,
        facebook: f.facebook, youtube_url: f.youtube, contact_name: f.contact, contact_role: f.role, phone: f.phone,
        photos, removedPhotos, publish,
      },
      existingId,
    );
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: "Demo mode: everything looks good. Connect Supabase to save venues for real." });
    router.push("/dashboard/venue");
    router.refresh();
  }

  if (loading) return <div className="wrap py-16 text-slate">Loading your venue…</div>;

  return (
    <div className="wrap pb-[72px] pt-9">
      <p className="eyebrow mb-1.5 text-[13px]">{existingId ? "Edit your venue" : "Venue registration"}</p>
      <h1 className="h-display text-[44px]">{existingId ? "Update your venue" : "List your venue"}</h1>
      <p className="mb-8 mt-2.5 max-w-[720px] text-lg text-slate">Tell performers what your space is like and what you book. Your upcoming shows also appear on ShowIci&apos;s public listings.</p>
      <div className="flex flex-wrap items-start gap-7">
        <nav aria-label="Registration steps" className="card flex max-w-[280px] flex-[1_1_240px] flex-col p-2.5 lg:sticky lg:top-6">
          {steps.map((s, i) => (
            <a key={s} href={`#v${i + 1}`} className="flex items-center gap-3 rounded-[10px] p-3 font-medium text-navy no-underline hover:bg-parchment">
              <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border-2 border-line-strong text-[13px] font-bold text-muted">{i + 1}</span>{s}
            </a>
          ))}
        </nav>

        <form onSubmit={(e) => { e.preventDefault(); save(true); }} className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
          <FormCard id="v1" title="1. Venue basics">
            <label className="label">Venue name<input required value={f.name} onChange={(e) => set("name", e.target.value)} className="input" /></label>
            <ChipGroup legend="Type of venue" single options={["Pub", "Bar", "Restaurant", "Brewery", "Café", "Club", "Event hall", "Other"]} value={type} onChange={setType} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Street address<input value={f.street} onChange={(e) => set("street", e.target.value)} className="input" placeholder="123 rue Saint-Denis" /></label>
              <label className="label">City<input required value={f.city} onChange={(e) => set("city", e.target.value)} className="input" /></label>
              <label className="label">Postal code<input value={f.postal} onChange={(e) => set("postal", e.target.value)} className="input" placeholder="H2X 1K1" /></label>
            </div>
            <label className="label">Short description <span className="hint">The vibe, the crowd, what nights are like.</span><textarea rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} className="input" /></label>
          </FormCard>

          <FormCard id="v2" title="2. Space and equipment">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Capacity<select value={f.capacity} onChange={(e) => set("capacity", e.target.value)} className="input"><option>Under 50</option><option>50 – 150</option><option>150 – 300</option><option>300+</option></select></label>
              <label className="label">Stage<select value={f.stage} onChange={(e) => set("stage", e.target.value)} className="input"><option>No stage (floor area)</option><option>Small stage</option><option>Large stage</option></select></label>
              <label className="label">Setting<select value={f.setting} onChange={(e) => set("setting", e.target.value)} className="input"><option>Indoor</option><option>Outdoor terrace</option><option>Both</option></select></label>
            </div>
            <ChipGroup legend="Equipment on site" options={EQUIPMENT} value={equipment} onChange={setEquipment} />
          </FormCard>

          <FormCard id="v3" title="3. Photos of your venue">
            {savedPhotos.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                {savedPhotos.map((path, i) => (
                  <div key={path} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ph-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mediaUrl(path)} alt="" className="h-full w-full object-cover" />
                    {i === 0 && <span className="absolute left-2 top-2 rounded-md bg-navy px-2 py-1 text-[11px] font-bold text-white">COVER</span>}
                    <button type="button" aria-label="Remove photo" onClick={() => { setSavedPhotos(savedPhotos.filter((p) => p !== path)); setRemovedPhotos([...removedPhotos, path]); }} className="absolute right-1.5 top-1.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-navy">✕</button>
                  </div>
                ))}
              </div>
            )}
            <Dropzone files={photos} onFiles={(fs) => setPhotos(fs.slice(0, Math.max(0, 12 - savedPhotos.length)))} hint="Show the stage, the room on a busy night, and the outside. JPG or PNG, up to 10 MB, 12 photos max." />
          </FormCard>

          <FormCard id="v4" title="4. What you book">
            <ChipGroup legend="Types of acts" options={["Bands", "Solo / duo", "DJs", "Stand-up comedy", "Magicians", "Trivia / karaoke hosts"]} value={books} onChange={setBooks} />
            <ChipGroup legend="Genres your crowd likes" options={["Rock", "Pop", "Blues", "Jazz", "Folk / trad québécois", "Country", "Latin", "Electronic"]} value={genres} onChange={setGenres} />
            <ChipGroup legend="Nights with live entertainment" options={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} value={nights} onChange={setNights} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
              <label className="label">Typical fee you pay <span className="hint">Optional. Shown as a range.</span><select value={f.fee} onChange={(e) => set("fee", e.target.value)} className="input"><option>Prefer not to say</option><option>Door split / tips</option><option>$200 – $500</option><option>$500 – $1,000</option><option>$1,000+</option></select></label>
              <label className="label">How far ahead you book<select value={f.lead} onChange={(e) => set("lead", e.target.value)} className="input"><option>Last minute is fine</option><option>2 – 4 weeks</option><option>1 – 3 months</option></select></label>
            </div>
            <label className="flex items-center gap-2.5 font-medium"><input type="checkbox" checked={f.open} onChange={(e) => set("open", e.target.checked)} className="h-[18px] w-[18px] accent-navy" />Open to new and emerging acts</label>
          </FormCard>

          <FormCard id="v5" title="5. Links">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
              <label className="label">Website<input type="url" value={f.website} onChange={(e) => set("website", e.target.value)} className="input" placeholder="https://" /></label>
              <label className="label">Instagram<input type="url" value={f.instagram} onChange={(e) => set("instagram", e.target.value)} className="input" placeholder="https://instagram.com/…" /></label>
              <label className="label">Facebook<input type="url" value={f.facebook} onChange={(e) => set("facebook", e.target.value)} className="input" placeholder="https://facebook.com/…" /></label>
              <label className="label">YouTube video of your venue <span className="hint">Optional</span><input type="url" value={f.youtube} onChange={(e) => set("youtube", e.target.value)} className="input" placeholder="https://www.youtube.com/watch?v=…" /></label>
            </div>
          </FormCard>

          <FormCard id="v6" title="6. Booking contact and publish">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
              <label className="label">Booking contact name<input value={f.contact} onChange={(e) => set("contact", e.target.value)} className="input" /></label>
              <label className="label">Role<select value={f.role} onChange={(e) => set("role", e.target.value)} className="input"><option>Owner</option><option>Manager</option><option>Booker</option></select></label>
              <label className="label">Phone <span className="hint">Private</span><input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} className="input" placeholder="514-555-0123" /></label>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-slate"><input type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-navy" />I&apos;m authorized to list this venue, and I agree to the <a href="#">Terms</a>.</label>
            {existingId && <p className="hint text-sm">Currently {published ? "published" : "a draft (hidden from the public)"}.</p>}
            {status && <Notice kind={status.kind}>{status.msg}</Notice>}
            <div className="flex flex-wrap justify-end gap-2.5">
              <Button variant="secondary" disabled={busy || !f.name} onClick={() => save(false)}>Save as draft</Button>
              <Button type="submit" disabled={busy} className="px-7 text-base">{busy ? "Saving…" : existingId ? "Save and publish" : "Publish my venue"}</Button>
            </div>
          </FormCard>
        </form>
      </div>
    </div>
  );
}
