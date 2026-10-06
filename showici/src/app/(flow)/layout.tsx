import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-navy text-white">
        <nav className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
          <Logo />
          <div className="flex items-center gap-2.5">
            <span className="text-sm text-on-navy">Draft saved automatically</span>
            <Link href="/" className="rounded-[10px] border border-navy-line px-4 py-2.5 text-[15px] font-bold text-white no-underline hover:text-white">Save and finish later</Link>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
