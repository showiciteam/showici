import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getSessionUser, homeFor } from "@/lib/session";

export default async function FlowLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-navy text-white">
        <nav className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
          <Logo />
          <Link href={user ? homeFor[user.role] : "/"} className="rounded-[10px] border border-navy-line px-4 py-2.5 text-[15px] font-bold text-white no-underline hover:text-white">
            {user ? "Back to my dashboard" : "Back to ShowIci"}
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
