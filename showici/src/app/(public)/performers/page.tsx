import { getPerformers } from "@/lib/data";
import { PerformerSearch } from "./PerformerSearch";

export const metadata = { title: "Find performers · ShowIci" };

export default async function PerformersPage({ searchParams }: { searchParams: Promise<{ type?: string; radius?: string }> }) {
  const sp = await searchParams;
  const performers = await getPerformers({ radiusKm: Number(sp.radius ?? 50) });
  return <PerformerSearch performers={performers} initialType={sp.type} initialRadius={Number(sp.radius ?? 50)} />;
}
