import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LogoutButton } from "@/components/Header";
import { requireUser } from "@/lib/session";
import { AdminNav } from "./AdminNav";

/** Shared frame for every admin page. Only admins get in; everyone else goes to their own dashboard. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["admin"]);
  return (
    <div className="flex min-h-screen flex-wrap bg-parchment">
      <nav aria-label="Admin" className="flex max-w-[240px] flex-[1_1_220px] flex-col gap-1 bg-navy px-3 py-5">
        <div className="px-3.5 pb-4"><Logo /></div>
        <AdminNav />
        <div className="mt-auto flex flex-col gap-2 px-3.5 pt-6">
          <Link href="/" className="text-sm text-on-navy no-underline hover:text-white">← Back to the site</Link>
          {user && <><span className="block truncate text-sm text-on-navy">{user.name}</span><LogoutButton /></>}
        </div>
      </nav>
      <main className="flex min-w-0 flex-[999_1_640px] flex-col gap-[22px] p-8">{children}</main>
    </div>
  );
}
