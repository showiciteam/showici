"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { youTubeId } from "@/lib/youtube";

/** Full-screen overlay with a close button; Esc, the button or a click outside closes it. */
function Overlay({ onClose, label, children }: { onClose: () => void; label: string; children: React.ReactNode }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(8,14,28,0.92)] p-3 sm:p-8" onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-6 sm:top-6">
        ×
      </button>
      <div className="relative flex max-h-full w-full max-w-[1200px] flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function PlayBadge({ big }: { big?: boolean }) {
  return (
    <span className={`flex items-center justify-center rounded-full bg-[rgba(20,33,61,0.85)] shadow-lg ring-2 ring-white/70 transition group-hover:scale-105 group-hover:bg-navy ${big ? "h-[72px] w-[72px]" : "h-12 w-12"}`}>
      <svg viewBox="0 0 24 24" className={big ? "ml-1 h-8 w-8" : "ml-0.5 h-5 w-5"} fill="#A485FF" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
    </span>
  );
}

/**
 * A video shown as a preview picture with a play button. Clicking opens it in a pop-up
 * player. YouTube links get their real thumbnail; other links open in a new tab.
 */
export function VideoPreview({ url, title, length, big = false }: { url?: string; title?: string; length?: string; big?: boolean }) {
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState<"max" | "hq" | "none">("max");
  const id = youTubeId(url);
  const close = useCallback(() => setOpen(false), []);

  const caption = (title || length) && (
    <span className="flex items-baseline justify-between gap-2 text-left">
      {title && <span className={`font-bold text-navy ${big ? "text-[17px]" : "text-[15px]"}`}>{title}</span>}
      {length && <span className="text-sm text-muted">{length}</span>}
    </span>
  );

  if (!id) {
    if (!url) return null;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2 no-underline">
        <span className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-navy"><PlayBadge big={big} /></span>
        {caption}
      </a>
    );
  }

  const src = thumb === "max" ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group flex w-full flex-col gap-2 text-left" aria-label={`Play video${title ? `: ${title}` : ""}`}>
        <span className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-navy">
          {thumb !== "none" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              onLoad={(e) => {
                // YouTube serves a 120px grey placeholder when the HD thumbnail doesn't exist.
                if (thumb === "max" && e.currentTarget.naturalWidth < 200) setThumb("hq");
              }}
              onError={() => setThumb(thumb === "max" ? "hq" : "none")}
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-[rgba(20,33,61,0.45)] to-transparent" />
          <span className="relative"><PlayBadge big={big} /></span>
          {length && !big && <span className="absolute bottom-2 right-2 rounded bg-navy px-1.5 py-0.5 text-xs text-white">{length}</span>}
        </span>
        {caption}
      </button>
      {open && (
        <Overlay onClose={close} label={title || "Video"}>
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title || "Video"}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          {title && <p className="mt-3 text-center text-white">{title}</p>}
        </Overlay>
      )}
    </>
  );
}

/** Full-screen photo viewer: arrows, keyboard, swipe and a thumbnail strip. */
export function Lightbox({ photos, start, onClose, alt }: { photos: string[]; start: number; onClose: () => void; alt: string }) {
  const [i, setI] = useState(start);
  const touchX = useRef<number | null>(null);
  const n = photos.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const arrow = "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/25";
  return (
    <Overlay onClose={onClose} label={`${alt} photos`}>
      <div
        className="relative flex w-full items-center justify-center"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[i]} alt={`${alt}, photo ${i + 1} of ${n}`} className="max-h-[78vh] max-w-full select-none rounded-lg object-contain shadow-2xl" draggable={false} />
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${arrow} left-0 sm:-left-2`}>‹</button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${arrow} right-0 sm:-right-2`}>›</button>
          </>
        )}
      </div>
      <p className="mt-3 text-sm tabular-nums text-white/80">{i + 1} / {n}</p>
      {n > 1 && (
        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto pb-1">
          {photos.map((src, k) => (
            <button key={src} type="button" onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`h-14 w-20 flex-none overflow-hidden rounded-md ring-2 ${k === i ? "ring-brass" : "ring-transparent opacity-60 hover:opacity-100"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </Overlay>
  );
}

/**
 * Photos that open in the full-screen viewer when clicked.
 * "hero" is the venue header collage (adapts to how many photos there are); "grid" is a plain grid.
 */
export function PhotoGallery({ photos, alt, layout = "grid" }: { photos: string[]; alt: string; layout?: "hero" | "grid" }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!photos.length) return null;

  const tile = (src: string, k: number, cls = "", overlay?: React.ReactNode) => (
    <button key={src} type="button" onClick={() => setOpen(k)} aria-label={`Open photo ${k + 1} of ${photos.length}`} className={`group relative overflow-hidden ${cls}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
      {overlay}
    </button>
  );

  let body: React.ReactNode;
  if (layout === "grid") {
    body = (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2.5">
        {photos.map((src, k) => tile(src, k, "aspect-square rounded-xl"))}
      </div>
    );
  } else if (photos.length === 1) {
    body = <div className="h-[220px] overflow-hidden rounded-[18px] sm:h-[320px]">{tile(photos[0], 0, "h-full w-full")}</div>;
  } else if (photos.length === 2) {
    body = <div className="grid h-[200px] grid-cols-2 gap-2.5 overflow-hidden rounded-[18px] sm:h-[320px]">{photos.map((s, k) => tile(s, k, "h-full w-full"))}</div>;
  } else {
    const shown = photos.slice(0, 5);
    const extra = photos.length - shown.length;
    const small = shown.slice(1);
    body = (
      <div className={`grid h-[220px] gap-2.5 overflow-hidden rounded-[18px] sm:h-[320px] ${small.length >= 4 ? "grid-cols-2 grid-rows-2 sm:grid-cols-4" : "grid-cols-2 grid-rows-2 sm:grid-cols-3"}`}>
        {tile(shown[0], 0, "col-span-2 row-span-2 h-full w-full max-sm:col-span-2 max-sm:row-span-2")}
        {small.map((s, j) =>
          tile(
            s,
            j + 1,
            `hidden h-full w-full sm:block ${small.length === 2 ? "sm:row-span-2" : ""} ${small.length === 3 && j === 2 ? "sm:col-span-1" : ""}`,
            j === small.length - 1 && extra > 0 ? <span className="absolute inset-0 flex items-center justify-center bg-[rgba(20,33,61,0.55)] text-lg font-bold text-white">+{extra} photos</span> : undefined,
          ),
        )}
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {body}
        {layout === "hero" && photos.length > 1 && (
          <button type="button" onClick={() => setOpen(0)} className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-bold text-navy shadow">
            View all {photos.length} photos
          </button>
        )}
      </div>
      {open !== null && <Lightbox photos={photos} start={open} alt={alt} onClose={() => setOpen(null)} />}
    </>
  );
}
