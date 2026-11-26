import Link from "@/components/Link";

/** Shown on public listings while nothing has been published yet. */
export function EmptyState(p: { title: string; body: string; cta?: { href: string; label: string }; secondary?: { href: string; label: string }; dark?: boolean }) {
  return (
    <div className={`flex flex-col items-start gap-3 rounded-2xl border-[1.5px] border-dashed px-7 py-8 ${p.dark ? "border-ink-line text-white" : "border-line-strong bg-white"}`}>
      <h2 className="h-display text-2xl">{p.title}</h2>
      <p className={`max-w-[560px] text-base ${p.dark ? "text-on-dark" : "text-slate"}`}>{p.body}</p>
      {(p.cta || p.secondary) && (
        <div className="mt-2 flex flex-wrap gap-3">
          {p.cta && (
            <Link href={p.cta.href} className="rounded-full bg-accent px-5 py-3 font-display font-bold text-white no-underline hover:bg-accent-dark hover:text-white">
              {p.cta.label}
            </Link>
          )}
          {p.secondary && (
            <Link href={p.secondary.href} className={`rounded-full border-[1.5px] px-5 py-3 font-display font-bold no-underline ${p.dark ? "border-white text-white hover:text-white" : "border-ink text-ink hover:text-ink"}`}>
              {p.secondary.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
