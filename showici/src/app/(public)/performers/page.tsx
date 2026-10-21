import { getPerformers } from "@/lib/data";
import { EmptyState } from "@/components/EmptyState";
import { PerformerSearch } from "./PerformerSearch";

export const metadata = { title: "Find performers in Québec · ShowIci", description: "Bands, DJs, comedians, magicians and other live acts across Québec, starting in Greater Montréal. Free, no commission." };

export default async function PerformersPage({ searchParams }: { searchParams: Promise<{ type?: string; radius?: string; region?: string; area?: string }> }) {
  const sp = await searchParams;
  const performers = await getPerformers(); // all of Québec; the page filters by region and distance
  if (!performers.length) {
    return (
      <div className="wrap flex flex-col gap-5 pb-16 pt-8">
        <h1 className="h-display text-[44px]">Find performers</h1>
        <EmptyState
          title="No performers listed yet"
          body="Bands, DJs, comedians and magicians are joining ShowIci now. Check back soon, or post your event and let performers come to you."
          cta={{ href: "/request", label: "Post an event request" }}
          secondary={{ href: "/register/performer", label: "I'm a performer" }}
        />
      </div>
    );
  }
  return <PerformerSearch performers={performers} initialType={sp.type} initialRadius={Number(sp.radius) || undefined} initialRegion={sp.region} initialArea={sp.area} />;
}
