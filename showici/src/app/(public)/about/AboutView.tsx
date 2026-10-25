"use client";

import Link from "next/link";
import { about } from "@/lib/about";
import { useLang } from "@/lib/i18n";
import { FollowCard } from "@/components/Social";

/** About page body: follows the FR / EN switch in the header. */
export function AboutView() {
  const { lang: raw } = useLang();
  const t = about[raw === "fr" ? "fr" : "en"];
  return (
    <div className="pb-[72px]">
      <header className="wrap max-w-[860px] pt-12 text-center">
        <p className="eyebrow mb-2">{t.eyebrow}</p>
        <h1 className="h-display text-[40px] sm:text-[52px]">{t.title}</h1>
        <p className="mx-auto mt-5 max-w-[720px] text-lg leading-relaxed text-slate">{t.lede}</p>
      </header>

      <section className="wrap mt-14 max-w-[860px]">
        <h2 className="h-display mb-4 text-[30px]">{t.missionTitle}</h2>
        <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-2">
          {t.mission.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="wrap mt-14">
        <h2 className="h-display mb-5 text-[30px]">{t.whoTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
          {t.who.map((w) => (
            <div key={w.h} className="card flex flex-col gap-2 p-6">
              <h3 className="text-xl font-bold">{w.h}</h3>
              <p className="leading-relaxed text-slate">{w.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-parchment py-14">
        <div className="wrap">
          <h2 className="h-display mb-5 text-[30px]">{t.howTitle}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
            {t.how.map((g) => (
              <div key={g.h} className="flex flex-col gap-3 rounded-[18px] bg-white p-6">
                <h3 className="text-xl font-bold">{g.h}</h3>
                <ol className="flex flex-col gap-3">
                  {g.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 leading-relaxed text-ink-2">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brass-tint text-sm font-bold text-navy">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap mt-14">
        <h2 className="h-display mb-5 text-[30px]">{t.valuesTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-8 gap-y-6">
          {t.values.map((v) => (
            <div key={v.h} className="flex flex-col gap-1.5 border-t-2 border-brass pt-4">
              <h3 className="text-lg font-bold">{v.h}</h3>
              <p className="leading-relaxed text-slate">{v.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mt-14 max-w-[860px]">
        <h2 className="h-display mb-4 text-[30px]">{t.whereTitle}</h2>
        <p className="text-[17px] leading-relaxed text-ink-2">{t.where}</p>
      </section>

      <section className="wrap mt-14 flex max-w-[860px] flex-col gap-3">
        <h2 className="h-display mb-1.5 text-[30px]">{t.faqTitle}</h2>
        {t.faq.map(([q, a], i) => (
          <details key={q} open={i === 0} className="rounded-[14px] border border-line bg-white px-5 py-[18px]">
            <summary className="cursor-pointer font-bold">{q}</summary>
            <p className="mt-2.5 text-slate">{a}</p>
          </details>
        ))}
      </section>

      <section className="wrap mt-14 max-w-[860px]">
        <FollowCard context="about" />
      </section>

      <section className="wrap mt-14">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-navy px-8 py-12 text-center text-white">
          <h2 className="font-display text-[34px] font-extrabold tracking-tight">{t.ctaTitle}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {t.cta.map((c, i) => (
              <Link key={c.href} href={c.href} className={`rounded-xl px-6 py-3.5 text-[16px] font-bold no-underline ${i === 0 ? "bg-brass text-navy hover:text-navy" : "bg-white text-navy hover:text-navy"}`}>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
