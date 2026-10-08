import Link from "next/link";
import { getAdminPerformersAndVenues } from "@/lib/dashboard";
import { UnpublishVenue, VerifyActions } from "../AdminActions";

export const metadata = { title: "Verifications · Admin · ShowIci" };

export default async function AdminVerifications() {
  const { performers, venues } = await getAdminPerformersAndVenues();
  const waiting = performers.filter((p) => !p.verified);
  const verified = performers.filter((p) => p.verified);
  return (
    <>
      <h1 className="h-display text-[34px]">Verifications</h1>
      <p className="-mt-3 text-slate">Check that the videos and photos really show this act before giving them the ✓ Verified badge. Reject hides the profile from public listings.</p>
      <section className="card flex flex-col gap-1 p-5">
        <h2 className="h-display mb-2 text-[22px]">Performers waiting ({waiting.length})</h2>
        {waiting.length === 0 && <p className="text-slate">Nobody is waiting for verification.</p>}
        {waiting.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
            <span className="flex-[1_1_260px]">
              <Link href={`/performers/${p.id}`} className="font-bold">{p.name}</Link>{" "}
              <span className="hint text-sm">{p.detail} · joined {p.joined}{p.published ? "" : " · draft"}</span>
            </span>
            <VerifyActions id={p.id} />
          </div>
        ))}
      </section>
      <section className="card flex flex-col gap-1 p-5">
        <h2 className="h-display mb-2 text-[22px]">Verified performers ({verified.length})</h2>
        {verified.length === 0 && <p className="text-slate">None yet.</p>}
        {verified.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
            <span className="flex-[1_1_260px]"><Link href={`/performers/${p.id}`} className="font-bold">{p.name}</Link> <span className="hint text-sm">{p.detail}</span></span>
            <span className="text-sm font-bold text-success-ink">✓ Verified</span>
          </div>
        ))}
      </section>
      <section className="card flex flex-col gap-1 p-5">
        <h2 className="h-display mb-2 text-[22px]">Venues ({venues.length})</h2>
        {venues.length === 0 && <p className="text-slate">No venues yet.</p>}
        {venues.map((v) => (
          <div key={v.id} className="flex flex-wrap items-center gap-3 border-t border-line py-3">
            <span className="flex-[1_1_260px]"><Link href={`/venues/${v.id}`} className="font-bold">{v.name}</Link> <span className="hint text-sm">{v.detail} · joined {v.joined}</span></span>
            {v.published ? <UnpublishVenue id={v.id} /> : <span className="hint text-sm">Hidden</span>}
          </div>
        ))}
      </section>
    </>
  );
}
