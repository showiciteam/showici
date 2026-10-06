import { getVenues } from "@/lib/data";
import { VenueSearch } from "./VenueSearch";

export const metadata = { title: "Find venues · ShowIci" };

export default async function VenuesPage() {
  const venues = await getVenues();
  return <VenueSearch venues={venues} />;
}
