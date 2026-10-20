import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";
import { getVenue } from "@/lib/data";
import { getSessionUser } from "@/lib/session";
import { ClaimForm } from "./ClaimForm";

export const metadata = { title: "Claim your venue · ShowIci", robots: { index: false, follow: false } };

export default async function ClaimVenuePage({ params }: { params: Promise<{ id: string }> }) {
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
      <h1 className="h-display mt-3 text-[34px] sm:text-[42px]">Claim {v.name}</h1>
      <p className="mt-3 text-[17px] leading-relaxed text-slate">
        Taking over your ShowIci page is free. Once it&apos;s yours, you can add photos, correct the details, post your upcoming shows and receive messages and booking requests from local artists.
      </p>

      {v.claimed !== false ? (
        <div className="card mt-8 flex flex-col gap-3 p-6">
          <strong>This venue has already been claimed.</strong>
          <p className="text-slate">If you manage {v.name} and didn&apos;t claim it, use Contact at the bottom of the page and we&apos;ll look into it.</p>
        </div>
      ) : !user ? (
        <div className="card mt-8 flex flex-col gap-4 p-6">
          <strong className="text-lg">First, sign in or create your venue account</strong>
          <p className="text-slate">
            Use your work email{siteDomain && !social ? <> (one ending in <strong>@{siteDomain}</strong>)</> : null} if you have one: we can then confirm the claim instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/signup?role=venue&next=${encodeURIComponent(here)}`}>Create a venue account</Button>
            <Button href={`/login?next=${encodeURIComponent(here)}`} variant="secondary">I already have an account</Button>
          </div>
        </div>
      ) : (
        <ClaimForm venueId={v.id} venueName={v.name} userName={user.name} userEmail={user.email} siteDomain={social ? "" : siteDomain} />
      )}

      <section className="mt-10 flex flex-col gap-2 text-[15px] leading-relaxed text-slate">
        <h2 className="text-lg font-bold text-navy">How we confirm it&apos;s you</h2>
        <p>If your account email is on the venue&apos;s own website domain{siteDomain && !social ? ` (@${siteDomain})` : ""}, the venue becomes yours right away.</p>
        <p>Otherwise, someone from ShowIci checks your request, usually by calling the venue&apos;s public phone number, and you get an email as soon as it&apos;s approved, normally within 2 business days.</p>
      </section>
    </div>
  );
}
