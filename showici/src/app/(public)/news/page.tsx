import Link from "next/link";
import { Placeholder } from "@/components/ui";
import { getNews } from "@/lib/data";
import { NewsSidebar } from "./NewsSidebar";

export const metadata = { title: "News · ShowIci" };

export default async function NewsPage() {
  const posts = await getNews();
  return (
    <div className="wrap flex flex-col gap-7 pb-[72px] pt-11">
      <div className="flex flex-col gap-2.5">
        <h1 className="h-display text-[48px]">News</h1>
        <p className="max-w-[680px] text-lg text-slate">Platform updates, new cities, events and what&apos;s happening on the local live scene.</p>
      </div>

      <article className="card flex flex-wrap items-center gap-7 overflow-hidden">
        <Placeholder tone="ph-1" label="[Launch photo]" className="min-h-[340px] flex-[1_1_480px] self-stretch" />
        <div className="flex flex-[1_1_380px] flex-col gap-3 py-7 pl-1 pr-8">
          <span className="eyebrow">New cities · Featured</span>
          <span className="h-display text-4xl leading-tight">ShowIci opens in Greater Montréal</span>
          <span className="text-[17px] leading-relaxed text-slate">[Launch announcement: venues, performers and event planners can join free during the launch. What&apos;s live today and what&apos;s coming next.]</span>
          <span className="text-sm text-muted">[Launch date] · 3 min read</span>
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
            <strong className="text-[17px]">Read our interviews with local performers and venue owners →</strong>
          </Link>
        </aside>
      </div>
    </div>
  );
}
