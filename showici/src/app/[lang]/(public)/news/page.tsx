import { translator } from "@/lib/tr";
import { isLang, DEFAULT_LANG } from "@/lib/lang";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "@/components/Link";
import { Placeholder } from "@/components/ui";
import { getNews } from "@/lib/data";
import { NEWS_ARTICLES } from "@/lib/news";
import { NewsSidebar } from "./NewsSidebar";

const SEO = {
  fr: { title: "Nouvelles de la scène locale · ShowIci", description: "Les nouvelles de ShowIci et de la scène locale au Québec." },
  en: { title: "Local scene news · ShowIci", description: "News from ShowIci and the local live scene in Québec." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/news", ...SEO[lang] });
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  const tr = translator(lang);
  const featured = NEWS_ARTICLES[0];
  const posts = await getNews();
  return (
    <div className="wrap flex flex-col gap-7 pb-[72px] pt-11">
      <div className="flex flex-col gap-2.5">
        <h1 className="h-display text-[48px]">{tr("News")}</h1>
        <p className="max-w-[680px] text-lg text-slate">{tr("Platform updates, new cities, events and what’s happening on the local live scene.")}</p>
      </div>

      {featured && (
        <Link href={`/news/${featured.slug}`} className="card flex flex-wrap items-center gap-7 overflow-hidden text-ink no-underline hover:text-ink">
          {featured.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.image} alt={featured[lang].imageAlt ?? ""} className="min-h-[340px] w-0 min-w-0 flex-[1_1_480px] self-stretch object-cover" />
          ) : (
            <Placeholder tone={featured.tone} className="min-h-[340px] flex-[1_1_480px] self-stretch" />
          )}
          <div className="flex flex-[1_1_380px] flex-col gap-3 py-7 pl-1 pr-8">
            <span className="eyebrow">{featured[lang].category}</span>
            <span className="h-display text-4xl leading-tight">{featured[lang].title}</span>
            <span className="text-[17px] leading-relaxed text-slate">{featured[lang].dek}</span>
            <span className="text-sm text-muted">{featured[lang].date} · {featured[lang].read}</span>
          </div>
        </Link>
      )}

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col">
          {posts.map((p) => (
            <article key={p.id} className="flex flex-wrap items-center gap-5 border-t border-line py-5">
              <Placeholder tone={p.tone} className="aspect-[16/10] w-[200px] flex-none rounded-xl" />
              <div className="flex flex-[1_1_260px] flex-col gap-1.5">
                <span className="eyebrow">{p.category}</span>
                <span className="h-display text-[22px] leading-tight">{p.title}</span>
                <span className="leading-relaxed text-slate">{p.dek}</span>
                <span className="text-[13px] text-muted">{p.date}</span>
              </div>
            </article>
          ))}
        </div>
        <aside className="flex max-w-[360px] flex-[1_1_280px] flex-col gap-4">
          <NewsSidebar />
          <Link href="/spotlight" className="flex flex-col gap-1.5 rounded-[18px] border border-line bg-sand p-[22px] text-ink no-underline hover:text-ink">
            <span className="eyebrow">{tr("Spotlight Time")}</span>
            <strong className="text-[17px]">{tr("Read our interviews with local performers and venue owners →")}</strong>
          </Link>
        </aside>
      </div>
    </div>
  );
}
