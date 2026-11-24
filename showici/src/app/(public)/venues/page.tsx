import { getVenues } from "@/lib/data";
import { EmptyState } from "@/components/EmptyState";
import { VenueSearch } from "./VenueSearch";
import { getT, meta } from "@/lib/lang";

export const generateMetadata = meta(
  ["Find venues in Québec · ShowIci", "Trouver des salles au Québec · ShowIci"],
  ["Pubs, bars, restaurants and halls across Québec that book local acts, starting in Greater Montréal.", "Pubs, bars, restaurants et salles partout au Québec qui engagent des artistes d'ici, à commencer par le Grand Montréal."],
);

export default async function VenuesPage({ searchParams }: { searchParams: Promise<{ radius?: string; region?: string; area?: string }> }) {
  const sp = await searchParams;
  const venues = await getVenues(); // all of Québec; the page filters by region and distance
  if (!venues.length) {
    const t = await getT();
    return (
      <div className="wrap flex flex-col gap-5 pb-16 pt-8">
        <h1 className="h-display text-[44px]">{t("Find venues", "Trouver des salles")}</h1>
        <EmptyState
          title={t("No venues listed yet", "Aucune salle inscrite pour l'instant")}
          body={t("Pubs, bars and halls across Québec are setting up their pages. Run a venue? List it and start booking local acts.", "Des pubs, bars et salles de partout au Québec créent leur page. Vous gérez une salle? Inscrivez-la et commencez à engager des artistes d'ici.")}
          cta={{ href: "/register/venue", label: t("List your venue", "Inscrire votre salle") }}
          secondary={{ href: "/shows", label: t("See upcoming shows", "Voir les spectacles à venir") }}
        />
      </div>
    );
  }
  return <VenueSearch venues={venues} initialRadius={Number(sp.radius) || undefined} initialRegion={sp.region} initialArea={sp.area} />;
}
