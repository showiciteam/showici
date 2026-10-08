"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChipGroup, Dropzone, FormCard, Notice } from "@/components/form";
import { Button, PlayIcon, VideoBox } from "@/components/ui";
import { savePerformer } from "@/lib/actions";
import { mediaUrl } from "@/lib/media";
import { getBrowserSupabase } from "@/lib/supabase/client";

const steps = [
  ["basics", "The basics"], ["style", "Your style"], ["photos", "Photos"], ["videos", "Videos and links"],
  ["where", "Where you play"], ["events", "Events and availability"], ["publish", "Review and publish"],
];

type Video = { youtube_url: string; title: string; featured: boolean };
const ytId = (u: string) => u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1];

const EMPTY = {
  name: "", members: "4", contact: "", phone: "", rep: "Covers", bio: "", setLength: "2 × 45 min", fee: "$300 – $600",
  ownSound: false, base: "Montréal, QC", instagram: "", facebook: "", tiktok: "", music: "", website: "",
};

export default function RegisterPerformer() {
  const router = useRouter();
  const [existingId, setExistingId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [f, setF] = useState(EMPTY);
  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) => setF((x) => ({ ...x, [k]: v }));
  const [actType, setActType] = useState(["Band"]);
  const [languages, setLanguages] = useState(["Français", "English"]);
  const [genres, setGenres] = useState(["Rock", "Pop"]);
  const [eventTypes, setEventTypes] = useState(["Pubs and bars", "Private parties"]);
  const [days, setDays] = useState(["Fri", "Sat"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [savedPhotos, setSavedPhotos] = useState<string[]>([]);
  const [removedPhotos, setRemovedPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");
  const [radius, setRadius] = useState(50);
  const [available, setAvailable] = useState(true);
  const [published, setPublished] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  // Editing: load the signed-in performer's existing profile so saving updates it instead of creating a copy.
  useEffect(() => {
    (async () => {
      const sb = getBrowserSupabase();
      const uid = sb ? (await sb.auth.getUser()).data.user?.id : undefined;
      if (!sb || !uid) return setLoading(false);
      const [{ data: p }, { data: contact }] = await Promise.all([
        sb.from("performers").select("*, performer_videos(*), performer_photos(*)").eq("owner", uid).order("created_at").limit(1).maybeSingle(),
        sb.from("private_contacts").select("phone").eq("profile_id", uid).maybeSingle(),
      ]);
      if (p) {
        setExistingId(p.id);
        setF({
          name: p.name ?? "", members: String(Math.min(p.members ?? 1, 6)), contact: p.contact_name ?? "", phone: contact?.phone ?? "",
          rep: p.repertoire ?? "Covers", bio: p.bio ?? "", setLength: p.set_length ?? "2 × 45 min", fee: p.fee_range ?? "Prefer not to say",
          ownSound: !!p.own_sound, base: p.base_city ?? "Montréal, QC", instagram: p.instagram ?? "", facebook: p.facebook ?? "",
          tiktok: p.tiktok ?? "", music: p.music_url ?? "", website: p.website ?? "",
        });
        setActType([p.act_type]);
        setLanguages(p.languages ?? []);
        setGenres(p.genres ?? []);
        setEventTypes(p.event_types ?? []);
        setDays(p.available_days ?? []);
        setRadius(p.travel_km ?? 50);
        setAvailable(p.available ?? true);
        setPublished(!!p.published);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sortByPos = (a: any, b: any) => (a.position ?? 0) - (b.position ?? 0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setVideos((p.performer_videos ?? []).sort(sortByPos).map((v: any) => ({ youtube_url: v.youtube_url, title: v.title ?? "", featured: !!v.featured })));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setSavedPhotos((p.performer_photos ?? []).sort(sortByPos).map((x: any) => x.storage_path));
      } else if (contact?.phone) {
        set("phone", contact.phone);
      }
      setLoading(false);
    })();
  }, []);

  const photoCount = savedPhotos.length + photos.length;
  const strength = Math.min(100, 30 + (photoCount ? 20 : 0) + Math.min(videos.length, 3) * 10 + (f.bio.length > 40 ? 20 : 0));
  const circle = 40 + radius * 1.6;

  function addVideo() {
    if (!ytId(videoUrl)) return setVideoError("That doesn't look like a YouTube link.");
    setVideoError("");
    setVideos((v) => [...v, { youtube_url: videoUrl, title: `Video ${v.length + 1}`, featured: v.length === 0 }]);
    setVideoUrl("");
  }

  async function save(publish: boolean) {
    setBusy(true);
    setStatus(null);
    const res = await savePerformer(
      {
        name: f.name, act_type: actType[0], members: Number(f.members || 1), languages, genres,
        repertoire: f.rep, bio: f.bio, set_length: f.setLength, fee_range: f.fee,
        own_sound: f.ownSound, base_city: f.base || "Montréal", travel_km: radius,
        event_types: eventTypes, available_days: days, available, contact_name: f.contact,
        instagram: f.instagram, facebook: f.facebook, tiktok: f.tiktok, music_url: f.music, website: f.website,
        videos, photos, removedPhotos, phone: f.phone, publish,
      },
      existingId,
    );
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: "Demo mode: everything looks good. Connect Supabase to save profiles for real." });
    router.push("/dashboard/performer");
    router.refresh();
  }

  if (loading) return <div className="wrap py-16 text-slate">Loading your profile…</div>;

  return (
    <div className="wrap pb-[72px] pt-9">
      <p className="eyebrow mb-1.5 text-[13px]">{existingId ? "Edit your profile" : "Performer registration"}</p>
      <h1 className="h-display text-[44px]">{existingId ? "Update your performer profile" : "Build your performer profile"}</h1>
      <p className="mb-8 mt-2.5 max-w-[720px] text-lg text-slate">Bands, solo musicians, DJs, comedians, magicians: this page is your showcase. The more complete it is, the more venues and event planners find you.</p>

      <div className="flex flex-wrap items-start gap-7">
        <aside className="flex max-w-[280px] flex-[1_1_240px] flex-col gap-4 lg:sticky lg:top-6">
          <div className="card p-5">
            <div className="mb-2.5 flex justify-between text-sm font-bold"><span>Profile strength</span><span className="text-brass-dark">{strength}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-navy transition-all" style={{ width: `${strength}%` }} /></div>
            <p className="hint mt-2.5">Videos and a bio make the biggest difference.</p>
          </div>
          <nav aria-label="Registration steps" className="card flex flex-col p-2.5">
            {steps.map(([id, label], i) => (
              <a key={id} href={`#${id}`} className="flex items-center gap-3 rounded-[10px] p-3 font-medium text-navy no-underline hover:bg-parchment">
                <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full border-2 border-line-strong text-[13px] font-bold text-muted">{i + 1}</span>{label}
              </a>
            ))}
          </nav>
        </aside>

        <form onSubmit={(e) => { e.preventDefault(); save(true); }} className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
          <FormCard id="basics" title="1. The basics">
            <label className="label">Act or stage name<input required value={f.name} onChange={(e) => set("name", e.target.value)} className="input" placeholder="e.g. The Night Owls" /></label>
            <ChipGroup legend="What kind of act are you?" single options={["Band", "Solo musician", "Duo", "DJ", "Stand-up comedy", "Magician", "Dancer", "Mariachi", "Other"]} value={actType} onChange={setActType} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Number of members<select value={f.members} onChange={(e) => set("members", e.target.value)} className="input"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option value="6">6+</option></select></label>
              <label className="label">Contact person<input value={f.contact} onChange={(e) => set("contact", e.target.value)} className="input" /></label>
              <label className="label">Phone <span className="hint">Private. Never shown on your profile.</span><input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} className="input" placeholder="514-555-0123" /></label>
            </div>
            <ChipGroup legend="Languages you perform in" options={["Français", "English", "Español", "Other"]} value={languages} onChange={setLanguages} />
          </FormCard>

          <FormCard id="style" title="2. Your style">
            <ChipGroup legend="Genres" hint="Pick up to 5" options={["Rock", "Pop", "Jazz", "Blues", "Country", "80s / 90s", "Latin", "Hip-hop", "Electronic", "Folk / trad québécois", "Metal", "R&B / soul"]} value={genres} onChange={(g) => setGenres(g.slice(0, 5))} />
            <fieldset>
              <legend className="mb-2.5 text-sm font-bold">Repertoire</legend>
              <div className="flex flex-wrap gap-[18px]">
                {["Covers", "Originals", "Both"].map((r) => (
                  <label key={r} className="flex items-center gap-2"><input type="radio" name="rep" value={r} checked={f.rep === r} onChange={() => set("rep", r)} className="h-[18px] w-[18px] accent-navy" />{r}</label>
                ))}
              </div>
            </fieldset>
            <label className="label">Short bio <span className="hint">What makes your show great? 500 characters max.</span>
              <textarea rows={4} maxLength={500} value={f.bio} onChange={(e) => set("bio", e.target.value)} className="input" placeholder="Tell bookers about your act: who you are, the vibe of your show, the crowds you love playing for." />
              <span className="hint text-right">{f.bio.length} / 500</span>
            </label>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Typical set length<select value={f.setLength} onChange={(e) => set("setLength", e.target.value)} className="input"><option>45 min</option><option>1 hour</option><option>2 × 45 min</option><option>3 hours +</option></select></label>
              <label className="label">Typical fee <span className="hint">Optional. Only shown as a range.</span><select value={f.fee} onChange={(e) => set("fee", e.target.value)} className="input"><option>Prefer not to say</option><option>Under $300</option><option>$300 – $600</option><option>$600 – $1,000</option><option>$1,000+</option></select></label>
            </div>
            <label className="flex items-center gap-2.5 font-medium"><input type="checkbox" checked={f.ownSound} onChange={(e) => set("ownSound", e.target.checked)} className="h-[18px] w-[18px] accent-navy" />We bring our own sound system</label>
          </FormCard>

          <FormCard id="photos" title="3. Photos">
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
            <Dropzone files={photos} onFiles={(fs) => setPhotos(fs.slice(0, Math.max(0, 12 - savedPhotos.length)))} hint="JPG or PNG, up to 10 MB each. Up to 12 photos. Live shots work best. The first photo is your cover." />
          </FormCard>

          <FormCard id="videos" title="4. Videos and links">
            <p className="text-slate">Paste YouTube links of your live performances. Bookers decide mostly from videos, so show them your best 3 to 5.</p>
            <div className="flex flex-wrap items-end gap-2.5">
              <label className="label flex-[1_1_320px]">YouTube link
                <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVideo())} className="input" placeholder="https://www.youtube.com/watch?v=…" />
              </label>
              <Button onClick={addVideo}>Add video</Button>
            </div>
            {videoError && <Notice kind="error">{videoError}</Notice>}
            {videos.map((v, i) => (
              <div key={v.youtube_url + i} className="flex flex-wrap items-center gap-3.5 rounded-xl border border-line p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${ytId(v.youtube_url)}/mqdefault.jpg`} alt="" className="aspect-video w-[140px] flex-none rounded-lg bg-navy object-cover" />
                <input aria-label="Video title" value={v.title} onChange={(e) => setVideos(videos.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} className="input flex-[1_1_200px]" />
                <button type="button" onClick={() => setVideos(videos.map((x, j) => ({ ...x, featured: j === i })))} className={`min-h-10 rounded-full px-3.5 text-sm ${v.featured ? "border border-navy bg-brass-tint font-bold" : "border border-line-strong"}`}>{v.featured ? "★ Featured" : "☆ Make featured"}</button>
                <button type="button" aria-label="Remove video" onClick={() => setVideos(videos.filter((_, j) => j !== i))} className="min-h-10 rounded-[10px] border border-line-strong px-3">✕</button>
              </div>
            ))}
            <div className="flex flex-col gap-3 rounded-2xl bg-parchment p-5">
              <span className="text-sm font-bold text-brass-dark">PREVIEW: how your showcase appears on your profile</span>
              {videos.find((v) => v.featured) ? (
                <VideoBox url={videos.find((v) => v.featured)!.youtube_url} title="Featured video" />
              ) : (
                <div className="flex aspect-[16/7] items-center justify-center gap-3 rounded-xl bg-navy text-white"><PlayIcon color="#D9A441" /> Add a video to see your showcase</div>
              )}
            </div>
            <h3 className="mt-2 text-[17px] font-bold">Other links</h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
              <label className="label">Instagram<input type="url" value={f.instagram} onChange={(e) => set("instagram", e.target.value)} className="input" placeholder="https://instagram.com/…" /></label>
              <label className="label">Facebook<input type="url" value={f.facebook} onChange={(e) => set("facebook", e.target.value)} className="input" placeholder="https://facebook.com/…" /></label>
              <label className="label">TikTok<input type="url" value={f.tiktok} onChange={(e) => set("tiktok", e.target.value)} className="input" placeholder="https://tiktok.com/@…" /></label>
              <label className="label">Spotify or SoundCloud<input type="url" value={f.music} onChange={(e) => set("music", e.target.value)} className="input" placeholder="Link to your music" /></label>
              <label className="label">Website<input type="url" value={f.website} onChange={(e) => set("website", e.target.value)} className="input" placeholder="https://" /></label>
            </div>
          </FormCard>

          <FormCard id="where" title="5. Where you play">
            <label className="label">Home base <span className="hint">City or postal code. Only your city is shown publicly.</span><input value={f.base} onChange={(e) => set("base", e.target.value)} className="input" /></label>
            <label className="label">How far will you travel? <span className="font-display text-[28px] text-navy">{radius} km</span>
              <input type="range" min={5} max={150} step={5} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-navy" />
            </label>
            <div className="relative h-[280px] overflow-hidden rounded-2xl border border-line bg-[#E9EDE6]" aria-hidden="true">
              <div className="absolute inset-x-0 top-[46%] h-2.5 bg-white" />
              <div className="absolute inset-y-0 left-[38%] w-2.5 bg-white" />
              <div className="absolute left-1/2 top-1/2 rounded-full border-2 border-navy bg-navy/10 transition-all" style={{ width: circle, height: circle, marginLeft: -circle / 2, marginTop: -circle / 2 }} />
              <div className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-white bg-navy" />
            </div>
          </FormCard>

          <FormCard id="events" title="6. Events and availability">
            <ChipGroup legend="Which events do you play?" options={["Pubs and bars", "Restaurants", "Private parties", "Quinceañeras", "Weddings", "Corporate events", "Festivals", "Kids' parties"]} value={eventTypes} onChange={setEventTypes} />
            <ChipGroup legend="Days you're usually available" options={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} value={days} onChange={setDays} />
            <div className="flex items-center justify-between gap-4 rounded-xl bg-parchment p-4">
              <div className="flex flex-col gap-1"><span className="font-bold">Show me as available for gigs</span><span className="hint">You appear in searches and receive matching event requests.</span></div>
              <button type="button" role="switch" aria-checked={available} aria-label="Available for gigs" onClick={() => setAvailable(!available)} className={`relative h-[30px] w-[52px] flex-none rounded-full transition-colors ${available ? "bg-navy" : "bg-line-strong"}`}>
                <span className={`absolute top-[3px] h-6 w-6 rounded-full bg-white transition-all ${available ? "right-[3px]" : "left-[3px]"}`} />
              </button>
            </div>
          </FormCard>

          <FormCard id="publish" title="7. Review and publish">
            <div className="flex flex-wrap items-center gap-4 rounded-[14px] border border-line p-4">
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-ph-1 font-extrabold">{f.name ? f.name[0] : "?"}</div>
              <div className="flex flex-[1_1_200px] flex-col gap-1"><span className="h-display text-xl">{f.name || "Your act name"}</span><span className="hint">{actType[0]} · {genres.join(", ")} · travels {radius} km · {videos.length} videos · {photoCount} photos</span></div>
              {existingId && <span className={`rounded-full px-3 py-1 text-sm font-bold ${published ? "bg-success text-success-ink" : "bg-line"}`}>{published ? "Published" : "Draft"}</span>}
            </div>
            <label className="flex items-start gap-2.5 text-sm text-slate"><input type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-navy" />I confirm I have the rights to the photos and videos, and I agree to the <a href="#">Terms</a>.</label>
            {status && <Notice kind={status.kind}>{status.msg}</Notice>}
            <div className="flex flex-wrap justify-end gap-2.5">
              <Button variant="secondary" disabled={busy || !f.name} onClick={() => save(false)}>Save as draft</Button>
              <Button type="submit" disabled={busy} className="px-7 text-base">{busy ? "Saving…" : existingId ? "Save and publish" : "Publish my profile"}</Button>
            </div>
          </FormCard>
        </form>
      </div>
    </div>
  );
}
