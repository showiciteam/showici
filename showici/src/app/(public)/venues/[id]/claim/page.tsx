import Link from "@/components/LocalLink";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";
import { getVenue } from "@/lib/data";
import { getSessionUser } from "@/lib/session";
import { ClaimForm } from "./ClaimForm";
import { venueHref } from "@/lib/seo";
import { getT } from "@/lib/lang";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("Claim your venue · ShowIci", "Réclamer votre salle · ShowIci"), robots: { index: false, follow: false } };
}

export default async function ClaimVenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = await getVenue(id);
  if (!v) notFound();
  const user = await getSessionUser();
  const t = await getT();
  const here = `${venueHref(v)}/claim`;
  const siteDomain = (v.links?.find((l) => l.label === "Website")?.url ?? "").replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  const social = /(facebook|instagram|linktr|google|wixsite|squarespace|yelp|tripadvisor)\./i.test(siteDomain);

  return (
    <div className="wrap max-w-[720px] pb-[72px] pt-10">
      <Link href={venueHref(v)} className="text-sm no-underline">← {v.name}</Link>
      <h1 className="h-display mt-3 text-[34px] sm:text-[42px]">{t(`Claim ${v.name}`, `Réclamer ${v.name}`)}</h1>
      <p className="mt-3 text-[17px] leading-relaxed text-slate">
        {t("Once your ShowIci page is yours, you can add photos, correct the details, post your upcoming shows and receive messages and booking requests from local artists.", "Une fois votre page ShowIci à vous, vous pouvez ajouter des photos, corriger les détails, publier vos spectacles à venir et recevoir des messages et des demandes de réservation d'artistes d'ici.")}
      </p>

      {v.claimed !== false ? (
        <div className="card mt-8 flex flex-col gap-3 p-6">
          <strong>{t("This venue has already been claimed.", "Cette salle a déjà été réclamée.")}</strong>
          <p className="text-slate">{t(`If you manage ${v.name} and didn't claim it, use Contact at the bottom of the page and we'll look into it.`, `Si vous gérez ${v.name} et que vous ne l'avez pas réclamée, utilisez Contact au bas de la page et nous allons vérifier.`)}</p>
        </div>
      ) : !user ? (
        <div className="card mt-8 flex flex-col gap-4 p-6">
          <strong className="text-lg">{t("First, sign in or create your venue account", "D'abord, connectez-vous ou créez votre compte de salle")}</strong>
          <p className="text-slate">
            {t("Use your work email", "Utilisez votre courriel professionnel")}{siteDomain && !social ? <> ({t("one ending in", "se terminant par")} <strong>@{siteDomain}</strong>)</> : null} {t("if you have one: we can then confirm the claim instantly.", "si vous en avez un : nous pourrons alors confirmer la demande immédiatement.")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/signup?role=venue&next=${encodeURIComponent(here)}`}>{t("Create a venue account", "Créer un compte de salle")}</Button>
            <Button href={`/login?next=${encodeURIComponent(here)}`} variant="secondary">{t("I already have an account", "J'ai déjà un compte")}</Button>
          </div>
        </div>
      ) : (
        <ClaimForm venueId={v.id} venueName={v.name} userName={user.name} userEmail={user.email} siteDomain={social ? "" : siteDomain} />
      )}

      <section className="mt-10 flex flex-col gap-2 text-[15px] leading-relaxed text-slate">
        <h2 className="text-lg font-bold text-navy">{t("How we confirm it's you", "Comment nous confirmons que c'est vous")}</h2>
        <p>{t("If your account email is on the venue's own website domain", "Si le courriel de votre compte est sur le domaine du site Web de la salle")}{siteDomain && !social ? ` (@${siteDomain})` : ""}{t(", the venue becomes yours right away.", ", la salle devient à vous immédiatement.")}</p>
        <p>{t("Otherwise, someone from ShowIci checks your request, usually by calling the venue's public phone number, and you get an email as soon as it's approved, normally within 2 business days.", "Sinon, quelqu'un de ShowIci vérifie votre demande, habituellement en appelant le numéro public de la salle, et vous recevez un courriel dès qu'elle est approuvée, normalement en moins de 2 jours ouvrables.")}</p>
      </section>
    </div>
  );
}
