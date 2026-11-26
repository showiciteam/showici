import type { CSSProperties, ReactNode } from "react";
import Link from "@/components/Link";

/** Hand-drawn red stroke under hero headlines. */
export function Brush({ width = 320, className = "" }: { width?: number; className?: string }) {
  return (
    <svg width={width} height="16" viewBox={`0 0 ${width} 16`} aria-hidden="true" className={`brush ${className}`}>
      <path d={`M4 11 C${width * 0.3} 3, ${width * 0.65} 3, ${width - 4} 7`} stroke="#E3262F" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Dark page header with a stage photo on the right.
 * `title` is the white first line, `accent` the red second line.
 */
export function PageHero({
  image,
  title,
  accent,
  lead,
  hand = false,
  children,
  bottomSpace = "pb-14",
}: {
  image: string;
  title: ReactNode;
  accent: ReactNode;
  lead?: ReactNode;
  /** Handwritten headline, as on the home page. */
  hand?: boolean;
  children?: ReactNode;
  bottomSpace?: string;
}) {
  const style = { "--hero-image": `url(${image})` } as CSSProperties;
  return (
    <section className="hero-photo text-white" style={style}>
      <div className={`wrap pt-10 sm:pt-14 ${bottomSpace}`}>
        <h1
          className={
            hand
              ? "-rotate-3 font-hand text-[clamp(46px,9vw,92px)] leading-[1.02]"
              : "font-display text-[clamp(42px,8vw,84px)] font-extrabold leading-none tracking-[-0.02em]"
          }
        >
          <span className="block">{title}</span>
          <span className="block text-accent-bright">{accent}</span>
        </h1>
        <Brush className="ml-6 mt-2.5" />
        {lead && <p className="mt-5 max-w-[500px] text-lg leading-relaxed text-[#E4E4E8] sm:text-[19px]">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Section title with an optional "see all" link on the right. */
export function SectionHead({ title, sub, more, dark = false }: { title: string; sub?: string; more?: { href: string; label: string }; dark?: boolean }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className={`h-display text-[28px] sm:text-[34px] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
        {sub && <p className={`mt-1 text-sm ${dark ? "text-on-dark" : "text-muted"}`}>{sub}</p>}
      </div>
      {more && (
        <Link href={more.href} className={`font-display text-[15px] font-bold no-underline ${dark ? "text-accent-bright hover:text-white" : ""}`}>
          {more.label} →
        </Link>
      )}
    </div>
  );
}

/** Red and black call-to-action band near the bottom of a page. */
export function RedBand({ icon, title, text, children }: { icon?: ReactNode; title: ReactNode; text?: ReactNode; children?: ReactNode }) {
  return (
    <section className="band-red">
      <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-5 py-11">
        {icon && <span className="hidden flex-none sm:block" aria-hidden="true">{icon}</span>}
        <div className="flex-[1_1_360px]">
          <h2 className="h-display text-[30px] leading-tight sm:text-[38px]">{title}</h2>
          {text && <p className="mt-2 text-base text-[#F2E4E5] sm:text-lg">{text}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Pill-shaped button links used across the redesigned pages. */
export function PillLink({ href, children, tone = "red", external = false }: { href: string; children: ReactNode; tone?: "red" | "outline" | "outline-dark"; external?: boolean }) {
  const cls = {
    red: "bg-accent text-white hover:bg-accent-dark hover:text-white",
    outline: "border-[1.5px] border-white text-white hover:bg-white/10 hover:text-white",
    "outline-dark": "border-[1.5px] border-ink text-ink hover:bg-sand hover:text-ink",
  }[tone];
  const className = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-[22px] py-3 font-display text-[15px] font-bold no-underline transition-colors ${cls}`;
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={className}>{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

/** Shown where a list has nothing to display yet, instead of sample cards. */
export function ComingSoon({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <p className={`rounded-xl border-[1.5px] border-dashed px-6 py-8 text-center font-display font-bold ${dark ? "border-ink-line text-on-dark" : "border-line-strong text-muted"}`}>
      {text}
    </p>
  );
}
