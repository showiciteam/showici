import { getAdminUsers } from "@/lib/dashboard";
import { getSessionUser } from "@/lib/session";
import { RoleSelect } from "../AdminActions";

export const metadata = { title: "Users · Admin · ShowIci" };

export default async function AdminUsers({ searchParams }: { searchParams: Promise<{ q?: string; role?: string }> }) {
  const { q = "", role = "" } = await searchParams;
  const [{ users, error }, me] = await Promise.all([getAdminUsers(), getSessionUser()]);
  const needle = q.trim().toLowerCase();
  const shown = users.filter((u) => (!role || u.role === role) && (!needle || u.email.toLowerCase().includes(needle) || u.name.toLowerCase().includes(needle)));
  const counts = users.reduce<Record<string, number>>((a, u) => ((a[u.role] = (a[u.role] ?? 0) + 1), a), {});

  return (
    <>
      <h1 className="h-display text-[34px]">Users</h1>
      {error && <div className="card border-2 border-brass p-4 text-sm"><strong>Database update needed.</strong> Run <code>supabase/migrations/003_actions_and_admin.sql</code>. ({error})</div>}
      <form className="flex flex-wrap items-end gap-2.5">
        <label className="label flex-[1_1_260px]">Search<input name="q" defaultValue={q} className="input" placeholder="Name or email" /></label>
        <label className="label">Role
          <select name="role" defaultValue={role} className="input">
            <option value="">All ({users.length})</option>
            <option value="venue">Venues ({counts.venue ?? 0})</option>
            <option value="performer">Performers ({counts.performer ?? 0})</option>
            <option value="planner">Event planners ({counts.planner ?? 0})</option>
            <option value="admin">Admins ({counts.admin ?? 0})</option>
          </select>
        </label>
        <button type="submit" className="min-h-11 rounded-[10px] bg-navy px-5 font-bold text-white">Filter</button>
      </form>
      <section className="card overflow-x-auto p-5">
        <table className="w-full min-w-[760px] text-left text-[15px]">
          <thead><tr className="text-[13px] text-muted"><th className="px-2 py-2.5">Name</th><th className="px-2 py-2.5">Email</th><th className="px-2 py-2.5">Role</th><th className="px-2 py-2.5">Joined</th><th className="px-2 py-2.5">Email confirmed</th><th className="px-2 py-2.5">Last login</th></tr></thead>
          <tbody>
            {shown.length === 0 && <tr><td colSpan={6} className="px-2 py-4 text-slate">No users match.</td></tr>}
            {shown.map((u) => (
              <tr key={u.id} className="border-t border-line">
                <td className="px-2 py-3 font-bold">{u.name || "—"}</td>
                <td className="px-2 py-3"><a href={`mailto:${u.email}`}>{u.email}</a></td>
                <td className="px-2 py-3">{u.id === me?.id ? <span className="font-bold">Admin (you)</span> : <RoleSelect id={u.id} role={u.role} />}</td>
                <td className="px-2 py-3">{u.joined}</td>
                <td className="px-2 py-3">{u.confirmed ? "✓ Yes" : <span className="text-brass-dark">Not yet</span>}</td>
                <td className="px-2 py-3">{u.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
