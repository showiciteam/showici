import Link from "next/link";
import { getAdminClaims } from "@/lib/dashboard";
import { ClaimActions } from "../AdminActions";

export const metadata = { title: "Venue claims · Admin · ShowIci" };

const TABS = ["pending", "approved", "rejected", "all"] as const;

export default async function AdminClaims({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: raw } = await searchParams;
  const status = (TABS as readonly string[]).includes(raw ?? "") ? (raw as (typeof TABS)[number]) : "pending";
  const items = await getAdminClaims(status);
  return (
    <>
      <h1 className="h-display text-[34px]">Venue claims</h1>
      <p className="-mt-3 text-slate">Owners asking to take over a venue ShowIci listed. Before approving, call the venue&apos;s public number and ask for the person by name.</p>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link key={t} href={`/admin/claims?status=${t}`} className={`rounded-full px-3.5 py-1.5 text-sm capitalize no-underline ${t === status ? "bg-navy font-bold text-white" : "border border-line-strong bg-white text-navy"}`}>{t}</Link>
        ))}
      </div>
      <section className="card flex flex-col gap-1 p-5">
        {items.length === 0 && <p className="text-slate">No {status === "all" ? "" : status} claims.</p>}
        {items.map((c) => (
          <article key={c.id} className="flex flex-col gap-2 border-t border-line py-4 first:border-t-0">
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/venues/${c.venue.id}`} className="font-bold">{c.venue.name}</Link>
              <span className="hint text-sm">· {c.when}{status === "all" ? ` · ${c.status}` : ""}{c.auto ? " · confirmed by email domain" : ""}</span>
            </div>
            <span className="text-[15px]"><strong>{c.name}</strong> ({c.role}) · <a href={`mailto:${c.email}`}>{c.email}</a>{c.phone ? ` · ${c.phone}` : ""}</span>
            <span className="text-sm text-slate">
              Venue: {c.venue.address || "No address"}{c.venue.phone ? ` · ${c.venue.phone}` : ""}{c.venue.website ? <> · <a href={c.venue.website} target="_blank" rel="noopener noreferrer">{c.venue.website.replace(/^https?:\/\//, "")}</a></> : null}
            </span>
            {c.message && <p className="whitespace-pre-line rounded-xl bg-parchment px-4 py-3 text-ink-2">{c.message}</p>}
            {c.status === "pending" && <div className="flex justify-end"><ClaimActions id={c.id} /></div>}
          </article>
        ))}
      </section>
    </>
  );
}
