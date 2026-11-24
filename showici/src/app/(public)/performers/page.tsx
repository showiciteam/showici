import { getPerformers } from "@/lib/data";
import { EmptyState } from "@/components/EmptyState";
import { PerformerSearch } from "./PerformerSearch";
import { getT, meta } from "@/lib/lang";

export const generateMetadata = meta(
  ["Find performers in Québec · ShowIci", "Trouver des artistes au Québec · ShowIci"],
  ["Bands, DJs, comedians, magicians and other live acts across Québec, starting in Greater Montréal. No commission.", "Groupes, DJ, humoristes, magiciens et autres numéros partout au Québec, à commencer par le Grand Montréal. Sans commission."],
);

export default async function PerformersPage({ searchParams }: { searchParams: Promise<{ type?: string; radius?: string; region?: string; area?: string }> }) {
  const sp = await searchParams;
  const performers = await getPerformers(); // all of Québec; the page filters by region and distance
  if (!performers.length) {
    const t = await getT();
    return (
      <div className="wrap flex flex-col gap-5 pb-16 pt-8">
        <h1 className="h-display text-[44px]">{t("Find performers", "Trouver des artistes")}</h1>
        <EmptyState
          title={t("No performers listed yet", "Aucun artiste inscrit pour l'instant")}
          body={t("Bands, DJs, comedians and magicians are joining ShowIci now. Check back soon, or post your event and let performers come to you.", "Groupes, DJ, humoristes et magiciens s'inscrivent sur ShowIci en ce moment. Revenez bientôt, ou publiez votre événement et laissez les artistes venir à vous.")}
          cta={{ href: "/request", label: t("Post an event request", "Publier une demande d'événement") }}
          secondary={{ href: "/register/performer", label: t("I'm a performer", "Je suis artiste") }}
        />
      </div>
    );
  }
  return <PerformerSearch performers={performers} initialType={sp.type} initialRadius={Number(sp.radius) || undefined} initialRegion={sp.region} initialArea={sp.area} />;
}
