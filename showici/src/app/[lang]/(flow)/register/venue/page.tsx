"use client";

import { useTr } from "@/lib/i18n";
import Link from "@/components/Link";
import { useRouter } from "@/lib/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChipGroup, Dropzone, FormCard, Notice, SingleImage } from "@/components/form";
import { Button } from "@/components/ui";
import { saveVenue, type Geo } from "@/lib/actions";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { VideoEditor, type EditableVideo } from "@/components/VideoEditor";
import { mediaUrl } from "@/lib/media";
import { getBrowserSupabase } from "@/lib/supabase/client";

const steps = ["Venue basics", "Space and equipment", "Logo and photos", "Videos", "What you book", "Links", "Contact and publish"];
const EQUIPMENT = ["PA / sound system", "Microphones", "Drum kit", "Amps (backline)", "Stage lighting", "Piano / keyboard", "Sound technician", "Parking for load-in"];

const EMPTY = {
  name: "", street: "", city: "Montréal", postal: "", description: "", capacity: "50 – 150", stage: "Small stage", setting: "Indoor",
  fee: "$200 – $500", lead: "2 – 4 weeks", open: true, website: "", instagram: "", facebook: "",
  contact: "", role: "Manager", phone: "",
};

export default function RegisterVenue() {
  const tr = useTr();
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
  const [videos, setVideos] = useState<EditableVideo[]>([]);
  // Logo: a saved storage path, or a newly picked file (shown as a local preview).
  const [logoPath, setLogoPath] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoUrl = useMemo(() => (logoFile ? URL.createObjectURL(logoFile) : logoPath ? mediaUrl(logoPath) : undefined), [logoFile, logoPath]);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  // undefined: address untouched; null: typed by hand; set: picked from the suggestions (exact map pin)
  const [geo, setGeo] = useState<Geo | null | undefined>(undefined);

  // Editing: load the signed-in venue's existing listing so saving updates it.
  useEffect(() => {
    (async () => {
      const sb = getBrowserSupabase();
      const uid = sb ? (await sb.auth.getUser()).data.user?.id : undefined;
      if (!sb || !uid) return setLoading(false);
      const [{ data: v }, { data: contact }] = await Promise.all([
        sb.from("venues").select("*, venue_photos(*), venue_videos(*)").eq("owner", uid).order("created_at").limit(1).maybeSingle(),
        sb.from("private_contacts").select("phone").eq("profile_id", uid).maybeSingle(),
      ]);
      if (v) {
        setExistingId(v.id);
        setPublished(!!v.published);
        setF({
          name: v.name ?? "", street: v.street ?? "", city: v.city ?? "Montréal", postal: v.postal_code ?? "", description: v.description ?? "",
          capacity: v.capacity ?? "50 – 150", stage: v.stage ?? "Small stage", setting: v.setting ?? "Indoor", fee: v.fee_range ?? "Prefer not to say",
          lead: v.lead_time ?? "2 – 4 weeks", open: v.open_to_new_acts ?? true, website: v.website ?? "", instagram: v.instagram ?? "",
          facebook: v.facebook ?? "", contact: v.contact_name ?? "", role: v.contact_role ?? "Manager", phone: contact?.phone ?? "",
        });
        setType([v.type]);
        setEquipment(v.equipment ?? []);
        setBooks(v.books ?? []);
        setGenres(v.genres ?? []);
        setNights((v.nights ?? "").split(",").map((s: string) => s.trim()).filter(Boolean));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setSavedPhotos((v.venue_photos ?? []).sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)).map((x: any) => x.storage_path));
        setLogoPath(v.logo_path ?? null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const saved = (v.venue_videos ?? []).sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)).map((x: any) => ({ youtube_url: x.youtube_url, title: x.title ?? "", featured: !!x.featured }));
        // Venues saved before the video list existed had a single YouTube link: start the list with it.
        setVideos(saved.length ? saved : v.youtube_url ? [{ youtube_url: v.youtube_url, title: "", featured: true }] : []);
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
        facebook: f.facebook, contact_name: f.contact, contact_role: f.role, phone: f.phone,
        videos: videos.map((v, i) => ({ ...v, title: v.title.trim() || `Video ${i + 1}` })),
        photos, removedPhotos, publish, geo, logo: { file: logoFile, path: logoPath },
      },
      existingId,
    );
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: "Demo mode: everything looks good. Connect Supabase to save venues for real." });
    router.push("/dashboard/venue");
    router.refresh();
  }

  if (loading) return <div className="wrap py-16 text-slate">{tr("Loading your venue…")}</div>;

  return (
    <div className="wrap pb-[72px] pt-9">
      <p className="eyebrow mb-1.5 text-[13px]">{existingId ? tr("Edit your venue") : tr("Venue registration")}</p>
      <h1 className="h-display text-[44px]">{existingId ? tr("Update your venue") : tr("List your venue")}</h1>
      <p className="mb-8 mt-2.5 max-w-[720px] text-lg text-slate">{tr("Tell performers what your space is like and what you book. Your upcoming shows also appear on ShowIci’s public listings.")}</p>
      {!existingId && (
        <p className="-mt-4 mb-8 max-w-[720px] rounded-xl border border-accent-line bg-accent-tint px-4 py-3 text-[15px] text-graphite">
          {tr("Is your venue already on ShowIci? Find it under")} <Link href="/venues?region=all" className="font-bold">{tr("Venues")}</Link> {tr("and click")} <strong>{tr("Claim this venue")}</strong> {tr("instead of creating a new page.")}
        </p>
      )}
      <div className="flex flex-wrap items-start gap-7">
        <nav aria-label={tr("Registration steps")} className="card flex max-w-[280px] flex-[1_1_240px] flex-col p-2.5 lg:sticky lg:top-6">
          {steps.map((s, i) => (
            <a key={s} href={`#v${i + 1}`} className="flex items-center gap-3 rounded-[10px] p-3 font-medium text-ink no-underline hover:bg-sand">
              <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border-2 border-line-strong text-[13px] font-bold text-muted">{i + 1}</span>{tr(s)}
            </a>
          ))}
        </nav>

        <form onSubmit={(e) => { e.preventDefault(); save(true); }} className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
          <FormCard id="v1" title={tr("1. Venue basics")}>
            <label className="label">{tr("Venue name")}<input required value={f.name} onChange={(e) => set("name", e.target.value)} className="input" /></label>
            <ChipGroup legend={tr("Type of venue")} single options={["Pub", "Bar", "Restaurant", "Brewery", "Café", "Club", "Event hall", "Other"]} value={type} onChange={setType} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-start gap-3.5">
              <label className="label">Street address
                <AddressAutocomplete
                  value={f.street}
                  placeholder={tr("123 rue Saint-Denis")}
                  onChange={(v) => { set("street", v); setGeo(null); }}
                  onPick={(p) => { setF((x) => ({ ...x, street: p.street || x.street, city: p.city || x.city, postal: p.postal || x.postal })); setGeo({ lat: p.lat, lng: p.lng }); }}
                />
                <span className="hint">{tr("Start typing, then pick your address.")}</span>
              </label>
              <label className="label">{tr("City")}<input required value={f.city} onChange={(e) => { set("city", e.target.value); setGeo(null); }} className="input" /></label>
              <label className="label">{tr("Postal code")}<input value={f.postal} onChange={(e) => set("postal", e.target.value)} className="input" placeholder="H2X 1K1" /></label>
            </div>
            <label className="label">{tr("Short description")} <span className="hint">{tr("The vibe, the crowd, what nights are like.")}</span><textarea rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} className="input" /></label>
          </FormCard>

          <FormCard id="v2" title={tr("2. Space and equipment")}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] items-start gap-3.5">
              <label className="label">{tr("Capacity")}<select value={f.capacity} onChange={(e) => set("capacity", e.target.value)} className="input"><option value="Under 50">{tr("Under 50")}</option><option>50 – 150</option><option>150 – 300</option><option>300+</option></select></label>
              <label className="label">{tr("Stage")}<select value={f.stage} onChange={(e) => set("stage", e.target.value)} className="input"><option value="No stage (floor area)">{tr("No stage (floor area)")}</option><option value="Small stage">{tr("Small stage")}</option><option value="Large stage">{tr("Large stage")}</option></select></label>
              <label className="label">{tr("Setting")}<select value={f.setting} onChange={(e) => set("setting", e.target.value)} className="input"><option value="Indoor">{tr("Indoor")}</option><option value="Outdoor terrace">{tr("Outdoor terrace")}</option><option value="Both">{tr("Both")}</option></select></label>
            </div>
            <ChipGroup legend={tr("Equipment on site")} options={EQUIPMENT} value={equipment} onChange={setEquipment} />
          </FormCard>

          <FormCard id="v3" title={tr("3. Logo and photos")}>
            <SingleImage label={tr("Logo")} shape="round" hint={tr("Shown next to your venue's name. Square works best. JPG or PNG.")} url={logoUrl} onFile={setLogoFile} onRemove={() => { setLogoFile(null); setLogoPath(null); }} />
            <h3 className="mt-1 text-[17px] font-bold">{tr("Photos")}</h3>
            {savedPhotos.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                {savedPhotos.map((path, i) => (
                  <div key={path} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ph-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mediaUrl(path)} alt="" className="h-full w-full object-cover" />
                    {i === 0 && <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-1 text-[11px] font-bold text-white">{tr("COVER")}</span>}
                    <button type="button" aria-label={tr("Remove photo")} onClick={() => { setSavedPhotos(savedPhotos.filter((p) => p !== path)); setRemovedPhotos([...removedPhotos, path]); }} className="absolute right-1.5 top-1.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-ink">✕</button>
                  </div>
                ))}
              </div>
            )}
            <Dropzone files={photos} onFiles={(fs) => setPhotos(fs.slice(0, Math.max(0, 12 - savedPhotos.length)))} hint={tr("Show the stage, the room on a busy night, and the outside. JPG or PNG, up to 10 MB, 12 photos max.")} />
          </FormCard>

          <FormCard id="v4" title={tr("4. Videos")}>
            <VideoEditor
              videos={videos}
              onChange={setVideos}
              intro={tr("Paste YouTube links that show your room: a night with a band, the stage, the crowd. Performers love seeing where they'd play.")}
              previewLabel={tr("PREVIEW: how your videos appear on your venue page")}
              titlePlaceholder="e.g. Friday night with a live band"
            />
          </FormCard>

          <FormCard id="v5" title={tr("5. What you book")}>
            <ChipGroup legend={tr("Types of acts")} options={["Bands", "Solo / duo", "DJs", "Stand-up comedy", "Magicians", "Trivia / karaoke hosts"]} value={books} onChange={setBooks} />
            <ChipGroup legend={tr("Genres your crowd likes")} options={["Rock", "Pop", "Blues", "Jazz", "Folk / trad québécois", "Country", "Latin", "Electronic"]} value={genres} onChange={setGenres} />
            <ChipGroup legend={tr("Nights with live entertainment")} options={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} value={nights} onChange={setNights} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-3.5">
              <label className="label">{tr("Typical fee you pay")}<select value={f.fee} onChange={(e) => set("fee", e.target.value)} className="input"><option value="Prefer not to say">{tr("Prefer not to say")}</option><option value="Door split / tips">{tr("Door split / tips")}</option><option>$200 – $500</option><option>$500 – $1,000</option><option>$1,000+</option></select><span className="hint">{tr("Optional. Shown as a range.")}</span></label>
              <label className="label">{tr("How far ahead you book")}<select value={f.lead} onChange={(e) => set("lead", e.target.value)} className="input"><option value="Last minute is fine">{tr("Last minute is fine")}</option><option value="2 – 4 weeks">{tr("2 – 4 weeks")}</option><option value="1 – 3 months">{tr("1 – 3 months")}</option></select></label>
            </div>
            <label className="flex items-center gap-2.5 font-medium"><input type="checkbox" checked={f.open} onChange={(e) => set("open", e.target.checked)} className="h-[18px] w-[18px] accent-ink" />{tr("Open to new and emerging acts")}</label>
          </FormCard>

          <FormCard id="v6" title={tr("6. Links")}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-3.5">
              <label className="label">{tr("Website")}<input type="url" value={f.website} onChange={(e) => set("website", e.target.value)} className="input" placeholder="https://" /></label>
              <label className="label">Instagram<input type="url" value={f.instagram} onChange={(e) => set("instagram", e.target.value)} className="input" placeholder="https://instagram.com/…" /></label>
              <label className="label">Facebook<input type="url" value={f.facebook} onChange={(e) => set("facebook", e.target.value)} className="input" placeholder="https://facebook.com/…" /></label>
            </div>
          </FormCard>

          <FormCard id="v7" title={tr("7. Booking contact and publish")}>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-3.5">
              <label className="label">{tr("Booking contact name")}<input value={f.contact} onChange={(e) => set("contact", e.target.value)} className="input" /></label>
              <label className="label">{tr("Role")}<select value={f.role} onChange={(e) => set("role", e.target.value)} className="input"><option value="Owner">{tr("Owner")}</option><option value="Manager">{tr("Manager")}</option><option value="Booker">{tr("Booker")}</option></select></label>
              <label className="label">{tr("Phone")}<input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} className="input" placeholder="514-555-0123" /><span className="hint">{tr("Private. Never shown on your page.")}</span></label>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-slate"><input type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-ink" />{tr("I’m authorized to list this venue, and I agree to the")} <a href="/terms" target="_blank" rel="noopener">{tr("Terms")}</a>.</label>
            {existingId && <p className="hint text-sm">{tr("Currently")} {published ? tr("published") : tr("a draft (hidden from the public)")}.</p>}
            {status && <Notice kind={status.kind}>{status.msg}</Notice>}
            <div className="flex flex-wrap justify-end gap-2.5">
              <Button variant="secondary" disabled={busy || !f.name} onClick={() => save(false)}>{tr("Save as draft")}</Button>
              <Button type="submit" disabled={busy} className="px-7 text-base">{busy ? tr("Saving…") : existingId ? tr("Save and publish") : tr("Publish my venue")}</Button>
            </div>
          </FormCard>
        </form>
      </div>
    </div>
  );
}
