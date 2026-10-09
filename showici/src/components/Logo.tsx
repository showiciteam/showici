import Image from "next/image";
import Link from "next/link";

/**
 * ShowIci wordmark with the spotlight over the Montréal skyline.
 * "light" is for navy backgrounds (header, admin sidebar); "color" is the
 * original artwork for light backgrounds (auth pages, emails, print).
 */
export function Logo({ variant, dark = true, height = 40, href = "/", className = "" }: { variant?: "light" | "color"; dark?: boolean; height?: number; href?: string | null; className?: string } & Record<string, unknown>) {
  // `dark` is the older prop: true = sitting on a navy background.
  variant ??= dark ? "light" : "color";
  const width = Math.round((height * 640) / 210);
  const img = (
    <Image
      src={variant === "light" ? "/logo-light.png" : "/logo.png"}
      alt="ShowIci"
      width={width}
      height={height}
      priority
      className="block h-auto max-w-full"
      style={{ width, height: "auto" }}
    />
  );
  if (!href) return <span className={`inline-flex ${className}`}>{img}</span>;
  return (
    <Link href={href} aria-label="ShowIci home" className={`inline-flex shrink-0 no-underline ${className}`}>
      {img}
    </Link>
  );
}
