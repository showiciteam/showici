import Link from "next/link";
import { StoryCard } from "@/components/cards";
import { Button, PlayIcon } from "@/components/ui";
import { getStories } from "@/lib/data";

export const metadata = { title: "Spotlight Time · ShowIci" };

export default async function SpotlightPage() {
  const stories = await getStories();
  const featured = stories[0];
  return (
    <>
      <section className="border-t border-[#2A3A5E] bg-navy text-white">
        <div className="wrap flex flex-wrap items-center gap-10 pb-16 pt-14">
          <div className="flex flex-[1_1_420px] flex-col gap-4">
            <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-brass">Spotlight Time</span>
            <h1 className="font-display text-[clamp(40px,6vw,68px)] font-extrabold leading-none tracking-[-0.03em]">The people behind<br />the local stage.</h1>
            <p className="max-w-[520px] text-lg leading-relaxed text-on-navy">Interviews with performers, venue owners and the people who keep live entertainment alive in your city. New stories every week, in French and English.</p>
            <div className="flex flex-wrap gap-2.5"><Button href="#latest" variant="brass">Read the latest</Button><Button href="#nominate" variant="ghost-dark">Nominate someone</Button></div>
          </div>
          <Link href={`/spotlight/${featured.slug}`} className="flex flex-[1_1_460px] flex-col gap-3.5 text-white no-underline hover:text-white">
            <div className="relative flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-[18px] bg-navy-soft">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brass"><PlayIcon size={30} color="#14213D" /></span>
              <span className="text-sm text-on-navy">[Interview video · 12 min]</span>
              <span className="absolute left-4 top-4 rounded-full bg-brass px-2.5 py-1 text-xs font-bold text-navy">Featured interview</span>
            </div>
            <span className="eyebrow text-brass">{featured.category} · {featured.city}</span>
            <span className="font-display text-[28px] font-extrabold leading-tight">&ldquo;[A short pull quote from the featured interview.]&rdquo;</span>
            <span className="text-on-navy">{featured.title}</span>
          </Link>
        </div>
      </section>

      <div id="latest" className="wrap flex flex-col gap-7 pb-[72px] pt-12">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[22px]">
          {stories.map((s) => <StoryCard key={s.slug} s={s} />)}
        </div>
        <section id="nominate" className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] border border-line bg-parchment p-9">
          <div className="flex max-w-[640px] flex-col gap-2">
            <h2 className="h-display text-[30px]">Know someone who deserves the spotlight?</h2>
            <p className="text-[17px] text-slate">Nominate a performer, a venue owner or anyone making your local scene better. We read every nomination.</p>
          </div>
          <Button href="mailto:spotlight@showici.com">Nominate someone</Button>
        </section>
      </div>
    </>
  );
}
