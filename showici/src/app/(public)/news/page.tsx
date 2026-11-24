import Link from "@/components/LocalLink";
import { Placeholder } from "@/components/ui";
import { getNews } from "@/lib/data";
import { NewsSidebar } from "./NewsSidebar";
import { getT } from "@/lib/lang";

// The news page still shows sample posts: keep it out of search results until real posts are published.
export async function generateMetadata() {
  const t = await getT();
  return {
    title: t("News · ShowIci", "Nouvelles · ShowIci"),
    description: t("News and updates from ShowIci and the Québec live-entertainment scene.", "Nouvelles de ShowIci et de la scène du spectacle au Québec."),
    robots: { index: false, follow: true },
  };
}

export default async function NewsPage() {
  const posts = await getNews();
  const t = await getT();
  return (
    <div className="wrap flex flex-col gap-7 pb-[72px] pt-11">
      <div className="flex flex-col gap-2.5">
        <h1 className="h-display text-[48px]">{t("News", "Nouvelles")}</h1>
        <p className="max-w-[680px] text-lg text-slate">{t("Platform updates, new cities, events and what's happening on the local live scene.", "Nouveautés de la plateforme, nouvelles villes, événements et ce qui se passe sur la scène locale.")}</p>
      </div>

      <article className="card flex flex-wrap items-center gap-7 overflow-hidden">
        <Placeholder tone="ph-1" label={t("[Launch photo]", "[Photo du lancement]")} className="min-h-[340px] flex-[1_1_480px] self-stretch" />
        <div className="flex flex-[1_1_380px] flex-col gap-3 py-7 pl-1 pr-8">
          <span className="eyebrow">{t("New cities · Featured", "Nouvelles villes · À la une")}</span>
          <span className="h-display text-4xl leading-tight">{t("ShowIci opens across Québec, starting in Montréal", "ShowIci s'ouvre partout au Québec, à commencer par Montréal")}</span>
          <span className="text-[17px] leading-relaxed text-slate">{t("[Launch announcement: venues, performers and event planners can join now. What's live today and what's coming next.]", "[Annonce du lancement : les salles, artistes et organisateurs peuvent s'inscrire dès maintenant. Ce qui est en ligne aujourd'hui et ce qui s'en vient.]")}</span>
          <span className="text-sm text-muted">{t("[Launch date] · 3 min read", "[Date du lancement] · 3 min de lecture")}</span>
        </div>
      </article>

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
          <Link href="/spotlight" className="flex flex-col gap-1.5 rounded-[18px] border border-line bg-parchment p-[22px] text-navy no-underline hover:text-navy">
            <span className="eyebrow">Spotlight Time</span>
            <strong className="text-[17px]">{t("Read our interviews with local performers and venue owners →", "Lisez nos entrevues avec des artistes et des propriétaires de salles d'ici →")}</strong>
          </Link>
        </aside>
      </div>
    </div>
  );
}
