"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/verifications", label: "Verifications" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/shows", label: "Shows" },
  { href: "/admin/requests", label: "Event requests" },
  { href: "/admin/settings", label: "Settings and plan limits" },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <>
      {items.map((i) => {
        const active = i.href === "/admin" ? path === "/admin" : path.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} className={`rounded-[10px] px-3.5 py-2.5 no-underline ${active ? "bg-navy-soft font-bold text-white" : "text-on-navy hover:text-white"}`}>
            {i.label}
          </Link>
        );
      })}
    </>
  );
}
