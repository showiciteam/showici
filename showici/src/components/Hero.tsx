"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();
  const router = useRouter();
  const [what, setWhat] = useState("/performers");
  const [type, setType] = useState("");
  const [radius, setRadius] = useState("50");

  return (
    <section className="wrap pb-14 pt-[72px]">
      <p className="eyebrow mb-[18px] text-[13px]">{t("hero.eyebrow")}</p>
      <h1 className="h-display max-w-[920px] text-[clamp(42px,7vw,88px)] leading-[0.98] tracking-[-0.03em]">
        {t("hero.title1")}
        <br />
        {t("hero.title2")}
      </h1>
      <p className="mt-[22px] max-w-[640px] text-xl leading-normal text-slate">{t("hero.sub")}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = new URLSearchParams({ radius, ...(type ? { type } : {}) });
          router.push(`${what}?${q}`);
        }}
        className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] items-end gap-3 rounded-[18px] border border-line bg-parchment p-3.5"
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
          <input className="input normal-case tracking-normal" defaultValue="Montréal, QC" />
        </label>
        <label className="flex flex-col gap-1.5 px-2 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-muted">
          {t("search.within")}
          <select className="input normal-case tracking-normal" value={radius} onChange={(e) => setRadius(e.target.value)}>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
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
