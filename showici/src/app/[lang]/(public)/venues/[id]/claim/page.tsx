import { fill } from "@/lib/tr";
import { serverTr } from "@/lib/lang-server";
import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";
import { getVenue } from "@/lib/data";
import { getSessionUser } from "@/lib/session";
import { ClaimForm } from "./ClaimForm";

export const metadata = { title: "Claim your venue · ShowIci", robots: { index: false, follow: false } };

export default async function ClaimVenuePage({ params }: { params: Promise<{ id: string }> }) {
  const tr = await serverTr();
  const { id } = await params;
  const v = await getVenue(id);
  if (!v) notFound();
  const user = await getSessionUser();
  const here = `/venues/${v.id}/claim`;
  const siteDomain = (v.links?.find((l) => l.label === "Website")?.url ?? "").replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  const social = /(facebook|instagram|linktr|google|wixsite|squarespace|yelp|tripadvisor)\./i.test(siteDomain);

  return (
    <div className="wrap max-w-[720px] pb-[72px] pt-10">
      <Link href={`/venues/${v.id}`} className="text-sm no-underline">← {v.name}</Link>
      <h1 className="h-display mt-3 text-[34px] sm:text-[42px]">{fill(tr("Claim {name}"), { name: v.name })}</h1>
      <p className="mt-3 text-[17px] leading-relaxed text-slate">
        {tr("Once this page is yours, you can add photos, correct the details, post your upcoming shows and receive messages and booking requests from local artists.")}
      </p>

      {v.claimed !== false ? (
        <div className="card mt-8 flex flex-col gap-3 p-6">
          <strong>{tr("This venue has already been claimed.")}</strong>
          <p className="text-slate">{fill(tr("If you manage {name} and didn’t claim it, use Contact at the bottom of the page and we’ll look into it."), { name: v.name })}</p>
        </div>
      ) : !user ? (
        <div className="card mt-8 flex flex-col gap-4 p-6">
          <strong className="text-lg">{tr("First, sign in or create your venue account")}</strong>
          <p className="text-slate">
            {tr("Use your work email")}{siteDomain && !social ? <> {tr("(one ending in")} <strong>@{siteDomain}</strong>)</> : null} {tr("if you have one: we can then confirm the claim instantly.")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/signup?role=venue&next=${encodeURIComponent(here)}`}>{tr("Create a venue account")}</Button>
            <Button href={`/login?next=${encodeURIComponent(here)}`} variant="secondary">{tr("I already have an account")}</Button>
          </div>
        </div>
      ) : (
        <ClaimForm venueId={v.id} venueName={v.name} userName={user.name} userEmail={user.email} siteDomain={social ? "" : siteDomain} />
      )}

      <section className="mt-10 flex flex-col gap-2 text-[15px] leading-relaxed text-slate">
        <h2 className="text-lg font-bold text-ink">{tr("How we confirm it’s you")}</h2>
        <p>{tr("If your account email is on the venue’s own website domain, the venue becomes yours right away.")}</p>
        <p>{tr("Otherwise, someone from ShowIci checks your request, usually by calling the venue’s public phone number, and you get an email as soon as it’s approved, normally within 2 business days.")}</p>
      </section>
    </div>
  );
}
