import { notFound } from "next/navigation";
import { getStories } from "@/lib/data";
import { SpotlightArticleView } from "@/components/SpotlightArticle";
import { isLang, localize, type Lang } from "@/lib/lang";
import { absoluteUrl, jsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = (await getStories()).find((x) => x.slug === slug);
  if (!s?.article || !isLang(lang)) return {};
  // Drafts waiting for the artist's approval stay out of search results.
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
  if (!s?.article) notFound();
  const more = stories.filter((x) => x.slug !== slug && !x.draft).slice(0, 3);
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
    mainEntityOfPage: absoluteUrl(localize(`/spotlight/${slug}`, lang)),
  };
  return (
    <>
      {!s.draft && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />}
      <SpotlightArticleView s={s} more={more} />
    </>
  );
}
