import type { Metadata } from "next";
import { PageHero, RedBand } from "@/components/sections";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/seo";
import { RequestForm } from "./RequestForm";

const copy = {
  fr: {
    seoTitle: "Trouver un artiste pour un mariage, un anniversaire ou une fête · ShowIci",
    seoDescription: "Décrivez votre événement privé une seule fois : les groupes, DJ, mariachis, humoristes et magiciens de votre région vous écrivent avec leurs vidéos et leurs prix. Sans commission.",
    title: "Votre événement.",
    accent: "Leur talent.",
    lead: "Trouvez le divertissement parfait pour votre événement, parmi des artistes locaux du Québec.",
    bandTitle: "Pour tous vos événements",
    bandText: "Mariage, anniversaire, événement corporatif, quinceañera et bien plus encore.",
  },
  en: {
    seoTitle: "Find an artist for a wedding, birthday or party · ShowIci",
    seoDescription: "Describe your private event once: bands, DJs, mariachis, comedians and magicians near you message you with their videos and prices. No commission.",
    title: "Your event.",
    accent: "Their talent.",
    lead: "Find the right entertainment for your event among local artists across Québec.",
    bandTitle: "For every kind of event",
    bandText: "Weddings, birthdays, office parties, quinceañeras and much more.",
  },
} satisfies Record<Lang, unknown>;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata({ lang, path: "/request", title: copy[lang].seoTitle, description: copy[lang].seoDescription });
}

export default async function EventRequestPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = copy[lang];
  return (
    <>
      <PageHero image="/images/stage-band.webp" title={c.title} accent={c.accent} lead={c.lead} bottomSpace="pb-24" />
      <section className="wrap relative z-10 -mt-14 pb-14">
        <RequestForm />
      </section>
      <RedBand title={c.bandTitle} text={c.bandText} />
    </>
  );
}
