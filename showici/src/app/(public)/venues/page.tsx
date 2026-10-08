import { getVenues } from "@/lib/data";
import { EmptyState } from "@/components/EmptyState";
import { VenueSearch } from "./VenueSearch";

export const metadata = { title: "Find venues · ShowIci" };

export default async function VenuesPage() {
  const venues = await getVenues();
  if (!venues.length) {
    return (
      <div className="wrap flex flex-col gap-5 pb-16 pt-8">
        <h1 className="h-display text-[44px]">Find venues</h1>
        <EmptyState
          title="No venues listed yet"
          body="Pubs, bars and halls around Montréal are setting up their pages. Run a venue? List it for free and start booking local acts."
          cta={{ href: "/register/venue", label: "List your venue" }}
          secondary={{ href: "/shows", label: "See upcoming shows" }}
        />
      </div>
    );
  }
  return <VenueSearch venues={venues} />;
}
