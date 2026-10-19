import Link from "next/link";
import { getAdminContact } from "@/lib/dashboard";
import { ContactActions } from "../AdminActions";

export const metadata = { title: "Contact messages · Admin · ShowIci" };

const TABS = ["new", "answered", "closed", "all"] as const;
const ROLE: Record<string, string> = { venue: "Venue", performer: "Performer", planner: "Planning an event", business: "Business / sponsor", press: "Media", other: "Other" };
const LABEL: Record<string, string> = { venue_name: "Venue", act_name: "Act", profile_link: "Profile", event_type: "Event", event_date: "Date", city: "City", company: "Company", website: "Website", outlet: "Outlet", deadline: "Deadline", link: "Link" };

export default async function AdminContact({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: raw } = await searchParams;
  const status = (TABS as readonly string[]).includes(raw ?? "") ? (raw as (typeof TABS)[number]) : "new";
  const items = await getAdminContact(status);
  return (
    <>
      <h1 className="h-display text-[34px]">Contact messages</h1>
      <p className="-mt-3 text-slate">Sent from Contact in the main menu. Reply by email, then mark the message answered.</p>
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link key={t} href={`/admin/contact?status=${t}`} className={`rounded-full px-3.5 py-1.5 text-sm capitalize no-underline ${t === status ? "bg-navy font-bold text-white" : "border border-line-strong bg-white text-navy"}`}>{t}</Link>
        ))}
      </div>
      <section className="card flex flex-col gap-1 p-5">
        {items.length === 0 && <p className="text-slate">No {status === "all" ? "" : status} messages.</p>}
        {items.map((m) => (
          <article key={m.id} className="flex flex-col gap-2 border-t border-line py-4 first:border-t-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brass-tint px-2.5 py-0.5 text-xs font-bold">{ROLE[m.role] ?? m.role}</span>
              <strong>{m.topic}</strong>
              <span className="hint text-sm">· {m.when}{status === "all" ? ` · ${m.status}` : ""}</span>
            </div>
            <span className="text-[15px]">
              <strong>{m.name}</strong> · <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.topic}`)}`}>{m.email}</a>{m.phone ? ` · ${m.phone}` : ""}
            </span>
            {Object.keys(m.details).length > 0 && (
              <span className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate">
                {Object.entries(m.details).map(([k, v]) => <span key={k}><span className="text-muted">{LABEL[k] ?? k}:</span> {/^https?:\/\//.test(v) ? <a href={v} target="_blank" rel="noopener noreferrer">{v}</a> : v}</span>)}
              </span>
            )}
            <p className="whitespace-pre-line rounded-xl bg-parchment px-4 py-3 text-ink-2">{m.message}</p>
            <div className="flex justify-end"><ContactActions id={m.id} status={m.status} /></div>
          </article>
        ))}
      </section>
    </>
  );
}
