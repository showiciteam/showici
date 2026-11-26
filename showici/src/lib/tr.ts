import type { Lang } from "./lang";
import { label, whenLabel } from "./labels";
import { FR_UI } from "./fr-ui";

/**
 * Translation for the signed-in screens (registration, dashboards, messages).
 * The English sentence is the key, so the code stays readable; French comes from lib/fr-ui.ts,
 * then from the shared labels (act types, styles…), and dates or times formatted in English
 * ("Friday, October 9 · 9:00 pm") are rewritten in French. Anything else shows in English.
 */
export type Tr = (english: string) => string;

export function translator(lang: Lang): Tr {
  if (lang === "en") return (english) => english;
  return (english) => {
    if (english in FR_UI) return FR_UI[english];
    const labelled = label(english, "fr");
    return labelled !== english ? labelled : whenLabel(english, "fr");
  };
}

/** Puts values into a translated sentence: fill(tr("Claim {name}"), { name: "Le Vieux Dublin" }). */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
