"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ChipGroup, Dropzone, FormCard, Notice } from "@/components/form";
import { Button, PlayIcon, VideoBox } from "@/components/ui";
import { savePerformer } from "@/lib/actions";

const steps = [
  ["basics", "The basics"], ["style", "Your style"], ["photos", "Photos"], ["videos", "Videos and links"],
  ["where", "Where you play"], ["events", "Events and availability"], ["publish", "Review and publish"],
];

type Video = { youtube_url: string; title: string; featured: boolean };
const ytId = (u: string) => u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1];

export default function RegisterPerformer() {
  const router = useRouter();
  const [actType, setActType] = useState(["Band"]);
  const [languages, setLanguages] = useState(["Français", "English"]);
  const [genres, setGenres] = useState(["Rock", "Pop"]);
  const [eventTypes, setEventTypes] = useState(["Pubs and bars", "Private parties"]);
  const [days, setDays] = useState(["Fri", "Sat"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");
  const [radius, setRadius] = useState(50);
  const [available, setAvailable] = useState(true);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const publishRef = useRef(true);

  const strength = Math.min(100, 30 + (photos.length ? 20 : 0) + Math.min(videos.length, 3) * 10 + (bio.length > 40 ? 20 : 0));
  const circle = 40 + radius * 1.6;

  function addVideo() {
    if (!ytId(videoUrl)) return setVideoError("That doesn't look like a YouTube link.");
    setVideoError("");
    setVideos((v) => [...v, { youtube_url: videoUrl, title: `Video ${v.length + 1}`, featured: v.length === 0 }]);
    setVideoUrl("");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>, publish: boolean) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const res = await savePerformer({
      name, act_type: actType[0], members: Number(f.get("members") || 1), languages, genres,
      repertoire: String(f.get("rep") || "Covers"), bio, set_length: String(f.get("setLength")), fee_range: String(f.get("fee")),
      own_sound: f.get("ownSound") === "on", base_city: String(f.get("base") || "Montréal"), travel_km: radius,
      event_types: eventTypes, available_days: days, available, videos, photos, publish,
    });
    setBusy(false);
    if (!res.ok) return setStatus({ kind: "error", msg: res.error });
    if (res.demo) return setStatus({ kind: "ok", msg: "Demo mode: everything looks good. Connect Supabase to save profiles for real." });
    router.push("/dashboard/performer");
  }

  return (
    <div className="wrap pb-[72px] pt-9">
      <p className="eyebrow mb-1.5 text-[13px]">Performer registration</p>
      <h1 className="h-display text-[44px]">Build your performer profile</h1>
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

        <form onSubmit={(e) => submit(e, publishRef.current)} className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
          <FormCard id="basics" title="1. The basics">
            <label className="label">Act or stage name<input required value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="e.g. The Night Owls" /></label>
            <ChipGroup legend="What kind of act are you?" single options={["Band", "Solo musician", "Duo", "DJ", "Stand-up comedy", "Magician", "Dancer", "Mariachi", "Other"]} value={actType} onChange={setActType} />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Number of members<select name="members" className="input" defaultValue="4"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option value="6">6+</option></select></label>
              <label className="label">Contact person<input name="contact" className="input" /></label>
              <label className="label">Phone <span className="hint">Private. Never shown on your profile.</span><input name="phone" type="tel" className="input" placeholder="514-555-0123" /></label>
            </div>
            <ChipGroup legend="Languages you perform in" options={["Français", "English", "Español", "Other"]} value={languages} onChange={setLanguages} />
          </FormCard>

          <FormCard id="style" title="2. Your style">
            <ChipGroup legend="Genres" hint="Pick up to 5" options={["Rock", "Pop", "Jazz", "Blues", "Country", "80s / 90s", "Latin", "Hip-hop", "Electronic", "Folk / trad québécois", "Metal", "R&B / soul"]} value={genres} onChange={(g) => setGenres(g.slice(0, 5))} />
            <fieldset>
              <legend className="mb-2.5 text-sm font-bold">Repertoire</legend>
              <div className="flex flex-wrap gap-[18px]">
                {["Covers", "Originals", "Both"].map((r, i) => (
                  <label key={r} className="flex items-center gap-2"><input type="radio" name="rep" value={r} defaultChecked={i === 0} className="h-[18px] w-[18px] accent-navy" />{r}</label>
                ))}
              </div>
            </fieldset>
            <label className="label">Short bio <span className="hint">What makes your show great? 500 characters max.</span>
              <textarea rows={4} maxLength={500} value={bio} onChange={(e) => setBio(e.target.value)} className="input" placeholder="Tell bookers about your act: who you are, the vibe of your show, the crowds you love playing for." />
              <span className="hint text-right">{bio.length} / 500</span>
            </label>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              <label className="label">Typical set length<select name="setLength" className="input" defaultValue="2 × 45 min"><option>45 min</option><option>1 hour</option><option>2 × 45 min</option><option>3 hours +</option></select></label>
              <label className="label">Typical fee <span className="hint">Optional. Only shown as a range.</span><select name="fee" className="input" defaultValue="$300 – $600"><option>Prefer not to say</option><option>Under $300</option><option>$300 – $600</option><option>$600 – $1,000</option><option>$1,000+</option></select></label>
            </div>
            <label className="flex items-center gap-2.5 font-medium"><input type="checkbox" name="ownSound" className="h-[18px] w-[18px] accent-navy" />We bring our own sound system</label>
          </FormCard>

          <FormCard id="photos" title="3. Photos">
            <Dropzone files={photos} onFiles={setPhotos} hint="JPG or PNG, up to 10 MB each. Up to 12 photos. Live shots work best. The first photo is your cover." />
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
              {[["Instagram", "instagram.com/…"], ["Facebook", "facebook.com/…"], ["TikTok", "tiktok.com/@…"], ["Spotify or SoundCloud", "Link to your music"], ["Website", "https://"]].map(([l, ph]) => (
                <label key={l} className="label">{l}<input type="url" className="input" placeholder={ph} /></label>
              ))}
            </div>
          </FormCard>

          <FormCard id="where" title="5. Where you play">
            <label className="label">Home base <span className="hint">City or postal code. Only your city is shown publicly.</span><input name="base" className="input" defaultValue="Montréal, QC" /></label>
            <label className="label">How far will you travel? <span className="font-display text-[28px] text-navy">{radius} km</span>
              <input type="range" min={5} max={150} step={5} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-navy" />
            </label>
            <div className="relative h-[280px] overflow-hidden rounded-2xl border border-line bg-[#E9EDE6]" aria-hidden="true">
              <div className="absolute inset-x-0 top-[46%] h-2.5 bg-white" />
              <div className="absolute inset-y-0 left-[38%] w-2.5 bg-white" />
              <div className="absolute left-1/2 top-1/2 rounded-full border-2 border-navy bg-navy/10 transition-all" style={{ width: circle, height: circle, marginLeft: -circle / 2, marginTop: -circle / 2 }} />
              <div className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border-[3px] border-white bg-navy" />
            </div>
            <label className="flex items-center gap-2.5 font-medium"><input type="checkbox" className="h-[18px] w-[18px] accent-navy" />I&apos;ll travel further for a travel fee</label>
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
              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-ph-1 font-extrabold">{name ? name[0] : "?"}</div>
              <div className="flex flex-[1_1_200px] flex-col gap-1"><span className="h-display text-xl">{name || "Your act name"}</span><span className="hint">{actType[0]} · {genres.join(", ")} · travels {radius} km · {videos.length} videos · {photos.length} photos</span></div>
            </div>
            <label className="flex items-start gap-2.5 text-sm text-slate"><input type="checkbox" required className="mt-0.5 h-[18px] w-[18px] flex-none accent-navy" />I confirm I have the rights to the photos and videos, and I agree to the <a href="#">Terms</a>.</label>
            {status && <Notice kind={status.kind}>{status.msg}</Notice>}
            <div className="flex flex-wrap justify-end gap-2.5">
              <Button type="submit" variant="secondary" onClick={() => (publishRef.current = false)}>Save draft</Button>
              <Button type="submit" disabled={busy} onClick={() => (publishRef.current = true)} className="px-7 text-base">{busy ? "Saving…" : "Publish my profile"}</Button>
            </div>
          </FormCard>
        </form>
      </div>
    </div>
  );
}
