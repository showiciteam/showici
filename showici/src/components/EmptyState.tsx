import Link from "next/link";

/** Shown on public listings while nothing has been published yet. */
export function EmptyState(p: { title: string; body: string; cta?: { href: string; label: string }; secondary?: { href: string; label: string } }) {
  return (
    <div className="card flex flex-col items-start gap-3 px-[30px] py-[34px]">
      <h2 className="h-display text-[26px]">{p.title}</h2>
      <p className="max-w-[560px] text-[17px] text-slate">{p.body}</p>
      {(p.cta || p.secondary) && (
        <div className="mt-2 flex flex-wrap gap-3">
          {p.cta && (
            <Link href={p.cta.href} className="rounded-xl bg-navy px-5 py-3 font-bold text-white no-underline hover:text-white">
              {p.cta.label}
            </Link>
          )}
          {p.secondary && (
            <Link href={p.secondary.href} className="rounded-xl border border-line px-5 py-3 font-bold text-navy no-underline">
              {p.secondary.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
