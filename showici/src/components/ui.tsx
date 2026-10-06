import Link from "next/link";
import type { Tone } from "@/lib/types";

type BtnProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "brass" | "ghost-dark";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
};

const variants = {
  primary: "bg-navy text-white hover:bg-navy-deep hover:text-white",
  secondary: "bg-white text-navy border border-line-strong hover:bg-parchment hover:text-navy",
  brass: "bg-brass text-navy hover:bg-[#C8932F] hover:text-navy",
  "ghost-dark": "bg-transparent text-white border border-navy-line hover:bg-navy-soft hover:text-white",
};

export function Button({ href, children, variant = "primary", className = "", type = "button", onClick, disabled, external }: BtnProps) {
  const cls = `inline-flex items-center justify-center gap-2 min-h-11 rounded-[10px] px-[18px] py-3 text-[15px] font-bold no-underline transition-colors disabled:opacity-50 ${variants[variant]} ${className}`;
  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={cls}>{children}</a>;
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}

export function Chip({ on, children, onClick }: { on?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors ${
        on ? "border border-navy bg-brass-tint font-bold text-navy-deep" : "border border-line-strong bg-white text-ink-2 hover:bg-parchment"
      }`}
    >
      {children}
    </button>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-line-strong bg-white px-3 py-1 text-[13px] text-ink-2">{children}</span>;
}

export const toneClass: Record<Tone, string> = {
  "ph-1": "bg-ph-1",
  "ph-2": "bg-ph-2",
  "ph-3": "bg-ph-3",
  "ph-4": "bg-ph-4",
  "ph-5": "bg-ph-5",
};

/** Image placeholder until real photos are uploaded. */
export function Placeholder({ tone, label, className = "" }: { tone: Tone; label?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center text-[13px] font-bold text-slate ${toneClass[tone]} ${className}`}>
      {label}
    </div>
  );
}

export function PlayIcon({ size = 24, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** YouTube embed when a URL is known, otherwise a styled placeholder. */
export function VideoBox({ url, title, className = "", big }: { url?: string; title: string; className?: string; big?: boolean }) {
  const id = url?.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1];
  if (id)
    return (
      <iframe
        className={`aspect-video w-full rounded-2xl ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  return (
    <div className={`flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl bg-navy text-white ${className}`}>
      <span className={`flex items-center justify-center rounded-full bg-brass ${big ? "h-20 w-20" : "h-14 w-14"}`}>
        <PlayIcon size={big ? 34 : 24} color="#14213D" />
      </span>
      <span className="px-4 text-center font-bold">{title}</span>
    </div>
  );
}

export function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="tracking-[2px] text-brass-dark" aria-label={`${rating} out of 5`}>
      {"★★★★★".slice(0, full)}
      <span className="text-line-strong">{"★★★★★".slice(full)}</span>
    </span>
  );
}

export function DateBadge({ day, date, dark }: { day: string; date: string; dark?: boolean }) {
  return (
    <span className={`inline-block rounded-[10px] px-2.5 py-1.5 text-center text-[12px] font-bold leading-tight ${dark ? "bg-navy text-white" : "bg-brass-tint text-navy-deep"}`}>
      {day}
      <br />
      <span className="font-display text-xl">{date}</span>
    </span>
  );
}

export function Section({ title, eyebrow, action, children, className = "" }: { title: string; eyebrow?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`wrap py-16 ${className}`}>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="h-display text-[34px] sm:text-[40px]">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function FreePlanBanner({ left = 2 }: { left?: number }) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2C98F] bg-brass-tint px-4 py-3.5">
      <span>
        <strong className="text-brass-dark">Free plan:</strong> {left} contacts left today. Upgrade for unlimited contacts and every filter.
      </span>
      <Link href="/pricing" className="font-bold no-underline">See plans →</Link>
    </div>
  );
}
