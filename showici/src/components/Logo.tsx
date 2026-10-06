import Link from "next/link";

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 no-underline ${dark ? "text-white hover:text-white" : "text-navy hover:text-navy"}`}>
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brass">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14213D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      </span>
      <span className="font-display text-2xl font-extrabold tracking-tight">
        Show<span className="text-brass">Ici</span>
      </span>
    </Link>
  );
}
