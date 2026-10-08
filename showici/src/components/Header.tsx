"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOutAction } from "@/lib/auth-actions";
import { useLang, type DictKey } from "@/lib/i18n";
import { Logo } from "./Logo";

const links: { href: string; key: DictKey; match: string[] }[] = [
  { href: "/shows", key: "nav.shows", match: ["/shows"] },
  { href: "/events", key: "nav.bigEvents", match: ["/events"] },
  { href: "/performers", key: "nav.performers", match: ["/performers"] },
  { href: "/venues", key: "nav.venues", match: ["/venues"] },
  { href: "/request", key: "nav.private", match: ["/request"] },
  { href: "/spotlight", key: "nav.spotlight", match: ["/spotlight"] },
  { href: "/news", key: "nav.news", match: ["/news"] },
];

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex overflow-hidden rounded-full border border-navy-line text-[13px] font-bold" role="group" aria-label="Language">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-h-9 px-3 ${lang === l ? "bg-white text-navy" : "text-on-navy"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const letter = name.replace(/[\[\]]/g, "").trim()[0]?.toUpperCase() ?? "?";
  return <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ph-2 font-bold text-navy">{letter}</span>;
}

/** Log out button. Posts to a server action so the session cookie is cleared on the server too. */
export function LogoutButton({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  return (
    <form action={signOutAction}>
      <button type="submit" className={`min-h-10 rounded-[10px] border border-navy-line px-3.5 py-2 text-[15px] font-bold text-white hover:text-brass ${className}`}>
        {lang === "fr" ? "Déconnexion" : "Log out"}
      </button>
    </form>
  );
}

export function Header({ user }: { user?: { name: string; home: string } | null }) {
  const path = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-navy text-white">
      <nav className="wrap flex flex-wrap items-center gap-6 py-4">
        <Logo />
        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        <div className={`${open ? "flex" : "hidden"} w-full flex-col gap-4 lg:flex lg:w-auto lg:flex-1 lg:flex-row lg:items-center lg:gap-6`}>
          <div className="flex flex-col gap-3 text-[15px] lg:flex-1 lg:flex-row lg:flex-wrap lg:gap-5">
            {links.map((l) => {
              const active = l.match.some((m) => path.startsWith(m));
              return (
                <Link key={l.href} href={l.href} className={`no-underline ${active ? "font-bold text-white" : "text-on-navy hover:text-white"}`}>
                  {t(l.key)}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2.5">
            <LangToggle />
            {user ? (
              <>
                <Link href={user.home} className="flex items-center gap-2 rounded-[10px] px-2 py-1.5 text-[15px] text-white no-underline hover:text-brass">
                  <Avatar name={user.name} />
                  <span className="max-w-[160px] truncate font-bold">{user.name}</span>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-[10px] px-3 py-2.5 text-[15px] text-white no-underline hover:text-brass">
                  {t("nav.login")}
                </Link>
                <Link href="/signup" className="rounded-[10px] bg-brass px-4 py-2.5 text-[15px] font-bold text-navy no-underline hover:text-navy">
                  {t("nav.signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

type AppRole = "venue" | "performer" | "planner" | "admin";
const appLinks: Record<AppRole, { href: string; label: string }[]> = {
  venue: [
    { href: "/dashboard/venue", label: "My shows" },
    { href: "/performers", label: "Find performers" },
    { href: "/messages", label: "Messages" },
  ],
  performer: [
    { href: "/dashboard/performer", label: "Dashboard" },
    { href: "/venues", label: "Find venues" },
    { href: "/requests", label: "Event requests" },
    { href: "/messages", label: "Messages" },
  ],
  planner: [
    { href: "/dashboard/planner", label: "My events" },
    { href: "/request", label: "New request" },
    { href: "/performers", label: "Find performers" },
    { href: "/messages", label: "Messages" },
  ],
  admin: [
    { href: "/admin", label: "Admin" },
    { href: "/dashboard/venue", label: "Venue view" },
    { href: "/dashboard/performer", label: "Performer view" },
    { href: "/messages", label: "Messages" },
  ],
};

/** Header for signed-in pages. `live` is false in demo mode, where there is no session to log out of. */
export function AppHeader({ role, name, live = false }: { role: AppRole; name: string; live?: boolean }) {
  const path = usePathname();
  return (
    <header className="bg-navy text-white">
      <nav className="wrap flex flex-wrap items-center gap-6 py-4">
        <Logo />
        <div className="flex flex-1 flex-wrap gap-5 text-[15px]">
          {appLinks[role].map((l) => (
            <Link key={l.href} href={l.href} className={`no-underline ${path === l.href ? "font-bold text-white" : "text-on-navy hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <span className="flex items-center gap-2.5 text-[15px]">
          <Avatar name={name} />
          <span className="max-w-[180px] truncate">{name}</span>
        </span>
        {live && <LogoutButton />}
      </nav>
    </header>
  );
}
