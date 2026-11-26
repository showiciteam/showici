import type { Metadata } from "next";
import { StoryCard } from "@/components/cards";
import Link from "@/components/Link";
import { PageHero, PillLink, SectionHead } from "@/components/sections";
import { FollowButtons } from "@/components/Social";
import { getStories } from "@/lib/data";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";

const copy = {
  fr: {
    seoTitle: "ShowIci Spotlight : entrevues avec les artistes et les salles d’ici",
    seoDescription: "Entrevues avec les artistes, les propriétaires de salles et les gens qui font vivre le spectacle au Québec. De nouvelles histoires en français et en anglais.",
    eyebrow: "ShowIci Spotlight / À l’affiche",
    title: "Les gens derrière",
    accent: "la scène.",
    lead: "Des entrevues avec les artistes, les propriétaires de salles et les gens qui font vivre le spectacle d’ici. De nouvelles histoires, en français et en anglais.",
    featured: "Entrevue en vedette",
    read: "Lire l’entrevue",
    video: "Vidéo",
    latest: "Nos dernières entrevues",
    nominateTitle: <>Quelqu’un mérite d’être <span className="text-accent-bright">à l’affiche</span>?</>,
    nominateText: "Proposez un artiste, un propriétaire de salle ou toute personne qui rend votre scène locale meilleure. Nous lisons chaque nomination.",
    nominate: "Soumettre une nomination",
    instaTitle: "En vedette sur Instagram",
    instaText: "Chaque semaine, un artiste ou une salle d’ici sur @showici_ca. Identifiez-nous dans vos publications pour être considéré.",
  },
  en: {
    seoTitle: "ShowIci Spotlight: interviews with local artists and venues",
    seoDescription: "Interviews with performers, venue owners and the people who keep live entertainment alive in Québec. New stories in French and English.",
    eyebrow: "ShowIci Spotlight",
    title: "The people behind",
    accent: "the local stage.",
    lead: "Interviews with performers, venue owners and the people who keep live entertainment alive in your city. New stories, in French and English.",
    featured: "Featured interview",
    read: "Read the interview",
    video: "Video",
    latest: "Latest interviews",
    nominateTitle: <>Know someone who deserves the <span className="text-accent-bright">spotlight</span>?</>,
    nominateText: "Nominate a performer, a venue owner or anyone making your local scene better. We read every nomination.",
    nominate: "Send a nomination",
    instaTitle: "Featured on Instagram",
    instaText: "Every week we feature a local artist or venue on @showici_ca. Tag us in your posts to be considered.",
  },
} satisfies Record<Lang, unknown>;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/spotlight", title: copy[lang].seoTitle, description: copy[lang].seoDescription });
}

export default async function SpotlightPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
  const stories = (await getStories()).filter((x) => !x.draft);
  const featured = stories.find((s) => s.article) ?? stories[0];
  const text = featured?.article?.[lang];
  const rest = stories.filter((s) => s !== featured);

  return (
    <>
      <PageHero image="/images/stage-singer.webp" title={c.title} accent={c.accent} lead={c.lead} bottomSpace="pb-44" />

      {featured && (
        <section className="wrap relative z-10 -mt-32">
          <Link href={`/spotlight/${featured.slug}`} className="flex flex-wrap overflow-hidden rounded-2xl border border-white/10 bg-ink-soft text-white no-underline shadow-[0_20px_40px_rgba(0,0,0,0.45)] hover:text-white">
            <span className="relative min-h-[280px] flex-[1_1_520px] bg-ink">
              {featured.photo.startsWith("/") && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured.photo} alt={featured.article?.artist ?? ""} className="absolute inset-0 h-full w-full object-cover" />
              )}
              {featured.video && <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-[13px] font-bold">▶ {c.video}</span>}
            </span>
            <span className="flex flex-[1_1_420px] flex-col justify-center p-7 sm:p-10">
              <span className="flex flex-wrap items-center gap-3">
                <span className="rounded bg-accent px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide">{c.featured}</span>
                <span className="text-sm text-on-dark">{text?.category ?? featured.category} · {featured.city}</span>
              </span>
              <span className="h-display mt-4 block text-[28px] leading-tight sm:text-[34px]">{text?.title ?? featured.title}</span>
              <span className="mt-3 block leading-relaxed text-on-dark">{text?.dek ?? featured.dek}</span>
              {text?.quote && <span className="mt-5 block border-l-[3px] border-accent pl-4 text-[17px] italic">« {text.quote} »</span>}
              <span className="mt-6 flex flex-wrap items-center gap-5">
                <span className="border-b-2 border-accent pb-1 font-display font-bold">{c.read} →</span>
                <span className="text-[13px] text-on-dark">{text?.date ?? featured.date} · {text?.read ?? featured.read}</span>
              </span>
            </span>
          </Link>
        </section>
      )}

      <section className="wrap py-14">
        <SectionHead title={c.latest} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {rest.map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
      </section>

      <section id="nominate" className="band-red">
        <div className="wrap flex flex-wrap items-center gap-8 py-12">
          <h2 className="h-display flex-[1_1_380px] text-[32px] leading-tight sm:text-[42px]">{c.nominateTitle}</h2>
          <div className="flex-[1_1_360px]">
            <p className="mb-5 leading-relaxed text-[#F2E4E5]">{c.nominateText}</p>
            <PillLink href="mailto:spotlight@showici.com">{c.nominate} →</PillLink>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-10">
          <div className="max-w-[620px]">
            <h2 className="h-display text-2xl">{c.instaTitle}</h2>
            <p className="mt-1.5 text-on-dark">{c.instaText}</p>
          </div>
          <FollowButtons tone="dark" />
        </div>
      </section>
    </>
  );
}
