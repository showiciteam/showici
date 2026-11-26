"use client";

import Link from "@/components/Link";
import { about } from "@/lib/about";
import { useLang } from "@/lib/i18n";
import { FollowCard } from "@/components/Social";
import { PageHero, RedBand } from "@/components/sections";

/** About page body: follows the FR / EN switch in the header. */
export function AboutView() {
  const { lang: raw } = useLang();
  const t = about[raw === "fr" ? "fr" : "en"];
  return (
    <div className="pb-0">
      <PageHero image="/images/stage-band.webp" title={t.eyebrow} accent={t.title} lead={t.lede} />

      <section className="wrap mt-14 max-w-[860px]">
        <h2 className="h-display mb-4 text-[30px]">{t.missionTitle}</h2>
        <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-graphite">
          {t.mission.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className="wrap mt-14">
        <h2 className="h-display mb-5 text-[30px]">{t.whoTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
          {t.who.map((w) => (
            <div key={w.h} className="card flex flex-col gap-2 p-6">
              <h3 className="text-xl font-bold"><span className="mr-2 text-accent">●</span>{w.h}</h3>
              <p className="leading-relaxed text-slate">{w.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-sand py-14">
        <div className="wrap">
          <h2 className="h-display mb-5 text-[30px]">{t.howTitle}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
            {t.how.map((g) => (
              <div key={g.h} className="flex flex-col gap-3 rounded-[18px] bg-white p-6">
                <h3 className="text-xl font-bold">{g.h}</h3>
                <ol className="flex flex-col gap-3">
                  {g.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 leading-relaxed text-graphite">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-accent text-sm font-bold text-white">{i + 1}</span>
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
            <div key={v.h} className="flex flex-col gap-1.5 border-t-2 border-accent pt-4">
              <h3 className="text-lg font-bold">{v.h}</h3>
              <p className="leading-relaxed text-slate">{v.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap mt-14 max-w-[860px]">
        <h2 className="h-display mb-4 text-[30px]">{t.whereTitle}</h2>
        <p className="text-[17px] leading-relaxed text-graphite">{t.where}</p>
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

      <div className="mt-14">
        <RedBand title={t.ctaTitle}>
          <div className="flex flex-wrap gap-3">
            {t.cta.map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={`rounded-full px-6 py-3 text-[16px] font-bold no-underline ${i === 0 ? "bg-white text-accent-dark hover:text-accent-dark" : "border-2 border-white text-white hover:text-white"}`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </RedBand>
      </div>
    </div>
  );
}
