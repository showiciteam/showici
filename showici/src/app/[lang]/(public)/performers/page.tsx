import type { Metadata } from "next";
import { getPerformers, getStories } from "@/lib/data";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { PerformerSearch } from "./PerformerSearch";

/** Served from cache and rebuilt in the background every 5 minutes, so new listings show up without a deploy. */
export const revalidate = 300;

const copy = {
  fr: {
    title: "Artistes au Québec : groupes, DJ, humoristes, magiciens · ShowIci",
    description: "Trouvez des groupes, DJ, humoristes, magiciens et autres artistes partout au Québec, à commencer par le Grand Montréal. Sans commission.",
  },
  en: {
    title: "Artists in Québec: bands, DJs, comedians, magicians · ShowIci",
    description: "Find bands, DJs, comedians, magicians and other live acts across Québec, starting in Greater Montréal. No commission.",
  },
} satisfies Record<Lang, unknown>;

type Search = { type?: string; radius?: string; region?: string; area?: string };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/performers", ...copy[lang] });
}

export default async function PerformersPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<Search> }) {
  const [{ lang: raw }, sp] = await Promise.all([params, searchParams]);
  const lang: Lang = isLang(raw) ? raw : "fr";
  const [performers, stories] = await Promise.all([getPerformers(), getStories()]); // all of Québec; the page filters by region and distance

  // Feature the artist from the latest published Spotlight interview.
  const story = stories.find((s) => s.article?.performerId && !s.draft && performers.some((p) => p.id === s.article?.performerId));
  const performer = story && performers.find((p) => p.id === story.article?.performerId);
  const featured = performer ? { performer, storySlug: story.slug, blurb: story.article?.[lang].dek } : undefined;

  return (
    <PerformerSearch
      performers={performers}
      featured={featured}
      initialType={sp.type}
      initialRadius={Number(sp.radius) || undefined}
      initialRegion={sp.region}
      initialArea={sp.area}
    />
  );
}
