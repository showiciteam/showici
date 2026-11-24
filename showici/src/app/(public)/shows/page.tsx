import Link from "@/components/LocalLink";
import { ShowsFilters } from "./ShowsFilters";
import { getBigEvents, getShows, getVenues } from "@/lib/data";
import { BigEventCard } from "@/components/cards";
import { Placeholder } from "@/components/ui";
import { EmptyState } from "@/components/EmptyState";
import { FollowCard } from "@/components/Social";
import { getLang, meta } from "@/lib/lang";
import { tr } from "@/lib/locale";
import { label } from "@/lib/labels";

export const generateMetadata = meta(
  ["Shows near you · ShowIci", "Spectacles près de chez vous · ShowIci"],
  ["Upcoming live shows at pubs, bars and venues across Québec: local bands, DJs, comedians and magicians, starting in Greater Montréal.", "Spectacles à venir dans les pubs, bars et salles du Québec : groupes, DJ, humoristes et magiciens d'ici, à commencer par le Grand Montréal."],
);

export default async function ShowsPage() {
  const [shows, venues, bigEvents] = await Promise.all([getShows(), getVenues(), getBigEvents()]);
  const venueById = Object.fromEntries(venues.map((v) => [v.id, v]));
  const days = [...new Set(shows.map((s) => s.dayLabel))];
  const lang = await getLang();
  const t = tr(lang);

  return (
    <div className="wrap pb-16 pt-8">
      <div className="mb-5 flex w-fit gap-1.5 rounded-full border border-line bg-parchment p-1">
        <Link href="/shows" className="rounded-full bg-navy px-[18px] py-2.5 text-sm font-bold text-white no-underline hover:text-white">{t("Local shows", "Spectacles locaux")}</Link>
        <Link href="/events" className="rounded-full px-[18px] py-2.5 text-sm text-ink-2 no-underline">{t("Big events and tickets", "Grands événements et billets")}</Link>
      </div>
      <h1 className="h-display text-[44px]">{t("Shows across Québec", "Spectacles partout au Québec")}</h1>
      <p className="mb-[22px] mt-2 text-[17px] text-slate">{t("Live music, comedy and more at local pubs and bars, near you.", "Musique live, humour et plus dans les pubs et bars d'ici, près de chez vous.")}</p>
      <FollowCard context="shows" className="mb-[22px]" />
      {shows.length > 0 && <ShowsFilters />}

      {shows.length === 0 ? (
        <EmptyState
          title={t("No upcoming shows yet", "Aucun spectacle à venir pour l'instant")}
          body={t("Venues post their shows here as soon as they are booked. Run a venue? Post your next show on ShowIci.", "Les salles publient leurs spectacles ici dès qu'ils sont confirmés. Vous gérez une salle? Publiez votre prochain spectacle sur ShowIci.")}
          cta={{ href: "/register/venue", label: t("List your venue", "Inscrire votre salle") }}
          secondary={{ href: "/events", label: t("Browse big events", "Voir les grands événements") }}
        />
      ) : null}
      {shows.length === 0 && bigEvents.length > 0 && (
        <section className="mt-10 flex flex-col gap-4">
          <h2 className="h-display text-[28px]">{t("Big events coming up", "Grands événements à venir")}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {bigEvents.slice(0, 8).map((e) => <BigEventCard key={e.id} e={e} />)}
          </div>
        </section>
      )}
      {shows.length > 0 && (
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-[22px]">
            {days.map((d) => (
              <section key={d} className="flex flex-col gap-3">
                <h2 className="h-display text-[22px]">{d}</h2>
                {shows.filter((s) => s.dayLabel === d).map((s) => {
                  const v = venueById[s.venueId];
                  return (
                    <Link key={s.id} href={`/shows/${s.id}`} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-3 text-navy no-underline hover:text-navy hover:shadow-md">
                      <Placeholder tone={s.tone} className="h-[100px] w-[150px] flex-none rounded-xl" />
                      <div className="flex flex-[1_1_220px] flex-col gap-1">
                        <span className="eyebrow">{label(lang, s.genre)}</span>
                        <span className="h-display text-xl">{s.title}</span>
                        <span className="text-slate">{v ? `${v.name} · ${v.area}` : ""}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 pr-2">
                        <strong>{s.time}</strong>
                        <span className="text-sm text-muted">{s.entry}</span>
                      </div>
                    </Link>
                  );
                })}
              </section>
            ))}
          </div>
          <aside className="relative h-[640px] max-w-[460px] flex-[1_1_340px] overflow-hidden rounded-[18px] border border-line bg-[#E9EDE6]" aria-label={t("Map of shows", "Carte des spectacles")}>
            <div className="absolute inset-x-0 top-[40%] h-3 bg-white" />
            <div className="absolute inset-y-0 left-[46%] w-3 bg-white" />
            <div className="absolute inset-y-0 right-0 w-[28%] bg-ph-3" />
            {shows.map((s, i) => {
              const v = venueById[s.venueId];
              if (!v) return null;
              return (
                <Link key={s.id} href={`/shows/${s.id}`} style={{ left: v.map.x, top: v.map.y }} className="absolute rounded-full border-2 border-white bg-navy px-2.5 py-1.5 text-[13px] font-bold text-white no-underline hover:text-white">
                  {i + 1}
                </Link>
              );
            })}
          </aside>
        </div>
      )}
    </div>
  );
}
