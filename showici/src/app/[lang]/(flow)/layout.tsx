import Link from "@/components/Link";
import { Logo } from "@/components/Logo";
import { getSessionUser, homeFor } from "@/lib/session";
import { serverTr } from "@/lib/lang-server";

export default async function FlowLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  const tr = await serverTr();
  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-ink text-white">
        <nav className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
          <Logo />
          <Link href={user ? homeFor[user.role] : "/"} className="rounded-[10px] border border-ink-line px-4 py-2.5 text-[15px] font-bold text-white no-underline hover:text-white">
            {user ? tr("Back to my dashboard") : tr("Back to ShowIci")}
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
