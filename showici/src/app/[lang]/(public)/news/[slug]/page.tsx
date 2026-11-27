import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "@/components/Link";
import { FollowCard, ShareMenu } from "@/components/Social";
import { isLang, localize, type Lang } from "@/lib/lang";
import { NEWS_ARTICLES, getNewsArticle } from "@/lib/news";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getNewsArticle(slug);
  if (!article || !isLang(lang)) return {};
  const a = article[lang];
  const meta = pageMetadata({ lang, path: `/news/${slug}`, title: a.seoTitle, description: a.description });
  return {
    ...meta,
    keywords: a.keywords,
    authors: [{ name: article.author }],
    openGraph: { ...meta.openGraph, type: "article", publishedTime: article.published, authors: [article.author] },
  };
}

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const article = getNewsArticle(slug);
  if (!article) notFound();
  const a = article[lang];
  const fr = lang === "fr";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: fr ? "fr-CA" : "en-CA",
    datePublished: article.published,
    keywords: a.keywords.join(", "),
    author: { "@type": "Person", name: article.author, jobTitle: a.authorRole },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(localize(`/news/${slug}`, lang)),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <article className="mx-auto max-w-[780px] px-6 pb-14 pt-10">
        <Link href="/news" className="font-bold no-underline">{fr ? "← Nouvelles" : "← News"}</Link>
        <p className="eyebrow mb-2.5 mt-[22px] text-[13px]">{a.category}</p>
        <h1 className="h-display text-[clamp(36px,5vw,54px)] leading-[1.05]">{a.title}</h1>
        <p className="mt-4 font-display text-[22px] font-normal leading-normal text-slate">{a.dek}</p>
        <div className="my-6 flex flex-wrap items-center gap-3.5 border-y border-line py-4">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ink font-display text-sm font-extrabold text-accent">ES</span>
          <span className="flex-1 text-[15px]"><strong>{article.author}</strong>, {a.authorRole}<br /><span className="text-muted">{a.date} · {a.read}</span></span>
          <ShareMenu title={a.title} />
        </div>
        <div className="text-lg leading-[1.7] text-graphite">
          {a.sections.map((section, i) => (
            <section key={section.heading ?? i}>
              {section.heading && <h2 className="h-display mb-3 mt-10 text-[26px] leading-tight text-ink">{section.heading}</h2>}
              {section.paragraphs.map((p) => <p key={p} className="mt-4">{p}</p>)}
            </section>
          ))}
          <p className="mt-10 font-display text-[26px] font-semibold leading-snug text-ink">{a.tagline}</p>
          <p className="mt-8"><strong className="text-ink">{article.author}</strong><br /><span className="text-muted">{a.authorRole}</span></p>
        </div>
      </article>
      <section className="border-t border-line bg-sand">
        <div className="wrap flex flex-col gap-5 pb-16 pt-12">
          <FollowCard context="about" />
          <Link href="/spotlight" className="flex flex-col gap-1.5 rounded-[18px] border border-line bg-white p-[22px] text-ink no-underline hover:text-ink">
            <span className="eyebrow">{fr ? "ShowIci À l’affiche" : "ShowIci Spotlight"}</span>
            <strong className="text-[17px]">{fr ? "Lisez nos entrevues avec des artistes et des salles d’ici →" : "Read our interviews with local performers and venue owners →"}</strong>
          </Link>
        </div>
      </section>
    </>
  );
}
