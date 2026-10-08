import { getPerformers } from "@/lib/data";
import { EmptyState } from "@/components/EmptyState";
import { PerformerSearch } from "./PerformerSearch";

export const metadata = { title: "Find performers · ShowIci" };

export default async function PerformersPage({ searchParams }: { searchParams: Promise<{ type?: string; radius?: string }> }) {
  const sp = await searchParams;
  const performers = await getPerformers({ radiusKm: Number(sp.radius ?? 50) });
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
  return <PerformerSearch performers={performers} initialType={sp.type} initialRadius={Number(sp.radius ?? 50)} />;
}
