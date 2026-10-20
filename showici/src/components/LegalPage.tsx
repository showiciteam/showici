"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import type { LegalDoc } from "@/lib/legal";

/** Paragraphs in order; consecutive "- " lines become one bulleted list. */
function blocks(lines: string[]) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) out.push(<ul key={`u${out.length}`} className="flex list-disc flex-col gap-1.5 pl-5">{list.map((x) => <li key={x}>{x}</li>)}</ul>);
    list = [];
  };
  for (const l of lines) {
    if (l.startsWith("- ")) list.push(l.slice(2));
    else { flush(); out.push(<p key={`p${out.length}`}>{l}</p>); }
  }
  flush();
  return out;
}

/** Shared layout for Terms and Privacy: follows the FR / EN switch in the header. */
export function LegalPage({ doc, other }: { doc: Record<"en" | "fr", LegalDoc>; other: { href: string; en: string; fr: string } }) {
  const { lang: raw } = useLang();
  const lang = raw === "fr" ? "fr" : "en";
  const d = doc[lang];
  return (
    <div className="wrap max-w-[820px] pb-[72px] pt-10">
      <p className="eyebrow mb-1.5 text-[13px]">ShowIci</p>
      <h1 className="h-display text-[38px] sm:text-[44px]">{d.title}</h1>
      <p className="mt-2 text-sm text-muted">{d.updated}</p>
      <p className="mt-5 text-[17px] leading-relaxed text-ink-2">{d.intro}</p>

      <nav aria-label={lang === "fr" ? "Sommaire" : "Contents"} className="card mt-7 p-5">
        <ol className="grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-2">
          {d.sections.map((s, i) => <li key={s.h}><a href={`#s${i + 1}`} className="no-underline">{s.h}</a></li>)}
        </ol>
      </nav>

      <div className="mt-8 flex flex-col gap-8">
        {d.sections.map((s, i) => (
          <section key={s.h} id={`s${i + 1}`} className="scroll-mt-6">
            <h2 className="h-display mb-3 text-[24px]">{s.h}</h2>
            <div className="flex flex-col gap-3 text-[16px] leading-relaxed text-ink-2">{blocks(s.p)}</div>
          </section>
        ))}
      </div>

      <p className="mt-10 border-t border-line pt-5 text-[15px]">
        <Link href={other.href}>{other[lang]} →</Link>
      </p>
    </div>
  );
}
