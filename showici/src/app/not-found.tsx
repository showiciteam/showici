import Link from "@/components/LocalLink";
import { getT } from "@/lib/lang";

export default async function NotFound() {
  const t = await getT();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ivory p-8 text-center">
      <h1 className="h-display text-5xl">{t("Nothing on stage here.", "Rien sur scène ici.")}</h1>
      <p className="text-slate">{t("This page doesn't exist, or the show has ended.", "Cette page n'existe pas, ou le spectacle est terminé.")}</p>
      <Link href="/" className="rounded-[10px] bg-navy px-5 py-3 font-bold text-white no-underline hover:text-white">{t("Back to ShowIci", "Retour à ShowIci")}</Link>
    </div>
  );
}
