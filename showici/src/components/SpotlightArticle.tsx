"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Placeholder, VideoBox } from "@/components/ui";
import { FollowCard, ShareMenu } from "@/components/Social";
import { useLang } from "@/lib/i18n";
import type { Story } from "@/lib/types";

/** A real Spotlight interview, shown in the visitor's language. A ?lang=fr or ?lang=en link opens it in that language. */
export function SpotlightArticleView({ s, more }: { s: Story; more: Story[] }) {
  const { lang, setLang } = useLang();
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("lang");
    if ((want === "fr" || want === "en") && want !== lang) setLang(want);
    // Only on first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const art = s.article!;
  const a = art[lang];
  const fr = lang === "fr";
  const quoteAfter = Math.min(3, a.qa.length - 1);
  const photosAfter = Math.min(7, a.qa.length - 1);

  return (
    <>
      <article className="mx-auto max-w-[780px] px-6 pb-10 pt-10">
        <Link href="/spotlight" className="font-bold no-underline">← Spotlight Time</Link>
        <p className="eyebrow mb-2.5 mt-[22px] text-[13px]">{a.category} · {s.city}</p>
        <h1 className="h-display text-[clamp(36px,5vw,54px)] leading-[1.05]">{a.title}</h1>
        <p className="mt-4 font-display text-[22px] font-normal leading-normal text-slate">{a.dek}</p>
        <div className="my-6 flex flex-wrap items-center gap-3.5 border-y border-line py-4">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-navy font-display text-sm font-extrabold text-brass">SI</span>
          <span className="flex-1 text-[15px]"><strong>{fr ? "Entrevue par ShowIci" : "Interview by ShowIci"}</strong><br /><span className="text-muted">{a.date} · {a.read}</span></span>
          <ShareMenu title={a.title} caption={fr ? `${art.artist} à l'affiche sur ShowIci : ${a.title}` : `${art.artist} in the ShowIci Spotlight: ${a.title}`} />
        </div>
      </article>
      {art.videos[0] && (
        <div className="mx-auto max-w-[1040px] px-6">
          <VideoBox url={art.videos[0].url} title={art.videos[0][lang]} big />
          <p className="mt-2 text-center text-sm text-muted">{art.videos[0][lang]}</p>
        </div>
      )}
      <article className="mx-auto max-w-[780px] px-6 pb-14 pt-6 text-lg leading-[1.7] text-ink-2">
        {a.qa.map((item, i) => (
          <div key={item.q}>
            <p className="mb-2 mt-7 font-bold text-navy">{item.q}</p>
            {Array.isArray(item.a) ? <ul className="list-disc pl-6">{item.a.map((x) => <li key={x}>{x}</li>)}</ul> : <p>{item.a}</p>}
            {i === quoteAfter && (
              <blockquote className="my-9 border-l-4 border-brass pl-6 font-display text-[28px] font-semibold leading-snug text-navy">&ldquo;{a.quote}&rdquo;</blockquote>
            )}
            {i === photosAfter && art.photos.length > 0 && (
              <div className="my-8 grid grid-cols-2 gap-2.5">
                {art.photos.map((p) => (
                  <figure key={p.src} className="m-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={`${art.artist}: ${p[lang]}`} className="aspect-[4/3] w-full rounded-[14px] object-cover" />
                    <figcaption className="mt-1.5 text-sm text-muted">{p[lang]}{p.credit ? ` · ${p.credit}` : ""}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        ))}
        {art.videos.length > 1 && (
          <div className="mt-10">
            <p className="mb-3 font-bold text-navy">{fr ? `${art.artist} sur scène` : `More of ${art.artist} live`}</p>
            {art.videos.slice(1).map((v) => (
              <div key={v.url}><VideoBox url={v.url} title={v[lang]} /><p className="mt-2 text-sm text-muted">{v[lang]}</p></div>
            ))}
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-[18px] border border-line bg-white p-5 text-navy">
          <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-navy font-display font-extrabold text-brass">{art.artist[0]}</span>
          <span className="flex-[1_1_220px] text-base"><strong className="text-lg">{fr ? `Suivez ${art.artist}` : `Follow ${art.artist}`}</strong><br /><span className="text-muted">{fr ? "Synth-pop · Auteure-compositrice-interprète · Montréal" : "Synth-pop · Singer-songwriter · Montréal"}</span></span>
          <span className="flex flex-wrap gap-2">
            {art.performerId && (
              <Link href={`/performers/${art.performerId}`} className="rounded-[10px] bg-brass px-4 py-2.5 text-[15px] font-bold text-navy no-underline hover:text-navy">{fr ? "Profil ShowIci" : "ShowIci profile"}</Link>
            )}
            {art.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="rounded-[10px] bg-navy px-4 py-2.5 text-[15px] font-bold text-white no-underline hover:text-white">{l.label}</a>
            ))}
          </span>
        </div>
      </article>
      <section className="border-t border-line bg-parchment">
        <div className="wrap flex flex-col gap-5 pb-16 pt-12">
          <FollowCard context="spotlight" />
          <h2 className="h-display text-[28px]">{fr ? "Plus de Spotlight Time" : "More from Spotlight Time"}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px]">
            {more.map((m) => (
              <Link key={m.slug} href={`/spotlight/${m.slug}`} className="flex flex-col gap-2.5 text-navy no-underline hover:text-navy">
                <Placeholder tone={m.tone} className="aspect-[16/10] rounded-[14px]" />
                <span className="eyebrow">{m.category} · {m.city}</span>
                <span className="h-display text-xl">{m.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
