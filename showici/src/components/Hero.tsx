"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { ALL_QUEBEC, REGIONS } from "@/lib/regions";

export function Hero() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [what, setWhat] = useState("/performers");
  const [type, setType] = useState("");
  const [region, setRegion] = useState("montreal");
  const [radius, setRadius] = useState("50");
  const video = useRef<HTMLVideoElement>(null);

  // Respect "reduce motion": show the still frame instead of the looping video.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause();
  }, []);

  return (
    <section className="wrap pb-14 pt-8">
      <div className="@container relative overflow-hidden rounded-[18px] border border-line bg-navy">
        <video
          ref={video}
          className="block aspect-[1600/840] w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/hero/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
        {/* The banner wording sits on top of the video as text, so it follows the FR / EN switch. */}
        <div className="absolute inset-0 flex items-center justify-center p-[3cqw]">
          <div className="rounded-[14px] bg-black/85 px-[4cqw] py-[3cqw] text-center shadow-[0_0_60px_30px_rgba(0,0,0,0.55)]">
            <h1 className="font-display font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-[clamp(20px,4.6cqw,76px)]">
              <span className="block text-white">{t("hero.title1")}</span>
              <span className="block bg-[linear-gradient(90deg,#1FD8F5_0%,#A485FF_45%,#F23FD2_100%)] bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="mt-[1.6cqw] font-semibold text-white/95 text-[clamp(12px,1.7cqw,27px)]">{t("hero.banner")}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = new URLSearchParams({ region, ...(region === ALL_QUEBEC ? {} : { radius }), ...(type ? { type } : {}) });
          router.push(`${what}?${q}`);
        }}
        className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] items-end gap-3 rounded-[18px] border border-line bg-parchment p-3.5"
      >
        <label className="flex flex-col gap-1.5 px-2 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-muted">
          {t("search.lookingFor")}
          <select className="input normal-case tracking-normal" value={what} onChange={(e) => setWhat(e.target.value)}>
            <option value="/performers">Performers</option>
            <option value="/venues">Venues</option>
            <option value="/shows">Upcoming shows</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 px-2 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-muted">
          {t("search.type")}
          <select className="input normal-case tracking-normal" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All acts</option>
            <option>Band</option>
            <option>DJ</option>
            <option>Stand-up comedy</option>
            <option>Magician</option>
            <option>Duo</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 px-2 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-muted">
          {t("search.near")}
          <select className="input normal-case tracking-normal" value={region} onChange={(e) => setRegion(e.target.value)}>
            {REGIONS.map((r) => <option key={r.key} value={r.key}>{lang === "fr" ? r.fr : r.en}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 px-2 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-muted">
          {t("search.within")}
          <select className="input normal-case tracking-normal" value={radius} disabled={region === ALL_QUEBEC} onChange={(e) => setRadius(e.target.value)}>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
            <option value="200">200 km</option>
          </select>
        </label>
        <button type="submit" className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-navy px-5 text-[17px] font-bold text-white hover:bg-navy-deep">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          {t("search.go")}
        </button>
      </form>
    </section>
  );
}
