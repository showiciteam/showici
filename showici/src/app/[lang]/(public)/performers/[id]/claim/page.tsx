import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";
import { getPerformer } from "@/lib/data";
import { getSessionUser } from "@/lib/session";
import { PerformerClaimForm } from "./PerformerClaimForm";

export const metadata = { title: "Claim your profile · ShowIci", robots: { index: false, follow: false } };

export default async function ClaimPerformerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPerformer(id);
  if (!p) notFound();
  const user = await getSessionUser();
  const here = `/performers/${p.id}/claim`;
  const siteDomain = (p.links?.find((l) => l.label === "Website")?.url ?? "").replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  const social = /(facebook|instagram|linktr|google|wixsite|squarespace|youtube|spotify|bandcamp|soundcloud|tiktok)\./i.test(siteDomain);

  return (
    <div className="wrap max-w-[720px] pb-[72px] pt-10">
      <Link href={`/performers/${p.id}`} className="text-sm no-underline">← {p.name}</Link>
      <h1 className="h-display mt-3 text-[34px] sm:text-[42px]">Claim {p.name}</h1>
      <p className="mt-3 text-[17px] leading-relaxed text-slate">
        Taking over your ShowIci profile is free. Once it&apos;s yours, you can edit your bio, add photos and videos, set where you&apos;re available and get messages from venues and event planners.
      </p>

      {p.claimed !== false ? (
        <div className="card mt-8 flex flex-col gap-3 p-6">
          <strong>This profile has already been claimed.</strong>
          <p className="text-slate">If you are {p.name} and didn&apos;t claim it, use Contact at the bottom of the page and we&apos;ll look into it.</p>
        </div>
      ) : !user ? (
        <div className="card mt-8 flex flex-col gap-4 p-6">
          <strong className="text-lg">First, sign in or create your performer account</strong>
          <p className="text-slate">
            Use an email on your own website{siteDomain && !social ? <> (one ending in <strong>@{siteDomain}</strong>)</> : null} if you have one: we can then confirm the claim instantly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={`/signup?role=performer&next=${encodeURIComponent(here)}`}>Create a performer account</Button>
            <Button href={`/login?next=${encodeURIComponent(here)}`} variant="secondary">I already have an account</Button>
          </div>
        </div>
      ) : (
        <PerformerClaimForm performerId={p.id} performerName={p.name} userName={user.name} userEmail={user.email} siteDomain={social ? "" : siteDomain} />
      )}

      <section className="mt-10 flex flex-col gap-2 text-[15px] leading-relaxed text-slate">
        <h2 className="text-lg font-bold text-ink">How we confirm it&apos;s you</h2>
        <p>If your account email is on your own website domain{siteDomain && !social ? ` (@${siteDomain})` : ""}, the profile becomes yours right away.</p>
        <p>Otherwise, someone from ShowIci checks your request, usually through your official social accounts, and you get an email as soon as it&apos;s approved, normally within 2 business days.</p>
      </section>
    </div>
  );
}
