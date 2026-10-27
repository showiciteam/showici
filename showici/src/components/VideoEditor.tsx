"use client";

import { useState } from "react";
import { Notice } from "@/components/form";
import { Button, PlayIcon } from "@/components/ui";
import { VideoPreview } from "@/components/Media";
import { youTubeId } from "@/lib/youtube";

export type EditableVideo = { youtube_url: string; title: string; featured: boolean };

/**
 * Add YouTube links, give them titles, pick the featured one, and see a live preview of how they'll
 * look on the public page. Shared by the performer and venue forms.
 */
export function VideoEditor({ videos, onChange, intro, previewLabel, titlePlaceholder = "e.g. Live at Bar Le Ritz", max = 10 }: {
  videos: EditableVideo[];
  onChange: (next: EditableVideo[] | ((prev: EditableVideo[]) => EditableVideo[])) => void;
  intro: string;
  previewLabel: string;
  titlePlaceholder?: string;
  max?: number;
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoError, setVideoError] = useState("");

  async function addVideo() {
    const url = videoUrl.trim();
    if (!youTubeId(url)) return setVideoError("That doesn't look like a YouTube link.");
    if (videos.length >= max) return setVideoError(`You can add up to ${max} videos.`);
    if (videos.some((v) => youTubeId(v.youtube_url) === youTubeId(url))) return setVideoError("That video is already in your list.");
    setVideoError("");
    onChange((v) => [...v, { youtube_url: url, title: "", featured: v.length === 0 }]);
    setVideoUrl("");
    // Fill in the real YouTube title so the page doesn't say "Video 2".
    try {
      const r = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
      const d = await r.json();
      if (d?.title) onChange((v) => v.map((x) => (x.youtube_url === url && !x.title ? { ...x, title: String(d.title).slice(0, 80) } : x)));
    } catch {
      // keep it empty; the person can type a title
    }
  }

  const featured = videos.find((v) => v.featured) ?? videos[0];

  return (
    <>
      <p className="text-slate">{intro}</p>
      <div className="flex flex-wrap items-end gap-2.5">
        <label className="label flex-[1_1_320px]">YouTube link
          <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVideo())} className="input" placeholder="https://www.youtube.com/watch?v=…" />
        </label>
        <Button onClick={addVideo}>Add video</Button>
      </div>
      {videoError && <Notice kind="error">{videoError}</Notice>}
      {videos.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {videos.map((v, i) => (
            <li key={v.youtube_url + i} className={`flex flex-wrap items-center gap-3.5 rounded-xl border p-2.5 ${v.featured ? "border-brass bg-brass-tint/40" : "border-line bg-white"}`}>
              <span className="relative flex-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${youTubeId(v.youtube_url)}/mqdefault.jpg`} alt="" className="aspect-video w-[132px] rounded-lg bg-navy object-cover" />
                {v.featured && <span className="absolute left-1.5 top-1.5 rounded bg-navy px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">FEATURED</span>}
              </span>
              <label className="flex min-w-0 flex-[1_1_200px] flex-col gap-1 text-xs font-bold text-muted">Title
                <input value={v.title} placeholder={titlePlaceholder} onChange={(e) => onChange(videos.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} className="input py-2.5 text-[15px]" />
              </label>
              <span className="flex gap-2">
                {!v.featured && <button type="button" onClick={() => onChange(videos.map((x, j) => ({ ...x, featured: j === i })))} className="min-h-10 rounded-full border border-line-strong px-3.5 text-sm font-bold text-navy hover:border-navy">☆ Make featured</button>}
                <button type="button" aria-label="Remove video" onClick={() => onChange(videos.filter((_, j) => j !== i).map((x, j, arr) => ({ ...x, featured: arr.some((y) => y.featured) ? x.featured : j === 0 })))} className="min-h-10 rounded-[10px] border border-line-strong px-3">✕</button>
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-3 rounded-2xl bg-parchment p-5">
        <span className="text-sm font-bold text-brass-dark">{previewLabel}</span>
        {featured ? (
          <>
            <VideoPreview url={featured.youtube_url} title={featured.title || "Featured video"} big />
            {videos.length > 1 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
                {videos.filter((v) => v !== featured).map((v, i) => <VideoPreview key={v.youtube_url + i} url={v.youtube_url} title={v.title || `Video ${i + 2}`} />)}
              </div>
            )}
          </>
        ) : (
          <div className="flex aspect-[16/7] items-center justify-center gap-3 rounded-xl bg-navy text-white"><PlayIcon color="#D9A441" /> Add a video to see the preview</div>
        )}
      </div>
    </>
  );
}
