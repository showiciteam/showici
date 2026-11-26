import type { Metadata } from "next";
import { PillLink } from "@/components/sections";
import { getVenues } from "@/lib/data";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { VenueSearch } from "./VenueSearch";

const copy = {
  fr: {
    title: "Salles, bars et pubs qui accueillent des artistes au Québec · ShowIci",
    description: "Pubs, bars, restaurants, microbrasseries et salles qui programment des artistes d’ici, partout au Québec, à commencer par le Grand Montréal.",
    claimTitle: "Revendiquer ma salle",
    claimText: "C’est votre lieu? Prenez le contrôle de votre fiche, mettez vos infos à jour, publiez vos spectacles et gagnez en visibilité.",
    claimCta: "Revendiquer ma salle",
    openTitle: "Ouverte aux nouveaux artistes?",
    openText: "Faites savoir aux artistes que votre salle accueille de nouvelles propositions de spectacles.",
    openCta: "Indiquer mon intérêt",
    perks: [
      ["Plus de visibilité", "Faites découvrir votre salle aux artistes et au public d’ici."],
      ["Des talents locaux", "Groupes, DJ, humoristes et magiciens de tous les styles."],
      ["Vos spectacles en vitrine", "Publiez vos spectacles et remplissez votre salle."],
    ],
  },
  en: {
    title: "Venues, bars and pubs that book artists in Québec · ShowIci",
    description: "Pubs, bars, restaurants, breweries and halls across Québec that book local acts, starting in Greater Montréal.",
    claimTitle: "Claim my venue",
    claimText: "Is this your place? Take over your page, update your details, post your shows and get seen.",
    claimCta: "Claim my venue",
    openTitle: "Open to new artists?",
    openText: "Let artists know your venue welcomes new show proposals.",
    openCta: "Let artists know",
    perks: [
      ["More visibility", "Put your venue in front of local artists and audiences."],
      ["Local talent", "Bands, DJs, comedians and magicians of every style."],
      ["Your shows, front and centre", "Post your shows and fill your room."],
    ],
  },
} satisfies Record<Lang, unknown>;

type Search = { radius?: string; region?: string; area?: string };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/venues", title: copy[lang].title, description: copy[lang].description });
}

export default async function VenuesPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<Search> }) {
  const [{ lang: raw }, sp] = await Promise.all([params, searchParams]);
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
  const venues = await getVenues(); // all of Québec; the page filters by region and distance

  return (
    <>
      <VenueSearch venues={venues} initialRadius={Number(sp.radius) || undefined} initialRegion={sp.region} initialArea={sp.area} />

      <section className="band-red">
        <div className="wrap grid gap-10 py-12 md:grid-cols-2">
          {[
            { title: c.claimTitle, text: c.claimText, cta: c.claimCta, tone: "red" as const },
            { title: c.openTitle, text: c.openText, cta: c.openCta, tone: "outline" as const },
          ].map((b, i) => (
            <div key={b.title} className={i ? "md:border-l md:border-white/25 md:pl-10" : ""}>
              <h2 className="h-display mb-2.5 text-[28px] sm:text-[30px]">{b.title}</h2>
              <p className="mb-5 max-w-[460px] leading-relaxed text-[#F2E4E5]">{b.text}</p>
              <PillLink href="/signup?role=venue" tone={b.tone}>{b.cta} →</PillLink>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap grid gap-7 py-10 sm:grid-cols-3">
          {c.perks.map(([title, text]) => (
            <div key={title}>
              <h3 className="font-display text-lg font-extrabold">{title}</h3>
              <p className="mt-1 text-sm text-slate">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
