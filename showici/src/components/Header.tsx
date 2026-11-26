"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "@/components/Link";
import { signOutAction } from "@/lib/auth-actions";
import { useLang, type DictKey } from "@/lib/i18n";
import { switchLang } from "@/lib/lang";
import { ContactButton } from "./ContactDialog";
import { Logo } from "./Logo";

const links: { href: string; key: DictKey }[] = [
  { href: "/shows", key: "nav.shows" },
  { href: "/events", key: "nav.bigEvents" },
  { href: "/performers", key: "nav.performers" },
  { href: "/venues", key: "nav.venues" },
  { href: "/request", key: "nav.private" },
  { href: "/spotlight", key: "nav.spotlight" },
  { href: "/news", key: "nav.news" },
];

/** The current path without the /en prefix, so "is this link active?" works in both languages. */
function useBarePath() {
  const path = usePathname();
  return path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path;
}

/** Link to the same page in the other language. */
export function LangToggle() {
  const { lang } = useLang();
  const path = usePathname();
  const other = lang === "fr" ? "en" : "fr";
  return (
    <NextLink
      href={switchLang(path, other)}
      hrefLang={other === "fr" ? "fr-CA" : "en-CA"}
      lang={other}
      className="font-display text-sm font-bold text-white no-underline hover:text-accent-bright"
    >
      {other === "fr" ? "Français" : "English"}
    </NextLink>
  );
}

function Avatar({ name }: { name: string }) {
  const letter = name.replace(/[\[\]]/g, "").trim()[0]?.toUpperCase() ?? "?";
  return <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent font-bold text-white">{letter}</span>;
}

/** Log out button. Posts to a server action so the session cookie is cleared on the server too. */
export function LogoutButton({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <form action={signOutAction}>
      <button type="submit" className={`min-h-10 rounded-lg border border-ink-line px-3.5 py-2 text-[15px] font-bold text-white hover:border-white ${className}`}>
        {t("nav.logout")}
      </button>
    </form>
  );
}

export function Header({ user }: { user?: { name: string; home: string } | null }) {
  const path = useBarePath();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="relative z-20 bg-ink text-white">
      <nav aria-label={t("nav.main")} className="wrap flex flex-wrap items-center gap-x-6 gap-y-3 py-3.5">
        <Logo height={52} />
        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
          aria-label={t("nav.menu")}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <div
          id="site-menu"
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-5 border-t border-ink-line pb-4 pt-4 lg:flex lg:w-auto lg:flex-1 lg:flex-row lg:items-center lg:border-0 lg:p-0`}
        >
          <div className="flex flex-col gap-4 font-display text-[17px] font-bold lg:flex-1 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-4 lg:gap-y-2 lg:text-[14px] xl:gap-x-5 xl:text-[15px]">
            {links.map((l) => {
              const active = path === l.href || path.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`w-fit border-b-[3px] pb-1 text-white no-underline hover:text-white ${active ? "border-accent" : "border-transparent hover:border-ink-line"}`}
                >
                  {t(l.key)}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <LangToggle />
            {user ? (
              <>
                <Link href={user.home} className="flex items-center gap-2 text-[15px] font-bold text-white no-underline hover:text-white">
                  <Avatar name={user.name} />
                  <span className="max-w-[160px] truncate">{user.name}</span>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="font-display text-[15px] font-bold text-white no-underline hover:text-accent-bright">
                  {t("nav.login")}
                </Link>
                <Link href="/signup" className="rounded-lg bg-accent px-4 py-2.5 font-display text-[15px] font-bold text-white no-underline hover:bg-accent-dark hover:text-white">
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
const appLinks: Record<AppRole, { href: string; fr: string; en: string }[]> = {
  venue: [
    { href: "/dashboard/venue", fr: "Mes spectacles", en: "My shows" },
    { href: "/performers", fr: "Trouver des artistes", en: "Find artists" },
    { href: "/messages", fr: "Messages", en: "Messages" },
  ],
  performer: [
    { href: "/dashboard/performer", fr: "Tableau de bord", en: "Dashboard" },
    { href: "/venues", fr: "Trouver des salles", en: "Find venues" },
    { href: "/requests", fr: "Demandes d’événements", en: "Event requests" },
    { href: "/messages", fr: "Messages", en: "Messages" },
  ],
  planner: [
    { href: "/dashboard/planner", fr: "Mes événements", en: "My events" },
    { href: "/request", fr: "Nouvelle demande", en: "New request" },
    { href: "/performers", fr: "Trouver des artistes", en: "Find artists" },
    { href: "/messages", fr: "Messages", en: "Messages" },
  ],
  admin: [
    { href: "/admin", fr: "Admin", en: "Admin" },
    { href: "/dashboard/venue", fr: "Vue salle", en: "Venue view" },
    { href: "/dashboard/performer", fr: "Vue artiste", en: "Artist view" },
    { href: "/messages", fr: "Messages", en: "Messages" },
  ],
};

/** Header for signed-in pages. `live` is false in demo mode, where there is no session to log out of. */
export function AppHeader({ role, name, live = false }: { role: AppRole; name: string; live?: boolean }) {
  const path = useBarePath();
  const { lang } = useLang();
  return (
    <header className="bg-ink text-white">
      <nav className="wrap flex flex-wrap items-center gap-6 py-3.5">
        <Logo height={46} />
        <div className="flex flex-1 flex-wrap gap-5 font-display text-[15px] font-bold">
          {appLinks[role].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path === l.href ? "page" : undefined}
              className={`border-b-[3px] pb-1 text-white no-underline hover:text-white ${path === l.href ? "border-accent" : "border-transparent"}`}
            >
              {l[lang]}
            </Link>
          ))}
          <ContactButton className="text-white hover:text-accent-bright" />
        </div>
        <LangToggle />
        <span className="flex items-center gap-2.5 text-[15px] font-bold">
          <Avatar name={name} />
          <span className="max-w-[180px] truncate">{name}</span>
        </span>
        {live && <LogoutButton />}
      </nav>
    </header>
  );
}
