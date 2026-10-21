import { getVenues } from "@/lib/data";
import { EmptyState } from "@/components/EmptyState";
import { VenueSearch } from "./VenueSearch";

export const metadata = { title: "Find venues in Québec · ShowIci", description: "Pubs, bars, restaurants and halls across Québec that book local acts, starting in Greater Montréal." };

export default async function VenuesPage({ searchParams }: { searchParams: Promise<{ radius?: string; region?: string; area?: string }> }) {
  const sp = await searchParams;
  const venues = await getVenues(); // all of Québec; the page filters by region and distance
  if (!venues.length) {
    return (
      <div className="wrap flex flex-col gap-5 pb-16 pt-8">
        <h1 className="h-display text-[44px]">Find venues</h1>
        <EmptyState
          title="No venues listed yet"
          body="Pubs, bars and halls across Québec are setting up their pages. Run a venue? List it for free and start booking local acts."
          cta={{ href: "/register/venue", label: "List your venue" }}
          secondary={{ href: "/shows", label: "See upcoming shows" }}
        />
      </div>
    );
  }
  return <VenueSearch venues={venues} initialRadius={Number(sp.radius) || undefined} initialRegion={sp.region} initialArea={sp.area} />;
}
