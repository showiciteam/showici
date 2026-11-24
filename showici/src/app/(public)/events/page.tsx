import Link from "@/components/LocalLink";
import { Button } from "@/components/ui";
import { getBigEvents } from "@/lib/data";
import { EventsBrowser } from "./EventFilters";
import { getT, meta } from "@/lib/lang";

export const generateMetadata = meta(
  ["Big events and tickets · ShowIci", "Grands événements et billets · ShowIci"],
  ["Concerts, festivals, comedy tours and theatre coming up across Québec, with links to buy tickets.", "Concerts, festivals, tournées d'humour et théâtre à venir partout au Québec, avec liens pour acheter vos billets."],
);
// Ticketmaster data is refreshed at most once an hour.
export const revalidate = 3600;

export default async function BigEventsPage() {
  const events = await getBigEvents();
  const t = await getT();

  return (
    <div className="wrap flex flex-col gap-[26px] pb-[72px] pt-10">
      <div className="flex w-fit gap-1.5 rounded-full border border-line bg-parchment p-1">
        <Link href="/shows" className="rounded-full px-[18px] py-2.5 text-sm text-ink-2 no-underline">{t("Local shows", "Spectacles locaux")}</Link>
        <Link href="/events" className="rounded-full bg-navy px-[18px] py-2.5 text-sm font-bold text-white no-underline hover:text-white">{t("Big events and tickets", "Grands événements et billets")}</Link>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="h-display text-[46px]">{t("Big events in Québec", "Grands événements au Québec")}</h1>
          <p className="max-w-[680px] text-lg text-slate">{t("Concerts, festivals, comedy tours and theatre in your area. Tickets are sold by Ticketmaster and its partner sites.", "Concerts, festivals, tournées d'humour et théâtre près de chez vous. Les billets sont vendus par Ticketmaster et ses sites partenaires.")}</p>
        </div>
      </div>
      <EventsBrowser events={events} />

      <section className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] border border-line bg-parchment p-8">
        <div className="flex max-w-[640px] flex-col gap-1.5">
          <h2 className="h-display text-[26px]">{t("Prefer something smaller and closer?", "Envie de quelque chose de plus intime et plus près?")}</h2>
          <p className="text-slate">{t("Local bands, comedians and DJs play pubs and bars near you every week, often with free entry.", "Des groupes, humoristes et DJ d'ici jouent chaque semaine dans les pubs et bars près de chez vous, souvent en entrée libre.")}</p>
        </div>
        <Button href="/shows">{t("See local shows", "Voir les spectacles locaux")}</Button>
      </section>
    </div>
  );
}
