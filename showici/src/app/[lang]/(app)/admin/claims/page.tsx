import Link from "@/components/Link";
import { getAdminClaims, getAdminPerformerClaims } from "@/lib/dashboard";
import { ClaimActions } from "../AdminActions";

export const metadata = { title: "Claims · Admin · ShowIci" };

const TABS = ["pending", "approved", "rejected", "all"] as const;
const KINDS = [["venue", "Venues"], ["performer", "Performers"]] as const;

export default async function AdminClaims({ searchParams }: { searchParams: Promise<{ status?: string; kind?: string }> }) {
  const { status: raw, kind: rawKind } = await searchParams;
  const status = (TABS as readonly string[]).includes(raw ?? "") ? (raw as (typeof TABS)[number]) : "pending";
  const kind = rawKind === "performer" ? "performer" : "venue";
  const venueClaims = kind === "venue" ? await getAdminClaims(status) : [];
  const performerClaims = kind === "performer" ? await getAdminPerformerClaims(status) : [];
  const empty = (kind === "venue" ? venueClaims.length : performerClaims.length) === 0;
  const pill = (on: boolean) => `rounded-full px-3.5 py-1.5 text-sm capitalize no-underline ${on ? "bg-ink font-bold text-white" : "border border-line-strong bg-white text-ink"}`;

  return (
    <>
      <h1 className="h-display text-[34px]">Claims</h1>
      <p className="-mt-3 text-slate">
        {kind === "venue"
          ? <>Owners asking to take over a venue ShowIci listed. Before approving, call the venue&apos;s public number and ask for the person by name.</>
          : <>Artists asking to take over a profile ShowIci created (for example after a Spotlight interview). Before approving, confirm through the artist&apos;s official website or social accounts.</>}
      </p>
      <div className="flex flex-wrap gap-2">
        {KINDS.map(([k, label]) => <Link key={k} href={`/admin/claims?kind=${k}&status=${status}`} className={pill(k === kind)}>{label}</Link>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => <Link key={t} href={`/admin/claims?kind=${kind}&status=${t}`} className={pill(t === status)}>{t}</Link>)}
      </div>
      <section className="card flex flex-col gap-1 p-5">
        {empty && <p className="text-slate">No {status === "all" ? "" : status} claims.</p>}
        {venueClaims.map((c) => (
          <article key={c.id} className="flex flex-col gap-2 border-t border-line py-4 first:border-t-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/venues/${c.venue.id}`} className="font-bold">{c.venue.name}</Link>
              <span className="hint text-sm">· {c.when}{status === "all" ? ` · ${c.status}` : ""}{c.auto ? " · confirmed by email domain" : ""}</span>
            </div>
            <span className="text-[15px]"><strong>{c.name}</strong> ({c.role}) · <a href={`mailto:${c.email}`}>{c.email}</a>{c.phone ? ` · ${c.phone}` : ""}</span>
            <span className="text-sm text-slate">
              Venue: {c.venue.address || "No address"}{c.venue.phone ? ` · ${c.venue.phone}` : ""}{c.venue.website ? <> · <a href={c.venue.website} target="_blank" rel="noopener noreferrer">{c.venue.website.replace(/^https?:\/\//, "")}</a></> : null}
            </span>
            {c.message && <p className="whitespace-pre-line rounded-xl bg-sand px-4 py-3 text-graphite">{c.message}</p>}
            {c.status === "pending" && <div className="flex justify-end"><ClaimActions id={c.id} /></div>}
          </article>
        ))}
        {performerClaims.map((c) => (
          <article key={c.id} className="flex flex-col gap-2 border-t border-line py-4 first:border-t-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/performers/${c.performer.id}`} className="font-bold">{c.performer.name}</Link>
              <span className="hint text-sm">· {c.when}{status === "all" ? ` · ${c.status}` : ""}{c.auto ? " · confirmed by email domain" : ""}</span>
            </div>
            <span className="text-[15px]"><strong>{c.name}</strong> ({c.role}) · <a href={`mailto:${c.email}`}>{c.email}</a>{c.phone ? ` · ${c.phone}` : ""}</span>
            <span className="text-sm text-slate">
              {c.performer.detail || "Performer"}
              {c.performer.links.map(([label, url]) => <span key={url}> · <a href={url} target="_blank" rel="noopener noreferrer">{label}</a></span>)}
            </span>
            {c.message && <p className="whitespace-pre-line rounded-xl bg-sand px-4 py-3 text-graphite">{c.message}</p>}
            {c.status === "pending" && <div className="flex justify-end"><ClaimActions id={c.id} kind="performer" /></div>}
          </article>
        ))}
      </section>
    </>
  );
}
