import { getAdminRequests } from "@/lib/dashboard";
import { RequestStatusSelect } from "../AdminActions";

export const metadata = { title: "Event requests · Admin · ShowIci" };

export default async function AdminRequests() {
  const requests = await getAdminRequests();
  return (
    <>
      <h1 className="h-display text-[34px]">Event requests</h1>
      <p className="-mt-3 text-slate">Private-event requests from planners. Open requests are visible to signed-in performers. Close one that is spam or out of area.</p>
      <section className="card overflow-x-auto p-5">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <thead><tr className="text-[13px] text-muted"><th className="px-2 py-2.5">Event date</th><th className="px-2 py-2.5">Type</th><th className="px-2 py-2.5">City</th><th className="px-2 py-2.5">Budget</th><th className="px-2 py-2.5">Planner</th><th className="px-2 py-2.5">Posted</th><th className="px-2 py-2.5">Status</th></tr></thead>
          <tbody>
            {requests.length === 0 && <tr><td colSpan={7} className="px-2 py-4 text-slate">No event requests yet.</td></tr>}
            {requests.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="px-2 py-3 font-bold">{r.date}</td>
                <td className="px-2 py-3">{r.type}</td>
                <td className="px-2 py-3">{r.city}</td>
                <td className="px-2 py-3">{r.budget}</td>
                <td className="px-2 py-3">{r.planner}</td>
                <td className="px-2 py-3">{r.posted}</td>
                <td className="px-2 py-3"><RequestStatusSelect id={r.id} status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
