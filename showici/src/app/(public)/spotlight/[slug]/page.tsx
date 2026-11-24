import Link from "@/components/LocalLink";
import { notFound } from "next/navigation";
import { Button, Placeholder, VideoBox } from "@/components/ui";
import { getStories } from "@/lib/data";
import { FollowCard } from "@/components/Social";
import { getT } from "@/lib/lang";

// Articles are still sample content: keep them out of search results until real interviews are published.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = (await getStories()).find((x) => x.slug === slug);
  return { title: s ? `${s.title} · ShowIci Spotlight` : "ShowIci Spotlight", robots: { index: false, follow: true } };
}

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export default async function SpotlightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stories = await getStories();
  const s = stories.find((x) => x.slug === slug);
  if (!s) notFound();
  const more = stories.filter((x) => x.slug !== slug).slice(0, 3);
  const t = await getT();
  const qa = [
    t("How did it all start?", "Comment tout a commencé?"),
    t("What makes a great night at a local venue?", "Qu'est-ce qui fait une belle soirée dans une salle d'ici?"),
    t("Any advice for performers just starting out?", "Des conseils pour les artistes qui débutent?"),
    t("Where can people see you next?", "Où peut-on vous voir prochainement?"),
  ];

  return (
    <>
      <article className="mx-auto max-w-[780px] px-6 pb-10 pt-10">
        <Link href="/spotlight" className="font-bold no-underline">← Spotlight Time</Link>
        <p className="eyebrow mb-2.5 mt-[22px] text-[13px]">{s.category} · {s.city}</p>
        <h1 className="h-display text-[clamp(36px,5vw,54px)] leading-[1.05]">{s.title}</h1>
        <p className="mt-4 font-display text-[22px] font-normal leading-normal text-slate">{s.dek}</p>
        <div className="my-6 flex flex-wrap items-center gap-3.5 border-y border-line py-4">
          <span className="h-11 w-11 flex-none rounded-full bg-ph-2" />
          <span className="flex-1 text-[15px]"><strong>{t("Interview by [Writer name]", "Entrevue par [Nom de l'auteur]")}</strong><br /><span className="text-muted">{s.date} · {s.read}</span></span>
          <Button variant="secondary">{t("Share", "Partager")}</Button>
        </div>
      </article>
      {s.video && <div className="mx-auto max-w-[1040px] px-6"><VideoBox title={t("[Interview video on YouTube, plays here]", "[Vidéo de l'entrevue sur YouTube, jouée ici]")} big /></div>}
      <article className="mx-auto max-w-[780px] px-6 pb-14 pt-6 text-lg leading-[1.7] text-ink-2">
        <p>{t("[Intro paragraph: where we met them, what the night looked like, and what we wanted to learn.]", "[Paragraphe d'introduction : où nous les avons rencontrés, à quoi ressemblait la soirée et ce que nous voulions apprendre.]")}</p>
        {qa.map((q, i) => (
          <div key={q}>
            <p className="mb-2 mt-7 font-bold text-navy">{q}</p>
            <p>{t("[Answer in their own words.]", "[Réponse dans leurs mots.]")}</p>
            {i === 1 && (
              <blockquote className="my-9 border-l-4 border-brass pl-6 font-display text-[28px] font-semibold leading-snug text-navy">&ldquo;{t("[A memorable line from the interview, pulled out as a quote.]", "[Une phrase marquante de l'entrevue, mise en citation.]")}&rdquo;</blockquote>
            )}
            {i === 2 && (
              <div className="my-8 grid grid-cols-2 gap-2.5">
                <Placeholder tone="ph-1" label={t("[Photo: on stage]", "[Photo : sur scène]")} className="aspect-[4/3] rounded-[14px]" />
                <Placeholder tone="ph-2" label={t("[Photo: backstage]", "[Photo : en coulisses]")} className="aspect-[4/3] rounded-[14px]" />
              </div>
            )}
          </div>
        ))}
        <Link href="/performers/p1" className="mt-10 flex flex-wrap items-center gap-4 rounded-[18px] border border-line bg-white p-5 text-navy no-underline hover:text-navy">
          <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-ph-1 font-display font-extrabold">B</span>
          <span className="flex-[1_1_220px] text-base"><strong className="text-lg">{t("[Band name] is on ShowIci", "[Nom du groupe] est sur ShowIci")}</strong><br /><span className="text-muted">{t("Band · Rock covers · Montréal", "Groupe · Reprises rock · Montréal")}</span></span>
          <span className="rounded-[10px] bg-navy px-[18px] py-3 text-[15px] font-bold text-white">{t("View profile and book", "Voir le profil et réserver")}</span>
        </Link>
      </article>
      <section className="border-t border-line bg-parchment">
        <div className="wrap flex flex-col gap-5 pb-16 pt-12">
          <FollowCard context="spotlight" />
          <h2 className="h-display text-[28px]">{t("More from Spotlight Time", "Plus de Spotlight Time")}</h2>
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
