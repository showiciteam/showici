import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { Placeholder, VideoBox } from "@/components/ui";
import { getStories } from "@/lib/data";
import { FollowCard, ShareMenu } from "@/components/Social";
import { SpotlightArticleView } from "@/components/SpotlightArticle";
import { isLang, type Lang } from "@/lib/lang";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = (await getStories()).find((x) => x.slug === slug);
  if (!s || !isLang(lang)) return {};
  // Sample stories (no article yet) and drafts waiting for the artist's approval stay out of search results.
  if (!s.article) return { title: `${s.title} · ShowIci Spotlight`, robots: { index: false, follow: true } };
  const a = s.article[lang];
  return pageMetadata({
    lang,
    path: `/spotlight/${slug}`,
    title: `${a.title} · ShowIci Spotlight`,
    description: a.dek,
    image: s.article.photos[0]?.src ?? (s.photo.startsWith("/") ? s.photo : undefined),
    noindex: s.draft,
  });
}

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export default async function SpotlightArticle({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const stories = await getStories();
  const s = stories.find((x) => x.slug === slug);
  if (!s) notFound();
  const more = stories.filter((x) => x.slug !== slug && !x.draft).slice(0, 3);
  if (s.article) {
    const a = s.article[lang];
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.dek,
      inLanguage: lang === "fr" ? "fr-CA" : "en-CA",
      image: s.photo.startsWith("/") ? absoluteUrl(s.photo) : undefined,
      about: { "@type": "Person", name: s.article.artist },
      author: { "@type": "Organization", name: "ShowIci", url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: absoluteUrl(lang === "fr" ? `/spotlight/${slug}` : `/en/spotlight/${slug}`),
    };
    return (
      <>
        {!s.draft && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />}
        <SpotlightArticleView s={s} more={more} />
      </>
    );
  }
  const qa = [
    "How did it all start?",
    "What makes a great night at a local venue?",
    "Any advice for performers just starting out?",
    "Where can people see you next?",
  ];

  return (
    <>
      <article className="mx-auto max-w-[780px] px-6 pb-10 pt-10">
        <Link href="/spotlight" className="font-bold no-underline">← ShowIci Spotlight</Link>
        <p className="eyebrow mb-2.5 mt-[22px] text-[13px]">{s.category} · {s.city}</p>
        <h1 className="h-display text-[clamp(36px,5vw,54px)] leading-[1.05]">{s.title}</h1>
        <p className="mt-4 font-display text-[22px] font-normal leading-normal text-slate">{s.dek}</p>
        <div className="my-6 flex flex-wrap items-center gap-3.5 border-y border-line py-4">
          <span className="h-11 w-11 flex-none rounded-full bg-ph-2" />
          <span className="flex-1 text-[15px]"><strong>Interview by [Writer name]</strong><br /><span className="text-muted">{s.date} · {s.read} · Lire en français</span></span>
          <ShareMenu title={s.title} />
        </div>
      </article>
      {s.video && <div className="mx-auto max-w-[1040px] px-6"><VideoBox title="[Interview video on YouTube, plays here]" big /></div>}
      <article className="mx-auto max-w-[780px] px-6 pb-14 pt-6 text-lg leading-[1.7] text-graphite">
        <p>[Intro paragraph: where we met them, what the night looked like, and what we wanted to learn.]</p>
        {qa.map((q, i) => (
          <div key={q}>
            <p className="mb-2 mt-7 font-bold text-ink">{q}</p>
            <p>[Answer in their own words.]</p>
            {i === 1 && (
              <blockquote className="my-9 border-l-4 border-accent pl-6 font-display text-[28px] font-semibold leading-snug text-ink">&ldquo;[A memorable line from the interview, pulled out as a quote.]&rdquo;</blockquote>
            )}
            {i === 2 && (
              <div className="my-8 grid grid-cols-2 gap-2.5">
                <Placeholder tone="ph-1" label="[Photo: on stage]" className="aspect-[4/3] rounded-[14px]" />
                <Placeholder tone="ph-2" label="[Photo: backstage]" className="aspect-[4/3] rounded-[14px]" />
              </div>
            )}
          </div>
        ))}
        <Link href="/performers/p1" className="mt-10 flex flex-wrap items-center gap-4 rounded-[18px] border border-line bg-white p-5 text-ink no-underline hover:text-ink">
          <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-ph-1 font-display font-extrabold">B</span>
          <span className="flex-[1_1_220px] text-base"><strong className="text-lg">[Band name] is on ShowIci</strong><br /><span className="text-muted">Band · Rock covers · Montréal</span></span>
          <span className="rounded-[10px] bg-ink px-[18px] py-3 text-[15px] font-bold text-white">View profile and book</span>
        </Link>
      </article>
      <section className="border-t border-line bg-sand">
        <div className="wrap flex flex-col gap-5 pb-16 pt-12">
          <FollowCard context="spotlight" />
          <h2 className="h-display text-[28px]">{lang === "fr" ? "Autres entrevues" : "More from ShowIci Spotlight"}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px]">
            {more.map((m) => (
              <Link key={m.slug} href={`/spotlight/${m.slug}`} className="flex flex-col gap-2.5 text-ink no-underline hover:text-ink">
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
